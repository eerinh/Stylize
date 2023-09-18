const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/google-lens', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    const serpAPIKey = "5b17ad02ca60c1ad6e91884b11d639da3c6ce842cff9023335a54a1fef35a398";  // Replace with your actual key
    const endpoint = "https://serpapi.com/search";

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

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
