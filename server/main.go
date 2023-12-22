package main

import (
	"encoding/json"
	"heartbeat/server/monitor"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/cpu", cpuHandler)
	http.HandleFunc("/api/memory", memoryHandler)

	log.Println("Starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func cpuHandler(w http.ResponseWriter, r *http.Request) {
	usage, err := monitor.GetCPUUsage()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]float64{"cpu_usage": usage})
}

func memoryHandler(w http.ResponseWriter, r *http.Request) {
	usage, err := monitor.GetMemoryUsage()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"memory_usage": usage})
}
