const port = '8080';
const baseUrl = 'http://localhost';

export default async function queryServerApi(endpoint, params = null) {
  try {
    if (params) {
      const res = await fetch(`${baseUrl}:${port}/api/${endpoint}${params}`);
      if (!res.ok) {
        throw new Error(`An error occurred: ${res.status}`);
      }
      return await res.json();
    } else {
      const res = await fetch(`${baseUrl}:${port}/api/${endpoint}`);
      if (!res.ok) {
        throw new Error(`An error occurred: ${res.status}`);
      }
      return await res.json();
    }
  } catch (error) {
    throw new Error(`Error fetching ${endpoint}: ${error.message}`);
  }
}
