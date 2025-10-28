# My New Tab

A beautiful, minimal custom browser new tab page with dynamic wallpapers and customizable shortcuts.

![New Tab Preview](https://img.shields.io/badge/vanilla-javascript-yellow?style=flat-square) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

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

## 🚀 Quick Start

### Installation

1. **Clone or download** this repository
2. **Open** `index.html` in your browser
3. **Set as new tab** in your browser (see browser-specific instructions below)

### Browser Setup

#### Chrome/Edge
1. Install extension like [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)
2. Point it to your local `index.html` file path
3. Or use `file:///Users/YOUR_USERNAME/path/to/new_tab/index.html`

#### Firefox
1. Install [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/)
2. Set local file path in extension settings

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

- **Pure vanilla JavaScript** - No frameworks or dependencies
- **LocalStorage** - All data stored locally in your browser
- **Single file** - Everything contained in `index.html`
- **Modern CSS** - Grid layout, backdrop filters, glassmorphism

## 📁 Project Structure

```
new_tab/
├── index.html          # Main application file
├── readme.md          # This file
└── wallpapers/
    ├── dark/          # Dark theme wallpapers
    └── nature/        # Nature theme wallpapers
```

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

## 📝 License

This project is open source and available for personal use.

## 🙏 Credits

Wallpapers courtesy of [Pexels](https://www.pexels.com/) contributors.
