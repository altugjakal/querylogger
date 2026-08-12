import { tavily } from "@tavily/core";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const masterKey = process.env.API_MASTER_KEY;
  if (!masterKey) {
    return res.status(500).json({ error: 'API_MASTER_KEY environment variable is missing.' });
  }

  try {

    let response = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': masterKey,
        'X-Bin-Private': 'true',
      },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    });

    let data = await response.json();
    const tvly = tavily({ apiKey: "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" });

    if (!response.ok) {

      return res.status(response.status).json({ error: data });
    }

    try {
      response = await tvly.search("What are the core updates in React 19?", {
        searchDepth: "basic",
        maxResults: 3,
      });

      data = await response.results;


    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);


    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
