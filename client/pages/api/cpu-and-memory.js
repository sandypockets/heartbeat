const port = "8080";
const baseUrl = "http://localhost";

async function getUsage(endpoint) {
    try {
        const res = await fetch(`${baseUrl}:${port}/api/${endpoint}`);
        if (!res.ok) {
            throw new Error(`An error occurred: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}: `, error);
        throw error;
    }
}

async function getApiData() {
    try {
        const [cpu, memory] = await Promise.all([
            getUsage("cpu"),
            getUsage("memory"),
        ]);
        return { cpu, memory };
    } catch (error) {
        console.error("Error fetching APIs", error);
        throw error;
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await getApiData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
