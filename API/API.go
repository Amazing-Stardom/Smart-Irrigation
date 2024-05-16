package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
	"math/rand"
	"log"
)

func main() {
	// Base URL for the API
	baseURL := "http://localhost:8000/store-data"

	// Number of requests to send
	numRequests := 10

	// Generate random data for each request
	for i := 0; i < numRequests; i++ {
		// Generate random data
		randomData := map[string]int{
			"temperature": rand.Intn(100), // Random temperature between 0 and 99
			"humidity":    rand.Intn(101), // Random humidity between 0 and 100
			"rain":        rand.Intn(2),   // Random rain value (0 or 1)
			"moisture":    rand.Intn(101), // Random moisture between 0 and 100
		}

		// Send the POST request
		sendPostRequest(baseURL, randomData)
	}

	// Wait for 10 seconds between each batch of requests
	time.Sleep(10 * time.Second)
}

func sendPostRequest(url string, data map[string]int) {
	jsonData, err := json.Marshal(data)
	if err!= nil {
		log.Fatalf("JSON marshaling failed: %s", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err!= nil {
		log.Fatalf("Failed to create request: %s", err)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err!= nil {
		log.Fatalf("Request failed: %s", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err!= nil {
		log.Fatalf("Failed to read response body: %s", err)
	}

	fmt.Printf("Response: %s\n", string(body))
}
