package monitor

import (
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
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
