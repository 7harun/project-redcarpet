const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000; // or any port of your choice

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        // Preserve the original file extension
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext; // Add timestamp to avoid conflicts
        cb(null, filename);
    }
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Handle POST request to /upload
app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // Respond with the path to the saved file
    res.json({
        message: 'File uploaded successfully',
        filePath: `uploads/${file.filename}`
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
