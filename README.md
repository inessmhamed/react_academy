# React Academy

A modern educational platform built with React, TypeScript, and Vite. This project provides a comprehensive learning management system with multilingual support and responsive design.

## 🚀 Features

- **Multi-language Support**: Arabic and English internationalization using i18next
- **Responsive Design**: Mobile-first approach with modern UI components
- **Interactive Components**: Carousels, maps, and dynamic content sections
- **Modern Tech Stack**: React 18, TypeScript, Vite for fast development
- **Component Library**: PrimeReact for rich UI components
- **Animations**: Framer Motion for smooth transitions
- **Maps Integration**: Leaflet for interactive maps
- **Admin Portal**: Separate admin interface for content management

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **i18next** - Internationalization framework
- **PrimeReact** - Rich UI component library
- **Framer Motion** - Animation library
- **FontAwesome** - Icon library

### Styling
- **CSS Modules** - Scoped styling
- **PrimeFlex** - Flexbox utilities
- **Responsive Design** - Mobile-first approach

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Vitest** - Testing framework

## 📁 Project Structure

```
react-academy/
├── src/
│   ├── components/
│   │   ├── Home/           # Home page components
│   │   ├── shared/         # Reusable components
│   │   └── UnderHeader/    # Header components
│   ├── pages/
│   │   ├── HomePage/       # Home page
│   │   ├── AboutUsPage/    # About us page
│   │   ├── ContactUsPage/  # Contact page
│   │   └── FormationsPage/ # Courses page
│   ├── assets/             # Images and static files
│   ├── locales/           # Translation files
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── admin-portal/          # Admin interface
├── backend/              # Backend server
└── public/               # Public assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/inessmhamed/react_academy.git
cd react_academy
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run linting and formatting
- `yarn test` - Run tests
- `yarn coverage` - Generate test coverage report

## 🌐 Pages

- **Home** - Landing page with hero section and course overview
- **About Us** - Information about the academy
- **Formations** - Available courses and programs
- **Contact Us** - Contact information and form

## 🎨 Components

### Shared Components
- **Header** - Navigation and branding
- **Footer** - Site footer with links
- **Loader** - Loading animations
- **NavBar** - Main navigation

### Home Page Components
- **CarouselSection** - Image carousel
- **AboutSections** - About us preview
- **FormationSection** - Course highlights
- **ServicesSection** - Services overview
- **GoalsSections** - Academy goals
- **MapSection** - Location map

## 🌍 Internationalization

The project supports Arabic and English languages:
- Translation files located in `src/locales/`
- Automatic language detection
- RTL support for Arabic

## 🔧 Configuration

### Vite Configuration
- TypeScript support
- Path aliases
- React SWC for fast refresh

### ESLint & Prettier
- Consistent code formatting
- React best practices
- TypeScript rules

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid system
- Adaptive components
- Touch-friendly interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Team

Developed by the React Academy team.

## 📞 Support

For support and questions, please contact us through the contact page or open an issue in this repository.
