# Cake Angular Project

A modern Angular application for a cake bakery with product catalog, shopping cart, and user management.

## Features

- Product catalog with categories and filtering
- Product detail pages with image galleries
- Shopping cart functionality
- Team member showcase
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: Run both server and client together
```bash
npm run dev
```

This will start both the JSON server (on port 3000) and the Angular development server (on port 4200).

### Option 2: Run separately

1. Start the JSON server (for the database):
```bash
npm run json-server
```

2. In a new terminal, start the Angular development server:
```bash
npm start
```

## Accessing the Application

- Angular app: http://localhost:4200
- JSON API: http://localhost:3000

## API Endpoints

The JSON server provides the following endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `GET /categories` - Get all categories
- `GET /teamMembers` - Get team members

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   │   ├── home/           # Home page
│   │   ├── shop/           # Product catalog
│   │   ├── product-detail/ # Product detail page
│   │   ├── cart/           # Shopping cart
│   │   └── team/           # Team page
│   └── services/           # Services
│       ├── database.service.ts  # Main data service
│       ├── http.service.ts      # HTTP client wrapper
│       ├── cart.service.ts      # Cart management
│       └── image.service.ts     # Image utilities
└── assets/                 # Static assets
    ├── images/            # Product images
    ├── Banner/            # Banner images
    └── Icons/             # UI icons
```

## Data Structure

The application uses `db.json` as the data source with the following structure:

- **Products**: Complete product information including images, pricing, and reviews
- **Categories**: Product categories for filtering
- **Team Members**: Team member information

## Development Notes

- The application uses Angular standalone components
- HTTP requests are handled through a custom HttpService
- Images are served from the assets folder
- The cart state is managed in-memory using a service

## Troubleshooting

1. **Images not loading**: Ensure the assets folder structure matches the paths in `db.json`
2. **API errors**: Make sure the JSON server is running on port 3000
3. **Build errors**: Run `npm install` to ensure all dependencies are installed