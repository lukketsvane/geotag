const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:S2Gjs9vj2810@cluster0.mongodb.net/geotag', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const markerSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  title: String,
  description: String,
});

const Marker = mongoose.model('Marker', markerSchema);

app.get('/api/markers', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/markers', async (req, res) => {
  const marker = new Marker({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newMarker = await marker.save();
    res.status(201).json(newMarker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});