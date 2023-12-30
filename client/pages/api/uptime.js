import queryServerApi from '@/helpers/queryServerApi';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await queryServerApi('uptime');
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
