const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000
// Enable CORS for front-end access
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dkto7jpwz', // Replace with your Cloudinary cloud name
  api_key: '676731375469238',       // Replace with your Cloudinary API key
  api_secret: 'LkRK_l8bwBJ-0vOVKscQg-0NvtY'  // Replace with your Cloudinary API secret
});

// Set up multer storage for image upload (Note: Cloudinary will handle the storage now)
const storage = multer.memoryStorage();  // Store files in memory before uploading

const upload = multer({ storage: storage });

// Route to handle image upload and other data
app.post('/upload', upload.single('image'), (req, res) => {
  const { location, deviceDetails } = req.body;

  // Upload image to Cloudinary
  cloudinary.uploader.upload_stream(
    { resource_type: 'auto' }, // 'auto' will automatically detect the file type (JPEG, PNG, etc.)
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
      }

      // Log the received location and device details
      console.log('Location:', location);
      console.log('Device Details:', deviceDetails);
      console.log('Cloudinary Response:', result);

      // Respond with the file info, Cloudinary URL, and received data
      res.json({
        message: 'Image uploaded successfully!',
        file: result,
        location: location,
        deviceDetails: deviceDetails
      });
    }

  ).end(req.file.buffer);  // Send the file to Cloudinary
});

// Start the server
app.listen(port, (google) => {
  console.log(`Server running at http://localhost:${port}`);
});
