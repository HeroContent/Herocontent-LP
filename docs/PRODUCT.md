# Product Documentation

## Overview

HeroContent is a social media management service specifically designed for restaurants, cafes, pubs, and food delivery businesses in the Czech Republic. The landing page serves as the primary marketing and lead generation tool.

## Target Audience

- **Primary:** Restaurant owners and managers
- **Secondary:** Cafe, pub, bar, and food delivery business owners
- **Location:** Czech Republic and Slovakia
- **Language:** Czech

## Pages & Features

### Main Page (`/`)

**Purpose:** Comprehensive landing page showcasing all services, features, and pricing.

**Key Sections:**

1. **Hero Section**
   - Headline with typewriter effect
   - Value proposition
   - Primary CTA: "Vyzkoušet zdarma" (Try for free)
   - WhatsApp contact link

2. **Services Section** (`#funkce`)
   - Feature cards with icons
   - Visual mockups (Instagram posts, stories, reels)
   - Benefits list

3. **Content Calendar Section**
   - Monthly content delivery
   - Calendar visualization
   - Planning benefits

4. **Client Showcase** (`#klienti`)
   - Tabbed interface by business type:
     - Restaurace (Restaurants)
     - Kavárny (Cafes)
     - Hospody (Pubs)
     - Bary (Bars)
     - Hotely (Hotels)
     - Rozvoz (Delivery)
   - Image galleries for each category

5. **Pricing Section** (`#cenik`)
   - Three pricing tiers
   - Feature comparison
   - CTA buttons

6. **About Section** (`#o-nas`)
   - Company information
   - Mission statement

7. **Contact Form**
   - Modal dialog
   - Fields: Business name, phone, email, business type
   - Telegram notification integration

**Navigation:**
- Logo → Links to `/landing`
- Menu items → Anchor links to sections
- WhatsApp button → External link
- Login link → `/login` (if applicable)

---

### Landing Page (`/landing`)

**Purpose:** Simplified, conversion-focused landing page for lead generation.

**Key Differences from Main Page:**

1. **No Login/WhatsApp Links**
   - Removed from header and footer
   - Focus on lead generation only

2. **Free Content Block**
   - Prominent placement below headline
   - "12 příspěvků zdarma pro vaše sítě" (12 free posts)
   - Visual showcase with combined story/grid image
   - CTA: "Získat zdarma" (Get for free)

3. **All CTAs Lead to Contact Form**
   - All "Vyzkoušet zdarma" buttons open contact dialog
   - Consistent conversion funnel

4. **Simplified Navigation**
   - Same sections as main page
   - Logo → Links to `/` (main page)

**Layout:**
- **Desktop:** Headline left, free content block right
- **Mobile:** Headline first, then free content block

---

### Registration Page (`/registration`)

**Purpose:** Free trial registration form for qualified leads.

**Features:**

1. **Two-Column Layout**
   - Left: Benefits and information
   - Right: Registration form

2. **Form Fields:**
   - Restaurant name (required)
   - Phone number (required, validated format)
   - Website link (optional)
   - Facebook link (optional)
   - Instagram link (optional)
   - At least one link required (web, Facebook, or Instagram)

3. **Phone Validation:**
   - Must start with `+420` (Czech) or `+421` (Slovak)
   - Must have 9 digits after country code
   - Validates against fake/test numbers

4. **Submission:**
   - Redirects to user app with parameters
   - Tracks registration completion event

**User Flow:**
1. User fills form
2. Validation runs
3. On success → Redirect to user app
4. User app receives: phone, restaurantName, registered=true

---

### Additional Pages

#### Blog (`/blog`)
- Blog post listing
- Individual posts at `/blog/[slug]`

#### Career (`/kariera`)
- Job listings and career information

#### About Company (`/o-spolecnosti`)
- Company information and history

#### App Screenshots (`/appscreenshots`)
- Screenshots of the mobile/web app
- WhatsApp mockups (scrollbars removed)

---

## User Flows

### Lead Generation Flow

**Main Page → Contact Form:**
1. User visits main page
2. Clicks "Vyzkoušet zdarma" or contact CTA
3. Contact dialog opens (tracked: `lead_form_open`)
4. User fills form:
   - Business name
   - Phone
   - Email
   - Business type
5. Form submits to `/api/contact`
6. Success message shown
7. Event tracked: `lead_form_submit`
8. Telegram notification sent
9. Dialog closes after 2 seconds

**Landing Page → Contact Form:**
- Same flow as main page
- All CTAs lead to contact form

### Registration Flow

**Any Page → Registration:**
1. User clicks registration link
2. Navigates to `/registration`
3. Event tracked: `registration_form_open`
4. User fills registration form
5. Phone number validated
6. At least one link required
7. Form submits
8. Event tracked: `registration_complete`
9. Redirect to user app

### Navigation Flow

**Between Pages:**
- Logo on main page → `/landing`
- Logo on landing page → `/`
- Menu items → Anchor links (same page)
- External links → WhatsApp, login, etc.

---

## Forms

### Contact Form

**Location:** Modal dialog on main and landing pages

**Fields:**
- **Business Name** (`businessName`) - Required, text input
- **Phone** (`phone`) - Required, tel input, format: +420 XXX XXX XXX
- **Email** (`email`) - Required, email input
- **Business Type** (`businessType`) - Required, dropdown:
  - Restaurace
  - Kavárna
  - Pub, bar
  - Rozvoz
  - Jiné

**Validation:**
- Client-side: All fields required
- Server-side: Validates all fields

**Submission:**
- POST to `/api/contact`
- Sends Telegram notification
- Returns success/error response

**Success Behavior:**
- Shows success message
- Tracks `lead_form_submit` event
- Closes dialog after 2 seconds
- Resets form

### Registration Form

**Location:** `/registration` page

**Fields:**
- **Restaurant Name** (`restaurantName`) - Required
- **Phone** (`phone`) - Required, validated format
- **Website** (`website`) - Optional URL
- **Facebook** (`facebook`) - Optional URL
- **Instagram** (`instagram`) - Optional URL

**Validation:**
- Restaurant name required
- Phone: Must be +420 or +421 with 9 digits
- At least one link required (website, Facebook, or Instagram)
- Phone format validation (rejects fake numbers)

**Submission:**
- Client-side validation
- On success: Redirects to user app
- Tracks `registration_complete` event

---

## Business Logic

### Pricing Tiers

1. **Basic Plan**
   - Price: Displayed dynamically
   - Features: Basic social media management

2. **Standard Plan**
   - Price: Displayed dynamically
   - Features: Enhanced features

3. **Premium Plan**
   - Price: Displayed dynamically
   - Features: Full service package

### Business Types

Supported business categories:
- **Restaurace** - Full-service restaurants
- **Kavárna** - Cafes and coffee shops
- **Pub, bar** - Pubs and bars
- **Rozvoz** - Food delivery services
- **Jiné** - Other food businesses

### Content Delivery

- **Monthly Content Package** - All content delivered once per month
- **Content Types:**
  - Instagram posts
  - Instagram stories
  - Instagram reels
  - Facebook posts
  - Text content
  - Visual content

### Client Showcase

- **Purpose:** Demonstrate work quality
- **Organization:** By business type
- **Display:** Image galleries (carousel on mobile, grid on desktop)
- **Categories:** 6 business types with multiple image sets

---

## Conversion Points

### Primary CTAs

1. **"Vyzkoušet zdarma"** (Try for free)
   - Opens contact form
   - Main conversion point

2. **"Získat zdarma"** (Get for free)
   - Opens contact form
   - Used in free content block

3. **"Mám zájem"** (I'm interested)
   - Opens contact form
   - Used in pricing section

### Secondary Actions

- **WhatsApp Contact** - Direct messaging (main page only)
- **Registration Link** - Free trial signup
- **Section Navigation** - Anchor links to learn more

---

## Content Strategy

### Messaging

- **Value Proposition:** Professional social media management for restaurants
- **Key Benefits:**
  - Monthly content delivery
  - Professional quality
  - Time-saving
  - Industry expertise

### Visual Content

- **Client Showcase:** Real examples of work
- **Mockups:** Instagram post/story/reel examples
- **Logos:** Partner/client logos
- **Screenshots:** App interface screenshots

### SEO Content

- **Keywords:** Instagram, Facebook, sociální sítě, restaurace, reklama
- **Meta Descriptions:** Service-focused descriptions
- **Structured Data:** Organization, service, contact information

---

## Analytics & Tracking

See [Google Analytics Documentation](./GOOGLE_ANALYTICS.md) for detailed tracking information.

### Tracked Events

1. **lead_form_open** - Contact form opened
2. **lead_form_submit** - Contact form submitted
3. **registration_form_open** - Registration page viewed
4. **registration_complete** - Registration completed
5. **Page views** - Automatic SPA navigation tracking

### Conversion Goals

Recommended conversions to mark in GA4:
- `lead_form_submit` - Contact form submissions
- `registration_complete` - Completed registrations

---

## User Experience

### Responsive Design

- **Mobile-first** approach
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Accessibility

- **Semantic HTML** - Proper heading structure
- **ARIA labels** - Screen reader support
- **Keyboard navigation** - Full keyboard support
- **Color contrast** - WCAG compliant

### Performance

- **Lazy loading** - Images load on demand
- **Code splitting** - Route-based splitting
- **Optimized assets** - Compressed images and fonts

---

## Integration Points

### External Services

1. **Google Analytics 4**
   - Event tracking
   - Page view tracking
   - Conversion tracking

2. **Telegram**
   - Contact form notifications
   - Real-time alerts

3. **User App**
   - Registration redirect
   - Parameter passing

### API Endpoints

- **POST `/api/contact`** - Contact form submission
- **Telegram API** - Notification sending

---

## Future Enhancements

### Potential Features

- [ ] Multi-language support (Slovak)
- [ ] Blog content management
- [ ] Customer portal integration
- [ ] Live chat support
- [ ] A/B testing for CTAs
- [ ] Advanced analytics dashboard

### Optimization Opportunities

- [ ] Form abandonment tracking
- [ ] Exit intent popups
- [ ] Social proof elements
- [ ] Testimonials section
- [ ] Case studies
- [ ] Video content

---

## Support & Maintenance

### Content Updates

- **Client Showcase:** Add new client examples
- **Pricing:** Update pricing tiers
- **Blog:** Regular content updates
- **Images:** Refresh visual content

### Monitoring

- **Form Submissions:** Check Telegram notifications
- **Analytics:** Monitor conversion rates
- **Performance:** Track page load times
- **Errors:** Monitor for JavaScript errors

---

## Glossary

- **HeroContent** - Service/product name
- **Vyzkoušet zdarma** - Try for free
- **Získat zdarma** - Get for free
- **Restaurace** - Restaurant
- **Kavárna** - Cafe
- **Rozvoz** - Delivery
- **Sociální sítě** - Social networks
- **Příspěvky** - Posts
