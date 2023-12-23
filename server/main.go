package main

import (
	"encoding/json"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/net"
	"heartbeat/server/monitor"
	"log"
	"net/http"
	"strconv"
)

func main() {
	http.HandleFunc("/api/cpu", cpuHandler)
	http.HandleFunc("/api/memory", memoryHandler)
	http.HandleFunc("/api/disk", diskHandler)
	http.HandleFunc("/api/network", networkHandler)
	http.HandleFunc("/api/process", processHandler)

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
	ioUsage, ioErr := monitor.GetNetworkUsage()
	interfaces, intErr := monitor.GetNetworkInterfaces()
	connections, connErr := monitor.GetNetworkConnections()

	if ioErr != nil || intErr != nil || connErr != nil {
		var networkError error
		if ioErr != nil {
			networkError = ioErr
		} else if intErr != nil {
			networkError = intErr
		} else {
			networkError = connErr
		}
		http.Error(w, networkError.Error(), http.StatusInternalServerError)
		return
	}

	networkUsage := struct {
		IOUsage     []net.IOCountersStat `json:"io_usage"`
		Interfaces  []net.InterfaceStat  `json:"interfaces"`
		Connections []net.ConnectionStat `json:"connections"`
	}{
		IOUsage:     ioUsage,
		Interfaces:  interfaces,
		Connections: connections,
	}

	json.NewEncoder(w).Encode(networkUsage)
}

func processHandler(w http.ResponseWriter, r *http.Request) {
	pidString := r.URL.Query().Get("pid")
	if pidString == "" {
		http.Error(w, "Missing required parameter: pid", http.StatusBadRequest)
		return
	}

	pid, err := strconv.ParseInt(pidString, 10, 32)
	if err != nil {
		http.Error(w, "Invalid pid", http.StatusBadRequest)
	}

	details, err := monitor.GetProcessDetails(int32(pid))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	json.NewEncoder(w).Encode(details)
}
