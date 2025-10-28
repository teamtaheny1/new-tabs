# My New Tab

A beautiful, minimal custom browser new tab page with dynamic wallpapers and customizable shortcuts. Built with Node.js and deployed to Firebase Hosting.

![New Tab Preview](https://img.shields.io/badge/vanilla-javascript-yellow?style=flat-square) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## ✨ Features

- **🎨 Dynamic Wallpapers** - Rotating collection of beautiful wallpapers from customizable folders
- **🖼️ Wallpaper Manager** - Create folders, upload, and delete wallpaper images directly from the UI
- **🔗 Quick Access Shortcuts** - Add, edit, and organize your favorite websites
- **⏰ Live Clock & Date** - Always know the current time at a glance
- **🎯 Drag & Drop** - Reorder shortcuts with intuitive drag-and-drop
- **🌐 Auto Favicon** - Automatically fetches website favicons
- **💾 Export/Import** - Backup and restore your shortcuts as JSON
- **🎭 Glassmorphism UI** - Modern, frosted-glass interface design
- **⚙️ Toggle Controls** - Clean interface with collapsible settings
- **📱 Responsive** - Works beautifully on all screen sizes
- **⚡ Express Server** - Full-featured local development server with API
- **📁 File Upload** - Drag & drop or click to upload wallpaper images

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/teamtaheny1/new-tabs.git
   cd new-tabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. **Automatic deployment**
   - Every push to `main` triggers a production deployment
   - Pull requests create preview deployments

### Browser Setup

#### Chrome/Edge
1. Install extension like [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)
2. Point it to your Firebase hosting URL: `https://your-project.web.app`
3. Or use your local development URL: `http://localhost:3000`

#### Firefox
1. Install [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/)
2. Set Firebase hosting URL or local URL in extension settings

## 📖 Usage

### Adding Shortcuts
1. Click the **gear icon** (⚙️) in the bottom-right corner
2. Enter a URL in the form at the bottom
3. Optionally add a custom title
4. Click **Add**

### Managing Shortcuts
- **Reorder**: Drag and drop tiles to rearrange
- **Edit**: Right-click a tile → Edit
- **Delete**: Right-click a tile → Delete
- **Open**: Right-click a tile → Open (or just click normally)

### Managing Wallpapers
1. Click the gear icon to show controls
2. Click **Manage Wallpapers** button
3. **Create Folders**: Enter a folder name and click "Create Folder"
4. **Upload Images**: 
   - Select a folder from the dropdown
   - Click the upload area or drag & drop images
   - Supports JPG, PNG, WEBP, GIF (max 10MB each)
5. **Delete Images**: 
   - Select a folder to view its images
   - Hover over an image and click the delete icon
6. **Delete Folders**: Click the ✕ next to a folder name (deletes all images in that folder)

### Changing Wallpapers
1. Click the gear icon to show controls
2. Select a wallpaper folder from the dropdown
3. Click **Change wallpaper** to rotate to the next image
4. Wallpaper automatically rotates on each page load

### Export/Import Shortcuts
- **Export**: Click "Export" to download `shortcuts.json`
- **Import**: Click "Import" and select a previously exported JSON file

## 🎨 Customization

### Managing Wallpapers (New!)

The app now includes a built-in wallpaper manager! No need to manually edit files:

1. Click the **gear icon** (⚙️) in the bottom right
2. Click **Manage Wallpapers**
3. Create new folders, upload images, or delete existing ones
4. All changes are immediately reflected in the folder dropdown

The wallpaper system automatically scans your folders and displays all available images. You can organize your wallpapers however you like!

### Styling

Edit CSS variables in `:root` (line 7) to customize colors and appearance:

```css
:root {
  --bg-blur: 6px;
  --tile-size: 92px;
  --tile-radius: 16px;
  --gap: 14px;
  --glass: rgba(255,255,255,0.05);
  --text: #f2f4f8;
}
```

## 🛠️ Technical Details

- **Node.js + Express** - Server with REST API for wallpaper management
- **Multer** - File upload handling middleware
- **Pure vanilla JavaScript** - No frontend frameworks or dependencies
- **LocalStorage** - Shortcuts data stored locally in your browser
- **Dynamic File System** - Wallpapers automatically detected from folders
- **Modern CSS** - Grid layout, backdrop filters, glassmorphism

## 📡 API Endpoints

The local server provides the following API endpoints:

- `GET /api/wallpapers` - List all wallpaper folders and files
- `POST /api/wallpapers/folders` - Create a new wallpaper folder
- `POST /api/wallpapers/upload` - Upload images to a folder
- `DELETE /api/wallpapers/:folder/:filename` - Delete a specific image
- `DELETE /api/wallpapers/folders/:folder` - Delete a folder and all its images
- **Modern CSS** - Grid layout, backdrop filters, glassmorphism

## 📁 Project Structure

```
new_tab/
├── .github/
│   └── workflows/
│       ├── firebase-hosting-merge.yml      # Deploy on push to main
│       └── firebase-hosting-pull-request.yml # Preview on PR
├── public/                 # Firebase hosting directory
│   ├── index.html         # Main application file
│   └── wallpapers/        # Wallpaper images
├── wallpapers/            # Source wallpapers
│   ├── dark/              # Dark theme wallpapers
│   └── nature/            # Nature theme wallpapers
├── server.js              # Express server for local dev
├── package.json           # Node.js dependencies
├── firebase.json          # Firebase hosting config
├── .firebaserc            # Firebase project config
├── .gitignore            # Git ignore rules
└── readme.md             # This file
```

## 📝 Scripts

- `npm start` - Run production server
- `npm run dev` - Run development server with auto-reload
- `firebase deploy` - Manual deployment to Firebase
- `firebase serve` - Test Firebase hosting locally

## 🎯 Keyboard Shortcuts

- **ESC** - Close context menu

## 🤝 Contributing

Feel free to fork this project and customize it to your needs! Some ideas:
- Add search functionality
- Weather widget
- Todo list integration
- Theme switcher (dark/light mode)
- Custom backgrounds from URLs
- Folder organization for shortcuts

### Development Workflow

1. Create a new branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes and test locally
   ```bash
   npm run dev
   ```

3. Commit and push
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```

4. Create a Pull Request on GitHub
   - GitHub Actions will create a preview deployment
   - Review the preview before merging

## 🔐 Environment Variables

For local development, create a `.env` file (see `.env.example`):

```env
PORT=3000
FIREBASE_PROJECT_ID=your-firebase-project-id
```

## 🔑 Required GitHub Secrets

For GitHub Actions to work, add these secrets to your repository:

- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON (auto-generated by Firebase CLI)
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## 📝 License

This project is open source and available for personal use.

## 🙏 Credits

Wallpapers courtesy of [Pexels](https://www.pexels.com/) contributors.
