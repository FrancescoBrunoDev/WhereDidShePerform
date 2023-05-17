const express = require('express');
const fetch = require('cross-fetch');
const app = express();
const PORT = 3003; // Set your desired port number

// Enable CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// Proxy endpoint for queryData
app.get('/api/queryData', async (req, res) => {
  try {
    const { query } = req.query;
    const url = `https://performance.musiconn.de/api?action=query&entity=person&person=${query}&sort=1&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for GetCoordinates
app.get('/api/getCoordinates', async (req, res) => {
  try {
    const { locationUid } = req.query;
    const url = `https://performance.musiconn.de/api?action=get&location=${locationUid}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for GetLocations
app.get('/api/getLocations', async (req, res) => {
  try {
    const { eventIud } = req.query;
    const url = `https://performance.musiconn.de/api?action=get&event=${eventIud}&props=locations|dates&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for GetInfoPerson
app.get('/api/getInfoPerson', async (req, res) => {
  try {
    const { PersonUid } = req.query;
    const url = `https://performance.musiconn.de/api?action=get&person=${PersonUid}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.person);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for autocomplete
app.get('/api/autocomplete', async (req, res) => {
  try {
    const { query } = req.query;
    const url = `https://performance.musiconn.de/api?action=autocomplete&title=${query}&entities=person&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
