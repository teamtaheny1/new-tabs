const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const folder = req.body.folder || 'default';
    const uploadPath = path.join(__dirname, 'public', 'wallpapers', folder);
    
    // Create folder if it doesn't exist
    try {
      await fs.mkdir(uploadPath, { recursive: true });
    } catch (err) {
      console.error('Error creating directory:', err);
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Sanitize filename
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, Date.now() + '-' + sanitized);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// API endpoint to get wallpaper folders and files
app.get('/api/wallpapers', async (req, res) => {
  try {
    const wallpapersPath = path.join(__dirname, 'public', 'wallpapers');
    const folders = await fs.readdir(wallpapersPath, { withFileTypes: true });
    
    const wallpaperData = {};
    
    for (const folder of folders) {
      if (folder.isDirectory()) {
        const folderPath = path.join(wallpapersPath, folder.name);
        const files = await fs.readdir(folderPath);
        
        // Filter for image files only
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|webp|gif)$/i.test(file) && !file.startsWith('.')
        );
        
        if (imageFiles.length > 0) {
          wallpaperData[folder.name] = imageFiles;
        }
      }
    }
    
    res.json(wallpaperData);
  } catch (error) {
    console.error('Error reading wallpapers:', error);
    res.status(500).json({ error: 'Failed to load wallpapers' });
  }
});

// Create a new wallpaper folder
app.post('/api/wallpapers/folders', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !/^[a-zA-Z0-9_-]+$/.test(name)) {
      return res.status(400).json({ error: 'Invalid folder name. Use only letters, numbers, hyphens, and underscores.' });
    }
    
    const folderPath = path.join(__dirname, 'public', 'wallpapers', name);
    
    // Check if folder already exists
    try {
      await fs.access(folderPath);
      return res.status(400).json({ error: 'Folder already exists' });
    } catch {
      // Folder doesn't exist, create it
      await fs.mkdir(folderPath, { recursive: true });
      res.json({ success: true, folder: name });
    }
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

// Upload images to a folder
app.post('/api/wallpapers/upload', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      folder: req.body.folder
    }));
    
    res.json({ success: true, files: uploadedFiles });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: error.message || 'Failed to upload files' });
  }
});

// Delete an image
app.delete('/api/wallpapers/:folder/:filename', async (req, res) => {
  try {
    const { folder, filename } = req.params;
    
    // Validate inputs to prevent directory traversal
    if (!folder || !filename || folder.includes('..') || filename.includes('..')) {
      return res.status(400).json({ error: 'Invalid folder or filename' });
    }
    
    const filePath = path.join(__dirname, 'public', 'wallpapers', folder, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      res.json({ success: true, message: 'File deleted' });
    } catch {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Delete a folder
app.delete('/api/wallpapers/folders/:folder', async (req, res) => {
  try {
    const { folder } = req.params;
    
    // Validate input to prevent directory traversal
    if (!folder || folder.includes('..')) {
      return res.status(400).json({ error: 'Invalid folder name' });
    }
    
    const folderPath = path.join(__dirname, 'public', 'wallpapers', folder);
    
    // Check if folder exists
    try {
      await fs.access(folderPath);
      await fs.rm(folderPath, { recursive: true, force: true });
      res.json({ success: true, message: 'Folder deleted' });
    } catch {
      res.status(404).json({ error: 'Folder not found' });
    }
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ error: 'Failed to delete folder' });
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 New Tab app running on http://localhost:${PORT}`);
});
