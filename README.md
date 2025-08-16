# Reformando tu Futuro - Website

A modern construction and renovation company website built with Astro, featuring responsive carousels, lightbox gallery, and customer review system.

### CI/CD Pipeline

This project has automated CI/CD configured for continuous deployment:

#### **Vercel Integration**

- **Account**: reformandotufuturo.tech@gmail.com
- **Automatic deployments** are configured for:
  - **Master branch** → Production deployment
  - **Develop branch** → Preview deployment

#### **Deployment Process**

1. **Push to develop** → Triggers preview deployment for testing
2. **Push to master** → Triggers production deployment
3. **Pull requests** → Generate preview deployments for review

#### **Branch Strategy**

- `master` - Production-ready code
- `develop` - Development and testing
- Feature branches → Create PR to `develop`

All deployments are automatic and include:

- ✅ Build verification
- ✅ Environment variable injection
- ✅ Performance optimization
- ✅ CDN distributiononal construction company website
- 📱 **Responsive**: Optimized for all devices and screen sizes
- 🖼️ **Project Galleries**: Multiple responsive carousels for different project types
- 🔍 **Lightbox Gallery**: Full-screen image viewer with navigation
- ⭐ **Customer Reviews**: Integrated review system with Supabase
- 🎨 **Smooth Animations**: Professional animations and transitions
- 🚀 **Fast Performance**: Built with Astro for optimal loading speeds

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
│   │   ├── animations.js      # Page animations
│   │   ├── bootstrap.bundle.min.js # Bootstrap JavaScript
│   │   ├── glightbox.min.js   # GLightbox functionality
│   │   ├── lightbox.js        # Lightbox functionality
│   │   ├── main.js            # Main JavaScript
│   │   ├── multi-carousel.js  # Carousel functionality
│   │   ├── new-review-key.js  # Review key generation
│   │   └── review.js          # Review functionality
│   └── images/                # Image assets
│       ├── empty-star.svg     # Empty star icon
│       ├── favicon.svg        # Site favicon
│       ├── full-star.svg      # Full star icon
│       ├── logo.jpg           # Main company logo
│       ├── logo-horizontal.jpg # Horizontal logo variant
│       ├── logo-horizontal-inverted.jpg # Horizontal inverted logo
│       ├── logo-inverted.jpg  # Inverted logo for dark backgrounds
│       ├── call-action/       # Call to action images
│       │   └── overlay.png
│       ├── header/            # Header background images
│       │   ├── background.jpg
│       │   ├── background-2.jpg
│       │   ├── background-3.jpg
│       │   └── header-image.png
│       └── projects/          # Project photos
│           ├── reforma-integral/    # Complete renovation photos (11 images)
│           ├── reforma-banos/       # Bathroom renovation photos (17 images)
│           └── durante-obra/        # Construction process photos (6 images)
├── src/
│   ├── components/
│   │   ├── ProjectCarousel.astro    # Reusable carousel component
│   │   ├── Review.astro             # Customer review component
│   │   └── Welcome.astro            # Welcome section component
│   ├── layouts/
│   │   └── Layout.astro             # Main page layout
│   ├── lib/
│   │   └── supabase.ts              # Supabase configuration
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── 404.astro                # 404 error page
│   │   ├── api/                     # API routes
│   │   │   ├── create-token.ts      # Token creation API
│   │   │   └── review/
│   │   │       └── [token].ts       # Review token API
│   │   ├── error/
│   │   │   └── index.astro          # Error page
│   │   ├── new-review/
│   │   │   └── index.astro          # New review form
│   │   ├── review/
│   │   │   └── [token].astro        # Review submission page
│   │   └── thank-you/
│   │       └── index.astro          # Thank you page
│   └── types/
│       └── review.ts                # TypeScript types
├── .vscode/                    # VS Code configuration
│   ├── extensions.json        # Recommended extensions
│   └── launch.json            # Debug configuration
├── astro.config.mjs           # Astro configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.8.1
- **Runtime**: Node.js 18+
- **Database**: [Supabase](https://supabase.com/) for customer reviews
- **Deployment**: [Vercel](https://vercel.com/) with server-side rendering
- **Animations**: [Motion](https://motion.dev/) for smooth transitions
- **Styling**: Custom CSS with Bootstrap components
- **Image Gallery**: GLightbox for full-screen viewing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for reviews functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd reformando-tu-futuro.com
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

4. **Start development server**

   ```bash
   npm run dev
   ```

   The server will start with `--host` flag to allow external access.

5. **Open your browser**
   Navigate to `http://localhost:4321`

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                       |
| :------------------------ | :----------------------------------------------------------- |
| `npm install`             | Installs dependencies                                        |
| `npm run dev`             | Starts local dev server at `localhost:4321` with host access |
| `npm run build`           | Build your production site to `./dist/`                      |
| `npm run preview`         | Preview your build locally, before deploying                 |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`             |
| `npm run astro -- --help` | Get help using the Astro CLI                                 |

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration (for customer reviews)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Secret key for token generation
SECRET_KEY=your_random_secret_key

# Example:
# SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
# SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# SECRET_KEY=your-secure-random-key-here
```

> **Note**: The environment variables do not use the `PUBLIC_` prefix as they are accessed server-side through `import.meta.env`.

### Setting up Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Create the reviews table** with the following SQL:

   ```sql
   CREATE TABLE public.review_creation_tokens (
      id uuid not null default gen_random_uuid (),
      expires_at timestamp with time zone not null,
      created_at timestamp with time zone not null default now(),
      constraint review_creation_token_pkey primary key (id)
   )  TABLESPACE pg_default;
   
   CREATE TABLE public.reviews (
      id uuid not null default gen_random_uuid (),
      client_name character varying not null,
      score smallint not null,
      description text null,
      created_at timestamp with time zone not null default now(),
      creation_token_id uuid not null,
      constraint reviews_pkey primary key (id),
      constraint reviews_creation_token_id_fkey foreign KEY (creation_token_id) references review_creation_tokens (id) on update CASCADE on delete CASCADE
   ) TABLESPACE pg_default;
   ```
   

3. **Get your credentials** from Project Settings > API
   - Copy the Project URL to `SUPABASE_URL`
   - Copy the anon public key to `SUPABASE_KEY`
   - Generate a secure random string for `SECRET_KEY`

## 🖼️ Managing Project Images

### Adding New Project Categories

1. **Create a new folder** in `public/images/projects/`:

   ```
   public/images/projects/your-new-category/
   ```

2. **Add images** with sequential naming:

   ```
   01.jpeg, 02.jpeg, 03.jpeg, etc.
   ```

3. **Update the homepage** (`src/pages/index.astro`):

   ```astro
   // Add new image array
   const yourNewCategoryImages = Array(numberOfImages)
     .fill(0)
     .map((_, index) =>
       `images/projects/your-new-category/${index < 9 ? "0".concat((index + 1).toString()) : index + 1}.jpeg`
     );
   ```

4. **Add the carousel** to the projects section:
   ```astro
   <ProjectCarousel
     category="Your New Category"
     images={yourNewCategoryImages}
     altPrefix="Your Category"
     id="your-category-id"
   />
   ```

### Updating Existing Images

1. **Replace images** in the corresponding folders:

   - `public/images/projects/reforma-integral/` - Complete renovations
   - `public/images/projects/reforma-banos/` - Bathroom renovations
   - `public/images/projects/durante-obra/` - Construction process

2. **Keep the naming convention**: 01.jpeg, 02.jpeg, etc.

3. **Update image counts** in `src/pages/index.astro` if needed:
   ```astro
   const reformaIntegralImages = Array(11) // Complete renovations
   const reformaBanosImages = Array(17)    // Bathroom renovations
   const duranteObraImages = Array(6)      // Construction process
   ```

### Supported Image Formats

- **JPEG** (.jpeg, .jpg) - Recommended for photos
- **PNG** (.png) - For images with transparency
- **WebP** (.webp) - Modern format for better compression

### Image Optimization Tips

- **Recommended size**: 1200px - 1920px width for best quality
- **File size**: Keep under 500KB per image for fast loading
- **Aspect ratio**: Maintain consistent ratios within each category

## 🎨 Customization

### Colors and Branding

- **Main styles**: Edit `public/css/style.css`
- **Carousel styles**: Edit `public/css/carousel.css`
- **Lightbox styles**: Edit `public/css/lightbox.css`

### Company Information

Update company details in `src/pages/index.astro`:

- Contact information
- Address
- Business hours
- Services offered

### Logo and Branding

Replace logos in `public/images/`:

- `logo.jpg` - Main logo
- `logo-inverted.jpg` - Logo for dark backgrounds
- `logo-horizontal.jpg` - Horizontal version
- `favicon.svg` - Browser favicon

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with the production build.

### Deployment Options

- **Vercel** (Recommended): This project is optimized for Vercel with server-side rendering
  - Automatic deployments from Git
  - Built-in environment variable management
  - Edge functions support for API routes
- **Netlify**: Also supports Astro with server-side rendering
- **Static hosting**: Can be built for static deployment by changing `output` in `astro.config.mjs`

### Environment Variables in Production

Remember to set your environment variables in your hosting platform:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SECRET_KEY`

> **Important**: Since this project uses Vercel adapter with server-side rendering (`output: "server"`), make sure to configure these variables in your Vercel dashboard under Project Settings > Environment Variables.

## 📱 Features Overview

### Responsive Carousels

- **Mobile**: 1 image per view
- **Tablet**: 2 images per view
- **Desktop**: 3 images per view
- **Large screens**: 4 images per view

### Lightbox Gallery

- Click any image to open full-screen view
- Navigate with arrows, keyboard, or swipes
- Shows image counter and category
- Responsive design for all devices

## 🔧 Development Setup

### VS Code Configuration

This project includes VS Code configuration files:

- **`.vscode/extensions.json`**: Recommended extensions for optimal development experience
- **`.vscode/launch.json`**: Debug configuration for Astro applications

### Recommended Extensions

The project suggests installing:

- Astro extension for syntax highlighting and IntelliSense
- TypeScript and JavaScript language support
- CSS/SCSS support extensions

### Development Server

The development server runs with the `--host` flag, allowing external access:

```bash
npm run dev
# Server accessible at:
# - Local: http://localhost:4321
# - Network: http://[your-ip]:4321
```

## 📞 Support

For support or questions about this website:

- **Email**: reformandotufuturo.tech@gmail.com
