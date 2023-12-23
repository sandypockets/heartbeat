package monitor

import (
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
	"github.com/shirou/gopsutil/process"
	"sync"
	"time"
)

type SytemMetrics struct {
	sync.RWMutex
	CPUUsage struct {
		Current  float64
		Avg5min  float64
		Avg10min float64
		Avg15min float64
		History  []float64
	}
}

var Metrics SytemMetrics

func CollectSystemMetrics(interval time.Duration) {
	ticker := time.NewTicker(interval)
	for {
		select {
		case <-ticker.C:
			updateCPUUsage()
			calculateAverages()
		}
	}
}

func updateCPUUsage() {
	current, _ := cpu.Percent(0, false)
	Metrics.Lock()
	Metrics.CPUUsage.Current = current[0]
	Metrics.CPUUsage.History = append(Metrics.CPUUsage.History, current[0])
	Metrics.Unlock()
}

func calculateAverage(data []float64, minutes int) float64 {
	total := 0.0
	count := 0

	for i := len(data) - 1; i >= 0 && count < minutes; i-- {
		total += data[i]
		count++
	}

	if count == 0 {
		return 0
	}

	return total / float64(count)
}

func calculateAverages() {
	Metrics.Lock()
	defer Metrics.Unlock()

	Metrics.CPUUsage.Avg5min = calculateAverage(Metrics.CPUUsage.History, 5)
	Metrics.CPUUsage.Avg10min = calculateAverage(Metrics.CPUUsage.History, 10)
	Metrics.CPUUsage.Avg15min = calculateAverage(Metrics.CPUUsage.History, 15)

	if len(Metrics.CPUUsage.History) > 30 {
		Metrics.CPUUsage.History = Metrics.CPUUsage.History[1:]
	}
}

func GetMemoryUsage() (*mem.VirtualMemoryStat, error) {
	memoryStats, err := mem.VirtualMemory()
	if err != nil {
		return nil, err
	}
	return memoryStats, nil
}

func GetDiskUsage() ([]disk.UsageStat, error) {
	partitions, err := disk.Partitions(false)
	if err != nil {
		return nil, err
	}

	var diskStats []disk.UsageStat
	for _, partition := range partitions {
		diskStat, err := disk.Usage(partition.Mountpoint)
		if err != nil {
			return nil, err
		}
		diskStats = append(diskStats, *diskStat)
	}
	return diskStats, nil
}

func GetNetworkUsage() ([]net.IOCountersStat, error) {
	netStats, err := net.IOCounters(true)
	if err != nil {
		return nil, err
	}
	return netStats, nil
}

func GetNetworkInterfaces() ([]net.InterfaceStat, error) {
	netInterfaces, err := net.Interfaces()
	if err != nil {
		return nil, err
	}
	return netInterfaces, nil
}

func GetNetworkConnections() ([]net.ConnectionStat, error) {
	netConnections, err := net.Connections("all")
	if err != nil {
		return nil, err
	}
	return netConnections, nil
}

func GetProcessDetails(pid int32) (map[string]interface{}, error) {
	proc, err := process.NewProcess(pid)
	if err != nil {
		return nil, err
	}

	name, err := proc.Name()
	if err != nil {
		return nil, err
	}

	cmdline, err := proc.Cmdline()
	if err != nil {
		return nil, err
	}

	details := map[string]interface{}{
		"pid":     pid,
		"name":    name,
		"cmdline": cmdline,
	}

	return details, nil
}
