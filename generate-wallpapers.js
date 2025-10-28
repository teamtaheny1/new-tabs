#!/usr/bin/env node
/**
 * Generate wallpapers.json for static hosting
 * This script scans the public/wallpapers directory and creates a JSON file
 * that can be used by the frontend when hosted on Firebase (static hosting)
 */

const fs = require('fs').promises;
const path = require('path');

async function generateWallpapersJson() {
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
    
    const outputPath = path.join(__dirname, 'public', 'wallpapers.json');
    await fs.writeFile(outputPath, JSON.stringify(wallpaperData, null, 2));
    
    console.log('✅ wallpapers.json generated successfully!');
    console.log(`📁 Folders found: ${Object.keys(wallpaperData).join(', ')}`);
    Object.entries(wallpaperData).forEach(([folder, files]) => {
      console.log(`   ${folder}: ${files.length} images`);
    });
  } catch (error) {
    console.error('❌ Error generating wallpapers.json:', error);
    process.exit(1);
  }
}

generateWallpapersJson();
