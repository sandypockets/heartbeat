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

## Usage
### API
The heartbeat server (running on port 8080) provides the following endpoints (all responses are in JSON format)

#### GET /api/cpu
Returns a JSON response containing a `float64` representing the CPU usage of the machine that the server is running on.

Example response:
```json
{
  "cpu_usage": 12.243453423
}
```

#### GET /api/memory
Returns a JSON response object containing memory usage information (in `bytes`) of the machine that the server is running on.

Example response:
```json
{
    "memory_usage": {
        "total": 17179869184,
        "available": 5659533312,
        "used": 11520335872,
        "usedPercent": 67.05718040466309,
        "free": 47128576,
        "active": 5571727360,
        "inactive": 5612404736,
        "wired": 4094337024
    }
}
```

#### GET /api/disk
Returns a JSON response object containing disk usage information (in `bytes`) for each partition within the environment that the server is running on.

Example response:
```json
{
    "disk_usage": [
        {
            "path": "/",
            "fstype": "apfs",
            "total": 499963174912,
            "free": 70238134272,
            "used": 429725040640,
            "usedPercent": 85.95133845920495,
            "inodesTotal": 686313011,
            "inodesUsed": 393731,
            "inodesFree": 685919280,
            "inodesUsedPercent": 0.057369012926960235
        }
    ]
}
```

#### GET /api/network
Returns a JSON response object containing network usage information (in `bytes`) for each network interface within the environment that the server is running on.

Example response:
```json
{
    "network_usage": [
        {
            "name": "lo0",
            "bytesSent": 74798966,
            "bytesRecv": 74798966,
            "packetsSent": 235327,
            "packetsRecv": 235327,
            "errin": 0,
            "errout": 0,
            "dropin": 0,
            "dropout": 0,
            "fifoin": 0,
            "fifoout": 0
        }
    ]
}
```
