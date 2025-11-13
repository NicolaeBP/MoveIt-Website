# MoveIt Website

Official marketing and download website for MoveIt - a professional mouse automation tool for macOS, Windows, and Linux.

**Live Website:** https://nicolaebp.github.io/MoveIt-Website/

## Overview

MoveIt is a mouse jiggler and auto mouse mover application designed for professionals who need to keep their computers active during specific workflows. The website provides comprehensive information about the application, download options, and support resources.

## Features

### Multilingual Support
Complete internationalization with 13 languages:
- English (default), Romanian, Spanish, French, German, Italian
- Portuguese (Brazil & Portugal), Russian
- Simplified Chinese, Traditional Chinese, Japanese, Korean

Features include:
- Automatic browser language detection on first visit
- URL-based language routing (e.g., `/es/`, `/fr/`)
- Persistent language preference storage

### Theming
- Light and dark mode support
- System preference detection (auto mode)
- Manual theme selection with persistent storage

### SEO Optimization
- Server-side rendering (SSR) for improved performance
- Pre-rendered routes for all 13 languages
- XML sitemap with hreflang tags for multilingual SEO
- Schema.org structured data (JSON-LD)
- Optimized meta tags for all pages

### Pages
- **Home**: Hero section, features showcase, use cases, and call-to-action
- **Download**: Mac App Store link, direct GitHub downloads, installation instructions
- **Contact**: Developer information, support resources, contributing guidelines
- **404**: Custom not found page with helpful navigation

## Tech Stack

- **React** 19.1.1 - UI library
- **React Router** 7.9.5 - Routing with SSR support
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.1.11 - Build tool and dev server
- **Tailwind CSS** 4.1.14 - Utility-first CSS framework
- **Lucide React** 0.553.0 - Icon library
- **react-schemaorg** 2.0.0 - Structured data for SEO

## Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/NicolaeBP/MoveIt.git
cd mover-website
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/MoveIt/`

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Building

Build the production-ready application:

```bash
npm run build
```

This command:
1. Updates the sitemap lastmod dates
2. Builds the application with Vite
3. Pre-renders all routes for 13 languages (39 total routes)

Build output is located in the `build/` directory.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Automated Deployment (GitHub Actions)

The deployment workflow:
1. Installs dependencies
2. Builds the production app
3. Creates `.nojekyll` file (prevents Jekyll processing)
4. Deploys to GitHub Pages

### Manual Deployment

```bash
npm run deploy
```

This builds the app and creates the `.nojekyll` file required for GitHub Pages.

## Project Structure

```
mover-website/
├── .github/workflows/      # GitHub Actions deployment workflow
├── app/                    # React Router app configuration
├── public/                 # Static assets and sitemap
├── scripts/                # Build scripts (sitemap updater)
├── src/
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable React components
│   ├── context/           # React Context (Language, Theme)
│   ├── i18n/              # Translation files for 13 languages
│   ├── pages/             # Page components (Home, Download, Contact)
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── build/                 # Production build output
└── vite.config.ts         # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production app (includes sitemap update)
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint code linting
- `npm run deploy` - Build and prepare for GitHub Pages deployment

## Contributing

Contributions are welcome! If you'd like to contribute to MoveIt:

1. Visit the repository: https://github.com/NicolaeBP/MoveIt
2. Open an issue to discuss proposed changes
3. Submit a pull request with your improvements

### Bug Reports & Feature Requests

Please use the GitHub Issues page: https://github.com/NicolaeBP/MoveIt/issues

## Developer

**Nicolae Balica**

- Email: nicolae.balica.pro@gmail.com
- GitHub: [@NicolaeBP](https://github.com/NicolaeBP)

## License

This project is open source and available for community contributions.
