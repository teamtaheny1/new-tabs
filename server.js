const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

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

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 New Tab app running on http://localhost:${PORT}`);
});
