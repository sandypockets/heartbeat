package monitor

import (
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
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
	MemoryUsage struct {
		Current  uint64
		Avg5min  uint64
		Avg10min uint64
		Avg15min uint64
		History  []uint64
	}
}

var Metrics SytemMetrics

func CollectSystemMetrics(interval time.Duration) {
	ticker := time.NewTicker(interval)
	for {
		select {
		case <-ticker.C:
			updateCPUUsage()
			updateMemoryUsage()
			calculateAverages()
		}
	}
}

func updateMemoryUsage() {
	memoryStats, _ := mem.VirtualMemory()
	Metrics.Lock()
	Metrics.MemoryUsage.Current = memoryStats.Used
	Metrics.MemoryUsage.History = append(Metrics.MemoryUsage.History, memoryStats.Used)
	Metrics.Unlock()
}

func updateCPUUsage() {
	current, _ := cpu.Percent(100*time.Millisecond, false)
	Metrics.Lock()
	Metrics.CPUUsage.Current = current[0]
	Metrics.CPUUsage.History = append(Metrics.CPUUsage.History, current[0])
	Metrics.Unlock()
}

func calculateCpuAverage(data []float64, minutes int) float64 {
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

func calculateMemoryAverage(data []uint64, intervals int) uint64 {
	total := uint64(0)
	count := 0

	for i := len(data) - 1; i >= 0 && count < intervals; i-- {
		total += data[i]
		count++
	}

	if count == 0 {
		return 0
	}

	return total / uint64(count)
}

func calculateAverages() {
	Metrics.Lock()
	defer Metrics.Unlock()

	Metrics.CPUUsage.Avg5min = calculateCpuAverage(Metrics.CPUUsage.History, 5)
	Metrics.CPUUsage.Avg10min = calculateCpuAverage(Metrics.CPUUsage.History, 10)
	Metrics.CPUUsage.Avg15min = calculateCpuAverage(Metrics.CPUUsage.History, 15)

	Metrics.MemoryUsage.Avg5min = calculateMemoryAverage(Metrics.MemoryUsage.History, 5)
	Metrics.MemoryUsage.Avg10min = calculateMemoryAverage(Metrics.MemoryUsage.History, 10)
	Metrics.MemoryUsage.Avg15min = calculateMemoryAverage(Metrics.MemoryUsage.History, 15)

	if len(Metrics.CPUUsage.History) > 30 {
		Metrics.CPUUsage.History = Metrics.CPUUsage.History[1:]
	}

	if len(Metrics.MemoryUsage.History) > 30 {
		Metrics.MemoryUsage.History = Metrics.MemoryUsage.History[1:]
	}
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

func GetSystemUptime() (uint64, error) {
	uptime, err := host.Uptime()
	if err != nil {
		return 0, err
	}
	return uptime, nil
}

func GetSystemBootTime() (uint64, error) {
	bootTime, err := host.BootTime()
	if err != nil {
		return 0, err
	}
	return bootTime, nil
}

func GetDiskIOCounters() (map[string]disk.IOCountersStat, error) {
	diskStats, err := disk.IOCounters()
	if err != nil {
		return nil, err
	}
	return diskStats, nil
}

func GetCpuInfo() ([]cpu.InfoStat, error) {
	cpuInfo, err := cpu.Info()
	if err != nil {
		return nil, err
	}
	return cpuInfo, nil
}

func GetPlatformInfo() (host.InfoStat, error) {
	platformInfo, err := host.Info()
	if err != nil {
		return host.InfoStat{}, err
	}
	return *platformInfo, nil
}
