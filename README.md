# Viraj Ravani Portfolio

This repository contains the complete codebase for the personal portfolio website of Viraj Ravani, a Product Designer and Software Engineer. The website showcases professional work, hackathon victories, volunteer work, certificates, and technical skills. It is designed to be highly performant, visually premium, and fully responsive across all device sizes, utilizing standard web standards and optimizations.

The production site is live and hosted at: https://www.virajravani.in/

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [File and Page Directory](#file-and-page-directory)
    * [Main Pages](#main-pages)
    * [Fast Redirect Helpers](#fast-redirect-helpers)
    * [System and SEO Files](#system-and-seo-files)
5. [Interactive Components and Logic](#interactive-components-and-logic)
    * [Services Explorer Wheel](#services-explorer-wheel)
    * [Interactive Venn Diagram](#interactive-venn-diagram)
    * [Project Filtering Mechanism](#project-filtering-mechanism)
    * [Swipeable Quote Carousel](#swipeable-quote-carousel)
    * [Connect Pill Interactive Widget](#connect-pill-interactive-widget)
6. [Firebase Analytics System](#firebase-analytics-system)
    * [Dynamic SDK Importing](#dynamic-sdk-importing)
    * [Session-Based Tracking](#session-based-tracking)
    * [Event Click Mapping](#event-click-mapping)
    * [Silent Fallback Mechanism](#silent-fallback-mechanism)
7. [Performance Optimizations](#performance-optimizations)
    * [Link Prefetching](#link-prefetching)
    * [Asset Preloading](#asset-preloading)
    * [Image Optimization and Lazy Loading](#image-optimization-and-lazy-loading)
8. [SEO and Accessibility](#seo-and-accessibility)
    * [Structured JSON-LD Data](#structured-json-ld-data)
    * [Meta Tags](#meta-tags)
    * [Semantic Layout](#semantic-layout)
9. [Progressive Web App Integration](#progressive-web-app-integration)
10. [Customization Guide](#customization-guide)
11. [Local Development and Hosting](#local-development-and-hosting)
12. [Author Details](#author-details)

## Project Overview

The website is constructed as a multi-page static site. The layout uses a fixed desktop sidebar navigation bar on the left that transitions into a top header with a slide-out hamburger menu drawer on mobile devices. The theme follows a light neutral aesthetic with background color `#FBFBFA` and dark primary text color `#191919`, accented by subtle pinks and blues. High-quality webp and mockups are used to showcase certificates, hackathon team photos, and application interfaces.

## Technology Stack

The project relies entirely on native browser features to ensure maximum compatibility, security, and loading speed:

* **Markup**: HTML5 using semantic sections (header, main, section, footer, aside, article, nav).
* **Styling**: Vanilla CSS3 using custom properties for design tokens, flexbox and grid layouts, clamp functions for fluid typography, custom keyframe animations, and hardware-accelerated transitions.
* **Logic**: Vanilla JavaScript (ES6) for DOM manipulation, swipe guestures, dynamic rotating wheel calculation, cookie/session management, and interaction logging.
* **Typography**:
    * **Primary Font**: Plus Jakarta Sans (loaded via Google Fonts) for body copy and UI elements.
    * **Heading Font**: NType82-Regular (self-hosted OTF file) for a distinct brand voice.
    * **Signature Font**: Caveat (loaded via Google Fonts) for personal elements and annotations.
* **Analytics**: Custom Google Analytics script integration in analytics.js for tracking visitor and event statistics.

## Directory Structure

The structure of the repository is outlined below:

```
Portfolio_agv1/
├── assets/
│   ├── [47 WebP/JPG image assets]
│   ├── Viraj_Ravani_Resume.pdf
│   └── resume.pdf
├── analytics/
│   └── analytics.js
├── src/
│   ├── 404.html
│   ├── backup.html
│   ├── call.html
│   ├── certificates.html
│   ├── contact.html
│   ├── email.html
│   ├── github.html
│   ├── hackathons.html
│   ├── index.html
│   ├── linkedin.html
│   ├── phone.html
│   ├── projects.html
│   ├── resume.html
│   ├── socials.html
│   └── volunteer-work.html
├── fonts/
│   └── NType82-Regular.otf
├── others/
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
└── README.md
```

## File and Page Directory

### Main Pages

All core HTML pages are located under the `src/` directory:

* **[index.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/index.html)**: The landing page outlining the personal narrative, containing:
    * Sidebar navigation (desktop) and mobile hamburger menu overlay.
    * Interactive Services Explorer rotating wheel.
    * Key Achievements summary card.
    * Experience Timeline highlighting prior professional roles.
    * Selected Work showcasing core projects.
    * Education Timeline detailing academic progression.
    * About Me section featuring an interactive Venn Diagram.
    * Testimonial quote swiper carousel.
    * Draggable Connect Card selection pill widget.
* **[projects.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/projects.html)**: Displays a categorizable grid of projects (Mobile Apps, Webapps, Websites, Extensions, IoT/Embedded) with interactive tab filtering.
* **[hackathons.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/hackathons.html)**: Highlights competitive coding, victories, key builds, and contains galleries showing teamwork.
* **[certificates.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/certificates.html)**: Grid of professional achievements and skills certifications. Clicking thumbnails opens full certificate images.
* **[volunteer-work.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/volunteer-work.html)**: Outlines details of NGO support and outreach roles.
* **[contact.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/contact.html)**: Structured layout with contact form fields and links.
* **[socials.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/socials.html)**: Flip cards with interactive paths pointing to professional profiles.

### Fast Redirect Helpers

These lightweight HTML files automatically redirect users to external URLs, avoiding slow intermediary pages or broken links. They contain a custom SessionStorage mechanism to prevent back-button routing loops. Located under `src/`:

* **[github.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/github.html)**: Redirects to GitHub profile (`https://github.com/v3ravani`).
* **[linkedin.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/linkedin.html)**: Redirects to LinkedIn profile (`https://www.linkedin.com/in/virajravani`), attempting a native mobile app scheme first with a web URL fallback.
* **[resume.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/resume.html)**: Redirects directly to `../assets/resume.pdf`.
* **[email.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/email.html)**: Opens a default mail app targeting `mailto:viraj.ravani@somaiya.edu`.
* **[call.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/call.html)** / **[phone.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/phone.html)**: Initiates telephone protocols (`tel:+919137817583`).

### System and SEO Files

Located under `others/` except backup.html which is under `src/`:

* **[backup.html](file:///c:/Users/ravan/Desktop/Portfolio_agv1/src/backup.html)**: Backup template of the home page containing consolidated style blocks.
* **[manifest.webmanifest](file:///c:/Users/ravan/Desktop/Portfolio_agv1/others/manifest.webmanifest)**: PWA configuration.
* **[robots.txt](file:///c:/Users/ravan/Desktop/Portfolio_agv1/others/robots.txt)**: Directives informing search spiders of indexing boundaries.
* **[sitemap.xml](file:///c:/Users/ravan/Desktop/Portfolio_agv1/others/sitemap.xml)**: XML Sitemap outlining routing hierarchy for crawlers.
* **[analytics.js](file:///c:/Users/ravan/Desktop/Portfolio_agv1/analytics/analytics.js)**: Located in `analytics/`, handles visitor metrics and event tracking asynchronously.

## Interactive Components and Logic

### Services Explorer Wheel

Located on the main page, this widget consists of a list of competencies rendered in a circular layout. 
* **Mechanics**: Users drag/swipe or click items to rotate the wheel.
* **Interaction**: Selecting a skill updates the copy in the adjacent speech bubble stack dynamically.
* **Math Logic**: The script calculates position angles (`sin`/`cos` calculations) and offsets each list item using CSS transform variables dynamically based on index and selection.

### Interactive Venn Diagram

The Venn diagram on the home page shows the overlap of User, Technology, and Business skills.
* **Logic**: Hovering or tapping a core circle (User, Technology, or Business) triggers a CSS animation, increasing its stroke thickness and opacifying its floating tags.
* **Tags**: The floats bob up and down asynchronously using varying keyframe delay multipliers.

### Project Filtering Mechanism

On the Projects page, a grid display is updated dynamically via tag controls.
* **Logic**: Buttons send category identifiers to a JS event listener.
* **Transitions**: Unmatched cards scale down and fade out (`opacity: 0`, `transform: scale(0.8)`) before being detached from the layout (`display: none`), providing a smooth filter transition.

### Swipeable Quote Carousel

Located in the about section, this component handles quote navigation.
* **Logic**: Monitors touch event coordinates (`touchstart`, `touchend`) to measure gesture sweeps.
* **Fallback**: Features indicators (dots) underneath the quotation block allowing quick manual navigation.

### Connect Pill Interactive Widget

 A contact pill containing four icons (LinkedIn, Email, GitHub, Phone).
* **Draggable Action**: Users can drag a selection ball to choose a medium.
* **Standard Click**: Reverts to standard link behaviors if dragging is unsupported or skipped.

## Firebase Analytics System

The website incorporates a custom analytics tracking system detailed in `analytics/analytics.js`. This module runs asynchronously to capture visitor statistics and client interaction metrics without hindering page load times.

### Dynamic SDK Importing

To optimize page loading, the script implements dynamic asynchronous loading of Firebase packages.
* **Implementation**: The module calls `import()` dynamically inside a function block to load the Firebase core app library and Realtime Database SDK from CDN URLs.
* **Result**: The page parses immediately without waiting for Firebase libraries to download. If CDN services are blocked, slow, or offline, the main site execution remains completely unaffected.

### Session-Based Tracking

Metrics are filtered to prevent redundant logs during active browser sessions.
* **Visitor Logging**: Tracks page visits under key categories (e.g. `home`, `projects`, `certificates`, etc.).
* **Unique Sessions**: Employs `sessionStorage` identifiers (e.g. `tracked_visit_[page]`) to ensure a visitor's access to the page is only incremented once per browser session.
* **Referral Aggregation**: Captures and parses `document.referrer` to identify and record where visitors arrived from (LinkedIn, GitHub, search engines, direct links, etc.) once per session.
* **Device Categorization**: Checks the user-agent string and viewport dimensions to classify browser access as `desktop` or `mobile`.

### Event Click Mapping

Crucial interaction points on pages are tracked to measure engagement.
* **Selector Parsing**: On initialization, the script scans the DOM for elements that include a `data-track` attribute.
* **Action Listeners**: Attaches event listeners that increment atomic database keys (under `analytics/clicks/...`) using Firebase transaction routines (`runTransaction`) when a tracked element is clicked.

### Silent Fallback Mechanism

Ensures system stability in various deployment contexts.
* **Error Handling**: All database updates are enclosed in validation catch blocks.
* **Dev Mode Filtering**: Detects local execution contexts (`localhost`, `127.0.0.1`) to filter dashboard counters and logs status indicators to the console in place of production database commits.
* **Silent Failure**: If the network is restricted or real-time connections fail, transactions discard silently without generating runtime exceptions.

## Performance Optimizations

### Link Prefetching

All HTML files utilize the `rel="prefetch"` link mechanism:
```html
<link rel="prefetch" href="projects.html">
<link rel="prefetch" href="certificates.html">
<link rel="prefetch" href="hackathons.html">
```
This tells the browser to download adjacent pages silently in the background while the user is reading the current page, making navigation instantaneous.

### Asset Preloading

Critical above-the-fold assets are preloaded to reduce Largest Contentful Paint (LCP):
```html
<link rel="preload" href="../assets/asset_bg_01.webp" as="image" type="image/webp">
```

### Image Optimization and Lazy Loading

* All project mockups and certificate thumbnails use the WebP image format, reducing file sizes by up to 75% compared to JPG/PNG.
* Images include `loading="lazy"` and `decoding="async"` attributes:
```html
<img src="../assets/safr-womens-safety-app.webp" alt="Description" loading="lazy" decoding="async">
```
This prevents off-screen images from blocking the document parse queue.

## SEO and Accessibility

### Structured JSON-LD Data

Structured markup is placed inside the head of index.html to populate Google's Rich Results and AI-based Search Generative Experience (SGE). The template structure is described below:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Viraj Ravani",
  "url": "https://www.virajravani.in",
  "jobTitle": "Product Designer & Software Engineer",
  "knowsAbout": ["Product Design", "Software Engineering", "Mobile App Development", "UI/UX", "Generative AI", "Database Engineering"],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Somaiya Vidyavihar University"
  },
  "award": [
    "Gold Medalist in Mobile Application Development at IndiaSkills State & Regionals",
    "IIT-A Hackathon Winner",
    "3x State Level Hackathons Winner"
  ]
}
```

### Meta Tags

* **Canonical Links**: Configured across all pages to declare the primary indexing URL and avoid duplicate content flags.
* **Open Graph and Twitter Cards**: Optimized with title, descriptions, and share graphics to ensure links shared on social networks present rich embeds.
* **Robot Instructions**: `robots.txt` and meta headers configured with `index, follow` instructions.

### Semantic Layout

* High hierarchy `<h1>` is limited to one per page.
* Text UIs inside complex elements use `aria-label` tags to maintain screen-reader compliance.

## Progressive Web App Integration

The site is configured as an installable Progressive Web App (PWA). It features:
* **Manifest Link**: Linked via `<link rel="manifest" href="../others/manifest.webmanifest">`.
* **Configuration Options**: Includes stand-alone portrait mode configuration, primary color themes, maskable design parameters, and icon resolution maps.

## Customization Guide

This template has been built with modularity in mind. You can easily adapt it for your own use by following these steps:

1. **Update Personal Information**:
   Open each of the HTML files in the `src/` directory and replace the name, headings, about content, and timelines with your own information.

2. **Replace Brand Assets**:
   Replace the images and PDF files inside `assets/` with your own assets. Make sure to keep the same filenames (e.g. `resume.pdf` or `logo.jpg`) or update their corresponding paths in the HTML files.

3. **Configure Redirection Links**:
   Update the redirect helper scripts (`github.html`, `linkedin.html`, etc.) in the `src/` directory to point to your respective social links.

4. **Analytics Database Configuration**:
   Open [analytics.js](file:///c:/Users/ravan/Desktop/Portfolio_agv1/analytics/analytics.js) and locate the `firebaseConfig` definition (around line 23). Update the `databaseURL` with your own Firebase Realtime Database (RTDB) instance URL:
   ```javascript
   const firebaseConfig = {
     databaseURL: "https://YOUR_DATABASE_NAME-default-rtdb.firebaseio.com/"
   };
   ```

## Local Development and Hosting

Since this project consists of static files (HTML, CSS, JS, WebP, and fonts), it does not require a runtime compiler or server-side engine.

To run the project locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/v3ravani/Portfolio_agv1.git
   ```

2. Open the directory:
   ```bash
   cd Portfolio_agv1
   ```

3. Launch a local development server (such as Python's SimpleHTTPServer, Live Server in VS Code, or http-server via Node):
   * Using Python 3:
     ```bash
     python -m http.server 8000
     ```
   * Using Node.js:
     ```bash
     npx http-server -p 8000
     ```

4. Navigate to `http://localhost:8000/src/index.html` in your web browser.

## Author Details

* **Name**: Viraj Ravani
* **Live Website**: https://www.virajravani.in/
* **GitHub**: https://github.com/v3ravani
* **LinkedIn**: https://www.linkedin.com/in/virajravani
* **Email**: viraj.ravani@somaiya.edu
