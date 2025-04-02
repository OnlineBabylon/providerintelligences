# Healthcare Provider Intelligence Landing Page

A modern, responsive landing page for the Healthcare Provider Intelligence Platform, built with React and TailwindCSS.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Optimized for performance and SEO
- Built with React and TailwindCSS
- Ready for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `build` directory.

## Deployment

This project is optimized for deployment on Vercel. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically detect the React project and configure the build settings

### Manual Deployment

If you prefer to deploy manually:

1. Create a production build:
```bash
npm run build
```

2. Deploy the contents of the `build` directory to your hosting service

## Development

### Project Structure

```
landing-page/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 