package main

import (
	"encoding/json"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
	"heartbeat/server/monitor"
	"log"
	"net/http"
	"strconv"
	"time"
)

func main() {
	http.HandleFunc("/api/cpu", cpuHandler)
	http.HandleFunc("/api/memory", memoryHandler)
	http.HandleFunc("/api/disk", diskHandler)
	http.HandleFunc("/api/network", networkHandler)
	http.HandleFunc("/api/process", processHandler)
	http.HandleFunc("/api/uptime", uptimeHandler)
	http.HandleFunc("/api/diskio", diskIOHandler)

	go monitor.CollectSystemMetrics(30 * time.Second)

	log.Println("Starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func cpuHandler(w http.ResponseWriter, r *http.Request) {
	monitor.Metrics.RLock()
	defer monitor.Metrics.RUnlock()

	json.NewEncoder(w).Encode(map[string]float64{
		"current_usage": monitor.Metrics.CPUUsage.Current,
		"avg_5min":      monitor.Metrics.CPUUsage.Avg5min,
		"avg_10min":     monitor.Metrics.CPUUsage.Avg10min,
		"avg_15min":     monitor.Metrics.CPUUsage.Avg15min,
	})
}

func memoryHandler(w http.ResponseWriter, r *http.Request) {
	memoryStats, err := mem.VirtualMemory()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	monitor.Metrics.RLock()
	memoryAverages := map[string]uint64{
		"current_usage": monitor.Metrics.MemoryUsage.Current,
		"avg_5min":      monitor.Metrics.MemoryUsage.Avg5min,
		"avg_10min":     monitor.Metrics.MemoryUsage.Avg10min,
		"avg_15min":     monitor.Metrics.MemoryUsage.Avg15min,
	}
	monitor.Metrics.RUnlock()

	response := map[string]interface{}{
		"memory_usage": map[string]interface{}{
			"total":       memoryStats.Total,
			"available":   memoryStats.Available,
			"used":        memoryStats.Used,
			"usedPercent": memoryStats.UsedPercent,
			"free":        memoryStats.Free,
			"active":      memoryStats.Active,
			"inactive":    memoryStats.Inactive,
			"wired":       memoryStats.Wired,
		},
		"averages": memoryAverages,
	}

	json.NewEncoder(w).Encode(response)
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

func uptimeHandler(w http.ResponseWriter, r *http.Request) {
	uptime, err := monitor.GetSystemUptime()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	bootTime, err := monitor.GetSystemBootTime()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	response := map[string]uint64{
		"uptime":    uptime,
		"boot_time": bootTime,
	}

	json.NewEncoder(w).Encode(response)
}

func diskIOHandler(w http.ResponseWriter, r *http.Request) {
	diskStats, err := monitor.GetDiskIOCounters()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(diskStats)
}
