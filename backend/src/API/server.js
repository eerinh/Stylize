

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/google-lens', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    const serpAPIKey = "077a2e28e5313a4a45f97ecf677fc1c60f58b7f24cccfea33fde50ccebc9790b"; 
    const endpoint = "https://serpapi.com/search.json?";

    try {
        const response = await axios.get(endpoint, {
            params: {
                engine: "google_lens",
                url: url,
                api_key: serpAPIKey,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from SerpAPI:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Lens' });
    }
});

app.get('/api/google-shopping', async (req, res) => {
    const { q, api_key } = req.query;

    if (!q || !api_key) {
        return res.status(400).json({ error: 'Both query and API key are required' });
    }

    try {
        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: "google_shopping",
                q,
                api_key
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Google Shopping API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Shopping' });
    }
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

