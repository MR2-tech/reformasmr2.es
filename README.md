# Reformas MR2 - Website

A modern construction and renovation company website built with Astro, featuring responsive carousels, modal galleries, customer review system, and token-based review management.

## ✨ Features

## ✨ Features

- 📱 **Responsive Design**: Optimized for all devices and screen sizes
- 🖼️ **Project Galleries**: Multiple responsive carousels with modal viewer
- 🔍 **Modal Gallery**: Full-screen image viewer with navigation and category display
- ⭐ **Review System**: Token-based customer review system with star ratings
- 🎨 **Smooth Animations**: Professional animations with Motion.js
- 🚀 **Fast Performance**: Built with Astro for optimal loading speeds
- 🔒 **Secure Reviews**: Protected review creation with secret key validation

## 🚀 Project Structure

```text
/
├── public/                     # Static assets
│   ├── css/                   # Stylesheets
│   │   ├── bootstrap.min.css  # Bootstrap framework
│   │   ├── carousel.css       # Carousel styling
│   │   ├── glightbox.min.css  # GLightbox styles
│   │   ├── lightbox.css       # Lightbox gallery styling
│   │   ├── lineicons.css      # LineIcons font styles
│   │   ├── style.css          # Main styles
│   │   └── tiny-slider.css    # Tiny slider styles
│   ├── fonts/                 # Font files
│   │   ├── LineIcons.eot      # LineIcons font formats
│   │   ├── LineIcons.ttf
│   │   ├── LineIcons.woff
│   │   └── LineIcons.woff2
│   ├── js/                    # JavaScript files
│   │   ├── animations.js      # Page animations with Motion.js
│   │   ├── bootstrap.bundle.min.js # Bootstrap framework
│   │   ├── glightbox.min.js   # GLightbox library (unused)
│   │   ├── lightbox.js        # Custom lightbox functionality
│   │   ├── main.js            # Main JavaScript and navigation
│   │   ├── modal-carousel.js  # Modal carousel functionality
│   │   ├── multi-carousel.js  # Multi-project carousel functionality
│   │   ├── new-review-key.js  # Review key generation interface
│   │   └── review.js          # Review form interactions
│   └── images/                # Image assets
│       ├── empty-star.svg     # Empty star icon for reviews
│       ├── favicon.svg        # Site favicon
│       ├── full-star.svg      # Full star icon for reviews
│       ├── logo.png           # Main company logo
│       ├── logo-white.png     # White logo for dark backgrounds
│       ├── call-action/       # Call to action section images
│       │   └── overlay.png
│       ├── header/            # Header background images
│       │   ├── 2991.jpg
│       │   ├── background.jpg
│       │   ├── background-2.jpg
│       │   ├── background-3.jpg
│       │   └── header-image.png
│       └── projects/          # Project portfolio images
│           ├── diseno-planificacion/     # Design & planning projects
│           ├── pintura-y-decoracion/     # Painting & decoration projects
│           ├── reforma-banos/            # Bathroom renovation projects (20 images)
│           ├── reforma-cocina/           # Kitchen renovation projects (6 images)
│           ├── reforma-integral/         # Complete renovation projects (17 images)
│           └── servicio-urgencias/       # Emergency service projects
├── src/
│   ├── components/
│   │   ├── ModalCarousel.astro      # Modal gallery component for full-screen viewing
│   │   ├── ProjectCarousel.astro    # Responsive carousel component
│   │   ├── Review.astro             # Customer review display component
│   │   └── Welcome.astro            # Welcome section component (unused)
│   ├── layouts/
│   │   └── Layout.astro             # Main page layout
│   ├── lib/
│   │   └── supabase.ts              # Supabase client configuration
│   ├── pages/
│   │   ├── index.astro              # Main homepage with all sections
│   │   ├── 404.astro                # 404 error page
│   │   ├── api/                     # API routes for review system
│   │   │   ├── create-token.ts      # Review token creation endpoint
│   │   │   └── review/
│   │   │       └── [token].ts       # Review submission endpoint
│   │   ├── error/
│   │   │   └── index.astro          # Generic error page
│   │   ├── new-review/
│   │   │   └── index.astro          # Review token generation form
│   │   ├── review/
│   │   │   └── [token].astro        # Customer review submission form
│   │   └── thank-you/
│   │       └── index.astro          # Post-submission thank you page
│   └── types/
│       └── review.ts                # TypeScript interfaces for reviews
│   ├── .vscode/                # VS Code workspace configuration
│   │   ├── extensions.json    # Recommended extensions for development
│   │   └── launch.json        # Debug configuration for Astro
├── astro.config.mjs           # Astro configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.8.1 with server-side rendering
- **Database**: [Supabase](https://supabase.com/) for reviews and token management
- **Deployment**: [Vercel](https://vercel.com/) with automatic CI/CD
- **Animations**: [Motion](https://motion.dev/) v12.16.0 for smooth transitions
- **Styling**: Custom CSS with Bootstrap 5 components
- **Icons**: LineIcons font for consistent iconography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account for reviews functionality

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MR2-tech/reformasmr2.es.git
   cd reformasmr2.es
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see Environment Variables section)

4. **Start development server**
   ```bash
   npm run dev
   ```
   Server starts at `http://localhost:4321` with `--host` flag for network access.

## 🧞 Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installs dependencies                       |
| `npm run dev`     | Starts local dev server with network access |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview build locally before deploying      |
| `npm run astro`   | Run Astro CLI commands                      |

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Review token generation
SECRET_KEY=your_random_secret_key
```

> **Note**: Variables are accessed server-side and do not use `PUBLIC_` prefix.

### Setting up Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Create the required tables**:

   ```sql
   CREATE TABLE review_creation_tokens (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      expires_at timestamp with time zone NOT NULL,
      created_at timestamp with time zone DEFAULT now()
   );

   CREATE TABLE reviews (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      client_name varchar NOT NULL,
      score smallint NOT NULL,
      description text,
      created_at timestamp with time zone DEFAULT now(),
      creation_token_id uuid REFERENCES review_creation_tokens(id)
   );
   ```

3. **Get your credentials** from Project Settings > API and add to `.env`

## 🖼️ Managing Project Images

### Current Project Categories

The website supports 6 project categories:

- **Reforma Integral** (17 images) - Complete home renovations
- **Reforma Baños** (20 images) - Bathroom renovations
- **Reforma Cocina** (6 images) - Kitchen renovations
- **Pintura y Decoración** - Painting and decoration projects
- **Diseño y Planificación** - Design and planning projects
- **Servicio Urgencias** - Emergency repair services

### Adding New Images

1. **Add images** to the appropriate folder in `public/images/projects/[category]/`
2. **Use sequential naming**: `01.jpeg`, `02.jpeg`, etc.
3. **Update image counts** in `src/pages/index.astro`:
   ```astro
   const reformaIntegralImages = Array(17) // Update number
   ```

### Image Optimization

- **Recommended size**: 1200-1920px width
- **File size**: Under 500KB per image
- **Format**: JPEG for photos, PNG for transparency
- **Aspect ratio**: Keep consistent within categories

## 🎨 Customization

### Styling and Branding

- **Main styles**: `public/css/style.css`
- **Carousel styles**: `public/css/carousel.css`
- **Modal gallery**: `public/css/lightbox.css`

### Company Information

Update details in `src/pages/index.astro`:

- Contact information and address
- Business hours and services
- WhatsApp integration (+34640113953)

### Logo and Assets

Replace files in `public/images/`:

- `logo.png` - Main logo
- `logo-white.png` - Logo for dark backgrounds
- `favicon.svg` - Browser favicon

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

### Vercel Deployment (Recommended)

This project is optimized for Vercel with:

- Server-side rendering enabled
- Automatic deployments from Git
- Environment variable management
- API routes support

Set environment variables in Vercel dashboard under Project Settings.

## 📱 Key Features

### Review System

- **Token-based**: Secure review creation with secret key validation
- **Star ratings**: 1-5 star rating system with descriptive text
- **Form validation**: Character limits and required field validation
- **Thank you flow**: Complete submission experience

### Project Galleries

- **Modal viewer**: Full-screen image viewing with navigation
- **Responsive carousels**: Adapts to screen size (1-4 images per view)
- **Multiple categories**: 6 different project types supported
- **Smooth animations**: Professional transitions powered by Motion.js

### Contact Integration

- **WhatsApp integration**: Direct contact via WhatsApp
- **Email contact**: contacto@reformasmr2.es
- **Address mapping**: Google Maps integration
- **Business hours**: Clearly displayed contact information

## 🔧 Development

### VS Code Setup

The project includes optimized VS Code configuration:

- **Recommended extensions**: Astro, TypeScript support
- **Debug configuration**: Ready for Astro development
- **Development server**: Runs with `--host` for network access

### Review System Architecture

1. **Token generation**: `/new-review` creates secure tokens
2. **Review submission**: `/review/[token]` handles form submissions
3. **Database storage**: Supabase handles reviews and token management
4. **Validation**: Server-side validation for security

---

## 📞 Support

**Email**: contacto@reformasmr2.es  
**Phone**: +34640113953  
**Address**: Calle de Toledo 50, 28939 Arroyomolinos, Madrid

**Repository**: [MR2-tech/reformasmr2.es](https://github.com/MR2-tech/reformasmr2.es)
