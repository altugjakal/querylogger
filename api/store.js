async function storeApi(req, res) {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Master-Key': process.env.API_MASTER_KEY,
        'X-Access-Key': process.env.API_ACCESS_KEY,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
