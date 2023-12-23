package monitor

import (
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
	"github.com/shirou/gopsutil/process"
)

func GetCPUUsage() (float64, error) {
	percentages, err := cpu.Percent(0, false)
	if err != nil {
		return 0, err
	}
	if len(percentages) > 0 {
		return percentages[0], nil
	}
	return 0, nil
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
