const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');


const app = express();
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:8081'
}));


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.any(), (req, res) => {
    console.log('Form Data:', req.body); // Log the form data
    console.log('Files:', req.files); // Log the uploaded files
    console.log('MediaType:', req.body.mediaType); // Log mediaType

    // Ensure mediaType is present
    if (!req.body.mediaType) {
        return res.status(400).send({ message: "mediaType is required." });
    }

    const mediaType = req.body.mediaType;
    const uploadField = mediaType === 'video' ? 'video' : 'image';

    // Check if the file exists
    const file = req.files.find(file => file.fieldname === uploadField);
    if (!file) {
        return res.status(400).send({ message: "No file uploaded." });
    }

    res.status(200).send({ message: "File uploaded successfully!", filePath: file.path });
});


// Route to fetch uploaded files for 'Your Business' page
app.get('/uploads', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send({ message: "Error reading upload directory." });
        }

        // Get detailed information about each file
        const fileDetailsPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const filePath = path.join(uploadDir, file);
                
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        return reject(err);
                    }

                    const ext = path.extname(file).toLowerCase();
                    const mediaType = ext === '.mp4' ? 'video' : 'image';

                    resolve({
                        fileName: file,
                        filePath: `http://localhost:3000/uploads/${file}`, // Adjust URL if necessary
                        mediaType: mediaType,
                        size: stats.size, // File size in bytes
                        createdAt: stats.birthtime, // File creation time
                        modifiedAt: stats.mtime // File last modification time
                    });
                });
            });
        });

        // Wait for all promises to resolve
        Promise.all(fileDetailsPromises)
            .then(fileDetails => {
                res.status(200).json(fileDetails);
            })
            .catch(error => {
                res.status(500).send({ message: "Error getting file details.", error });
            });
    });
});



app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
