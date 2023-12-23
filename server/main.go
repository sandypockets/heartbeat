package main

import (
	"encoding/json"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/net"
	"heartbeat/server/monitor"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/cpu", cpuHandler)
	http.HandleFunc("/api/memory", memoryHandler)
	http.HandleFunc("/api/disk", diskHandler)
	http.HandleFunc("/api/network", networkHandler)

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
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"memory_usage": usage})
}

func diskHandler(w http.ResponseWriter, r *http.Request) {
	usage, err := monitor.GetDiskUsage()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string][]disk.UsageStat{"disk_usage": usage})
}

func networkHandler(w http.ResponseWriter, r *http.Request) {
	usage, err := monitor.GetNetworkUsage()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string][]net.IOCountersStat{"network_usage": usage})
}
