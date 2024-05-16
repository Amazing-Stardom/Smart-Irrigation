// pages/api/proxy.js
export default async function handler(req, res) {
  const { query } = req;
  const url = `http://192.168.90.191/${query.path}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
}
