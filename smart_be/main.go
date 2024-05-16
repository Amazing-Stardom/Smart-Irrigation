package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

// Global variable to track if /getData has been accessed
var getDataAccessed bool

func main() {
	http.HandleFunc("/getData", getDataHandler)
	http.HandleFunc("/weather-data", weatherDataHandler)
	http.HandleFunc("/store-data", storeDataHandler)

	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

type WeatherData struct {
	Temperature int `json:"temperature"`
	Humidity    int `json:"humidity"`
	Rain        int `json:"rain"`
	Moisture    int `json:"moisture"`
}

func getDataHandler(w http.ResponseWriter, r *http.Request) {
	// Simulate accessing the data
	fmt.Fprintf(w, "Data fetched")

	// Mark that we've accessed the data
	getDataAccessed = true
}

func weatherDataHandler(w http.ResponseWriter, r *http.Request) {
	if !getDataAccessed {
		http.Error(w, "Please call /getData first.", http.StatusForbidden)
		return
	}

	fetchDataAndRespond(w)
}

func fetchDataAndRespond(w http.ResponseWriter) {
	// Open the SQLite database
	db, err := sql.Open("sqlite3", "./weather_data.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Execute a query to fetch data
	rows, err := db.Query("SELECT temperature, humidity, rain, moisture FROM weather_data")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Scan the results into a slice of WeatherData structs
	var result []WeatherData
	for rows.Next() {
		var wd WeatherData
		err := rows.Scan(&wd.Temperature, &wd.Humidity, &wd.Rain, &wd.Moisture)
		if err != nil {
			log.Fatal(err)
		}
		result = append(result, wd)
	}

	// Convert the result to JSON
	jsonData, err := json.Marshal(result)
	if err != nil {
		log.Fatal(err)
	}

	// Send the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
func storeDataHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method!= http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var data []WeatherData
    if err := json.NewDecoder(r.Body).Decode(&data); err!= nil {
        http.Error(w, "Error decoding JSON", http.StatusBadRequest)
        return
    }

    // Assuming you have a function to insert data into the database
    if err := insertDataIntoDB(data); err!= nil {
        http.Error(w, "Error storing data", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Data stored successfully"))
}

func insertDataIntoDB(data []WeatherData) error {
    // Open the SQLite database
    db, err := sql.Open("sqlite3", "./weather_data.db")
    if err!= nil {
        return err
    }
    defer db.Close()

    tx, err := db.Begin()
    if err!= nil {
        return err
    }
    defer tx.Rollback()

    stmt, err := tx.Prepare("INSERT INTO weather_data (temperature, humidity, rain, moisture) VALUES (?,?,?,?)")
    if err!= nil {
        return err
    }
    defer stmt.Close()

    for _, item := range data {
        _, err := stmt.Exec(item.Temperature, item.Humidity, item.Rain, item.Moisture)
        if err!= nil {
            return err
        }
    }

    return tx.Commit()
}