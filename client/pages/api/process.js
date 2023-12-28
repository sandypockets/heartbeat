import queryServerApi from '@/helpers/queryServerApi';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const processId = req.query['pid'];
    const params = `?pid=${processId}`;
    try {
      const data = await queryServerApi('process', params);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
