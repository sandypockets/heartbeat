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