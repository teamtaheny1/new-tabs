# My New Tab

A beautiful, minimal custom browser new tab page with dynamic wallpapers and customizable shortcuts. Built with Node.js and deployed to Firebase Hosting.

![New Tab Preview](https://img.shields.io/badge/vanilla-javascript-yellow?style=flat-square) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## ✨ Features

- **🎨 Dynamic Wallpapers** - Rotating collection of beautiful wallpapers from dark and nature themes
- **🔗 Quick Access Shortcuts** - Add, edit, and organize your favorite websites
- **⏰ Live Clock & Date** - Always know the current time at a glance
- **🎯 Drag & Drop** - Reorder shortcuts with intuitive drag-and-drop
- **🌐 Auto Favicon** - Automatically fetches website favicons
- **💾 Export/Import** - Backup and restore your shortcuts as JSON
- **🎭 Glassmorphism UI** - Modern, frosted-glass interface design
- **⚙️ Toggle Controls** - Clean interface with collapsible settings
- **📱 Responsive** - Works beautifully on all screen sizes
- **🚀 Firebase Hosting** - Automatically deployed via GitHub Actions
- **⚡ Express Server** - Optional local development server

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

### Production Deployment (Firebase)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set `public` as the public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Update Firebase project ID**
   - Edit `.firebaserc` and replace `your-firebase-project-id` with your actual project ID
   - Edit both workflow files in `.github/workflows/` and update the project ID

5. **Deploy manually**
   ```bash
   firebase deploy
   ```

### GitHub Actions Auto-Deployment

1. **Get Firebase service account key**
   ```bash
   firebase init hosting:github
   ```
   This will automatically:
   - Set up GitHub Actions workflows
   - Add `FIREBASE_SERVICE_ACCOUNT` secret to your GitHub repo

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

### Changing Wallpapers
1. Click the gear icon to show controls
2. Select a wallpaper folder from the dropdown (Dark/Outdoors)
3. Click **Change wallpaper** to rotate to the next image
4. Wallpaper automatically rotates on each page load

### Export/Import
- **Export**: Click "Export" to download `shortcuts.json`
- **Import**: Click "Import" and select a previously exported JSON file

## 🎨 Customization

### Adding Your Own Wallpapers

1. Add images to `wallpapers/dark/` or `wallpapers/nature/`
2. Update the `wallpapers` object in `index.html` (around line 140):

```javascript
const wallpapers = {
  dark: [
    'your-image-1.jpg',
    'your-image-2.jpg'
  ],
  nature: [
    'your-nature-1.jpg'
  ]
};
```

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

- **Node.js + Express** - Simple server for local development
- **Pure vanilla JavaScript** - No frontend frameworks or dependencies
- **LocalStorage** - All data stored locally in your browser
- **Firebase Hosting** - Static file hosting with global CDN
- **GitHub Actions** - Automated CI/CD pipeline
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
