const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Add CORS middleware
app.use(cors());

app.use(express.json());

// Dummy data for markers
const markers = [
  { latitude: 40.7128, longitude: -74.0060, title: 'New York City', description: 'The Big Apple' },
  { latitude: 51.5074, longitude: -0.1278, title: 'London', description: 'The Capital of England' },
  { latitude: 48.8566, longitude: 2.3522, title: 'Paris', description: 'The City of Love' },
];

app.get('/api/markers', (req, res) => {
  res.json(markers);
});

app.post('/api/markers', (req, res) => {
  const { latitude, longitude, title, description } = req.body;
  const newMarker = { latitude, longitude, title, description };
  markers.push(newMarker);
  res.status(201).json(newMarker);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
