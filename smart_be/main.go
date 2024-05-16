package main

import (
    "database/sql"
    "encoding/json"
    "net/http"
    "log"
    "fmt"
    _ "github.com/mattn/go-sqlite3"
)

// Global variable to track if /getData has been accessed
var getDataAccessed bool

func main() {
    http.HandleFunc("/getData", getDataHandler)
    http.HandleFunc("/weather-data", weatherDataHandler)

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
    if!getDataAccessed {
        http.Error(w, "Please call /getData first.", http.StatusForbidden)
        return
    }

    fetchDataAndRespond(w)
}

func fetchDataAndRespond(w http.ResponseWriter) {
    // Open the SQLite database
    db, err := sql.Open("sqlite3", "./weather_data.db")
    if err!= nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Execute a query to fetch data
    rows, err := db.Query("SELECT temperature, humidity, rain, moisture FROM weather_data")
    if err!= nil {
        log.Fatal(err)
    }
    defer rows.Close()

    // Scan the results into a slice of WeatherData structs
    var result []WeatherData
    for rows.Next() {
        var wd WeatherData
        err := rows.Scan(&wd.Temperature, &wd.Humidity, &wd.Rain, &wd.Moisture)
        if err!= nil {
            log.Fatal(err)
        }
        result = append(result, wd)
    }

    // Convert the result to JSON
    jsonData, err := json.Marshal(result)
    if err!= nil {
        log.Fatal(err)
    }

    // Send the JSON response
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonData)
}
