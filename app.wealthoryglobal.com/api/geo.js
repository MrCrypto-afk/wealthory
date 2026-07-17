export default function handler(req, res) {
  const country = req.headers['x-vercel-ip-country'] || 'IN';
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.status(200).json({ country });
}
