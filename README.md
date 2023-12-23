# Heartbeat
Heartbeat is a backend server written in Go. The server provides an API containing monitoring data of the environment that the server is running on. 

The frontend of Heartbeat is a Next.js application, which consumes the API, displaying the monitoring information to the user.

## Getting Started
### Prerequisites
- [Go](https://golang.org/doc/install)
- [Node.js](https://nodejs.org/en/download/)

### Installation
1. Clone the repository

```sh
git clone https://github.com/sandypockets/heartbeat.git
```

#### Backend
Run the following commands to start the backend server:

```sh
cd heartbeat/server
go run main.go
```

You should see a message in the terminal saying that the server is running on port 8080.

#### Frontend
Run the following commands to start the frontend server:

```sh
cd heartbeat/client
yarn
yarn dev
```

You should see a message in the terminal saying that the server is running on port 3000.

# Usage
## API
The heartbeat server (running on port `8080`) provides the following endpoints.

* [GET `/api/cpu`](#get-apicpu)
* [GET `/api/memory`](#get-apimemory)
* [GET `/api/disk`](#get-apidisk)
* [GET `/api/network`](#get-apinetwork)

### GET `/api/cpu`
Returns a JSON response containing a `float64` representing the CPU usage of the machine that the server is running on.

Example response:
```json
{
  "cpu_usage": 15.321
}
```

### GET `/api/memory`
Returns a JSON object with details about the memory usage of the server.

Example response:
```json
{
  "memory_usage": {
    "total": 16000000000,        // Total memory in bytes.
    "available": 6000000000,     // Memory available for use in bytes.
    "used": 10000000000,         // Memory currently in use in bytes.
    "usedPercent": 62.5,         // Percentage of total memory currently in use.
    "free": 50000000,            // Free memory in bytes.
    "active": 5500000000,        // Memory actively in use or recently used.
    "inactive": 4500000000,      // Memory not actively in use.
    "wired": 4000000000          // Memory marked to stay in RAM, not to be moved to disk.
  }
}
```

### GET `/api/disk`
Returns a JSON object with an array of disk usage information. Each item in the array represents a separate partition.

Example response:
```json
{
  "disk_usage": [
    {
      "path": "/",                   // Mount path of the partition.
      "fstype": "apfs",              // File system type of the partition.
      "total": 500000000000,         // Total size of the partition in bytes.
      "free": 100000000000,          // Free space available on the partition in bytes.
      "used": 400000000000,          // Space used on the partition in bytes.
      "usedPercent": 80.0,           // Percentage of the partition that is used.
      "inodesTotal": 1000000,        // Total number of inodes.
      "inodesUsed": 500000,          // Number of inodes used.
      "inodesFree": 500000,          // Number of inodes free.
      "inodesUsedPercent": 50.0      // Percentage of inodes that are used.
    }
  ]
}


```

### GET `/api/network`
Returns a JSON response object containing network information for each network interface within the environment that the server is running on.

Example response:
```json
{
  "io_usage": [
    {
      "name": "lo0",                     // Name of the network interface.
      "bytesSent": 1000000,              // Total bytes sent through this interface.
      "bytesRecv": 1000000,              // Total bytes received through this interface.
      "packetsSent": 1000,               // Number of network packets sent.
      "packetsRecv": 1000,               // Number of network packets received.
      "errin": 0,                        // Count of incoming errors.
      "errout": 0,                       // Count of outgoing errors.
      "dropin": 0,                       // Count of incoming packets dropped.
      "dropout": 0,                      // Count of outgoing packets dropped.
      "fifoin": 0,                       // FIFO buffer errors on incoming data.
      "fifoout": 0                       // FIFO buffer errors on outgoing data.
    }
  ],
  "interfaces": [
    {
      "index": 2,                        // Unique identifier for the network interface.
      "mtu": 1500,                       // Maximum Transmission Unit in bytes.
      "name": "eth0",                    // Designated name of the network interface.
      "hardwareaddr": "00:1A:2B:3C:4D:5E", // Hardware (MAC) address of the interface.
      "flags": ["up", "broadcast", "multicast"], // Flags indicating the interface's state and capabilities.
      "addrs": [{"addr": "192.168.1.100"}] // IP addresses associated with the interface.
    }
  ],
  "connections": [
    {
      "fd": 3,                           // File Descriptor for the network socket.
      "family": 2,                       // Address family (2 for AF_INET - IPv4).
      "type": 1,                         // Type of socket (1 for SOCK_STREAM - TCP).
      "localaddr": {
        "ip": "192.168.1.100",           // Local IP address.
        "port": 8080                      // Local port number.
      },
      "remoteaddr": {
        "ip": "192.168.1.101",           // Remote IP address.
        "port": 443                       // Remote port number.
      },
      "status": "ESTABLISHED",           // Status of the connection.
      "uids": [1001],                    // User IDs associated with the connection.
      "pid": 1234                        // Process ID owning the socket.
    }
  ]
}
```

