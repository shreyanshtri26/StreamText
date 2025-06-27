# StreamText

A modern, interactive React app that transforms user input into animated, visually engaging text displays. Built with React hooks, CSS animations, and a modular component architecture.

---

## ✨ Features

- **Component-based, modern React architecture**
- **5+ animation types**: slide, diagonal, and more
- **Randomized colors, positions, durations, and effects**
- **Interactive UI**: hover, click, and real-time feedback
- **Responsive design**: works on all devices
- **Theme support**: switch between multiple visual themes
- **Performance optimized**: React.memo, useCallback, and efficient state management

---

## 🚀 Deployment Link

- **Vercel Link**: https://stream-text.vercel.app/

---

## 🚀 Getting Started


### Installation
```bash
git clone https://github.com/shreyanshtri26/StreamText
cd StreamText
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```

---

## 🏗️ Project Structure

```
StreamText/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── InputView.jsx / .css      # Text input form
│   │   ├── AnimationView.jsx / .css # Animation canvas
│   │   ├── AnimatedText.jsx / .css  # Animated text logic
│   │   ├── Stats.jsx / .css         # Animation counter
│   │   └── ThemeSelector.jsx / .css # Theme selection UI
│   ├── App.jsx / .css               # Main app logic & styles
│   ├── index.js / .css              # Entry point & base styles
├── package.json
└── README.md
```

---

## 🎯 Component Overview

- **App.jsx**: Main app logic, state, and view switching
- **InputView.jsx**: Text input form, validation, and submission
- **AnimationView.jsx**: Animation canvas, manages active animations, theme selection
- **AnimatedText.jsx**: Handles individual text animation, randomizes properties, user interaction
- **Stats.jsx**: Displays active animation count and feedback
- **ThemeSelector.jsx**: Lets users switch between visual themes

---

## 🎭 Animation System

- **Animation Types**: slideRight, slideLeft, slideDown, slideUp, diagonal (easily extendable)
- **Randomization**: Each animation gets random type, color (HSL), position, duration (3-7s), and font size
- **Interactivity**: Hover to scale, click for pulse, visual feedback
- **Performance**: Up to 5 concurrent animations, automatic cleanup, efficient re-renders

---

## 📱 Responsive Design

- Maintains 16:9 aspect ratio
- Adapts to desktop, tablet, and mobile
- Touch-friendly and scalable UI

---

## 🛠️ Customization

### Add Animation Types
1. Add keyframes to `App.css`:
   ```css
   @keyframes yourAnimation { from { ... } to { ... } }
   ```
2. Register in `AnimatedText.jsx`:
   ```js
   const animationTypes = [ ... { name: 'yourAnimation', getStartPosition: ... } ];
   ```

### Change Colors or Themes
- Update HSL color logic in `AnimatedText.jsx`
- Edit gradients and backgrounds in CSS
- Adjust theme variables for new looks

### Adjust Animation Limits
- Change `maxAnimations` in `AnimationView.jsx`
- Update stats logic if needed

---




## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature-name`
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature-name`
5. Open a pull request

---

## 🎯 Use Cases

- Live event message walls
- Social media displays
- Interactive installations
- Celebrations and greetings
- Educational or gaming overlays



---

**Built with ❤️ using React and modern web tech**
