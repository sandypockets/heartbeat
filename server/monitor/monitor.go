package monitor

import (
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/mem"
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
