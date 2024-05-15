package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type WeatherData struct {
    Temperature float64 `json:"temperature"`
    Humidity    int     `json:"humidity"`
    Rain        int     `json:"rain"`
    Moisture    int     `json:"moisture"`
}

func main() {
    http.HandleFunc("/update-sensor", func(w http.ResponseWriter, r *http.Request) {
        if r.Method!= http.MethodPost {
            http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
            return
        }

        body, err := ioutil.ReadAll(r.Body)
        if err!= nil {
            http.Error(w, "Error reading request body", http.StatusInternalServerError)
            return
        }

        var data WeatherData
        err = json.Unmarshal(body, &data)
        if err!= nil {
            http.Error(w, "Error parsing JSON", http.StatusBadRequest)
            return
        }

        fmt.Fprintf(w, "Received data: %+v\n", data)
        // Here you would typically process the data, e.g., store it in a database
    })

    fmt.Println("Starting server on port http://localhost:8080")
    if err := http.ListenAndServe(":8080", nil); err!= nil {
        panic(err)
    }
}
