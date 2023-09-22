//Multer used for file uploads
//server.js - accepts and processes user's request, saves them to server's disk 

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('myImage'), (req, res) => {
    const imageUrl = "/uploads/" + req.file.filename;
    console.log("Image URL:", imageUrl);
    res.json({ imageUrl: imageUrl });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
