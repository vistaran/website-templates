# Universal Dynamic Lawn & Landscaping Website Template

A fully responsive, high-converting React 19 + Tailwind CSS website template designed for all lawn care, hardscaping, and landscaping businesses.

This template can be personalized dynamically on the fly by simply passing URL query parameters—making it ideal for instant client pitches, localized lead funnels, and multi-location agencies.

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚡ Dynamic Query Parameters

Simply append query parameters to the URL to customize the business name, phone number, location, and branding anywhere across the website:

### Example URLs:

```text
# Basic personalization (Name, Phone, City)
http://localhost:3000/?name=Green+Horizons+Lawn+Care&phone=(512)+555-8821&city=Austin

# Advanced personalization with state, neighboring market, and owner name
http://localhost:3000/?name=Lone+Star+Lawn+Masters&phone=(512)+555-8821&city=Austin&state=TX&secondaryCity=Round+Rock&owner=Dave

# Florida Landscaping Pitch
http://localhost:3000/?name=SunState+Landscape+%26+Sod&phone=(407)+555-3392&city=Orlando&state=FL&secondaryCity=Winter+Park&owner=Carlos
```

---

## 📋 Supported Query Parameters & Aliases

| Parameter | Aliases | Description | Example |
| :--- | :--- | :--- | :--- |
| **`name`** | `business`, `bname`, `company` | Full business name displayed across navbar, hero, modals, footer, and page title. | `Green+Thumb+Landscaping` |
| **`phone`** | `tel`, `call` | Formatted phone number displayed in buttons, contact links, and calendar invites. | `(704)+555-0199` |
| **`city`** | `town` | Primary city served. Used in headlines, service areas, reviews, and maps. | `Charlotte` |
| **`state`** | — | State abbreviation (defaults to NC if not passed). | `NC` or `TX` |
| **`secondaryCity`** | `city2`, `neighbor` | Adjacent city/town to broaden local reach in headlines and service badges. | `Matthews` |
| **`owner`** | `contact`, `person` | Owner / estimator name used in conversational callouts ("Call or text Mike at..."). | `Mike` |
| **`address`** | `street` | Physical street address. | `1200+Pine+St` |
| **`zip`** | `postal` | Postal ZIP code. | `28202` |
| **`county`** | `region` | County or region served. | `Mecklenburg+County` |
| **`email`** | — | Business contact email. | `contact@greenthumb.com` |
| **`years`** | `experience` | Years of business experience displayed on trust badges. | `15+` |
| **`rating`** | — | Star rating displayed on badges and review cards. | `5.0` |
| **`reviews`** | `reviewCount` | Number of verified customer reviews. | `54` |
| **`mapsUrl`** | `map`, `google` | Direct link to Google Maps profile or review link. | `https://maps.app.goo.gl/...` |
| **`tagline`** | — | Custom subheading or hero slogan override. | `Charlotte's+Premier+Outdoor+Craftsmen` |
| **`demo`** | `preview` | Set to `false` or `0` to hide the on-screen testing toolbar. | `false` |

---

## 🛠️ Auto-Computed Fields

When only basic parameters (`name`, `phone`, `city`) are passed, the template automatically computes:
- **Logo Initials:** Derived automatically from the first letters of the business name (e.g. `Green Thumb` → `GT`).
- **Raw Phone URI:** Strips formatting for one-click calling (`tel:+15125558821`).
- **Full Address & Interactive Map:** Google Maps iframe query automatically targets the passed city or address without requiring an API key.
- **Dynamic SEO Metadata:** `document.title`, `<meta name="description">`, and OpenGraph tags update on load to reflect the business and city.
- **Dynamic Reviews & Testimonials:** Customer review text dynamically reflects the business name and local city.
- **Calendar Dispatch:** Google Calendar & Apple/Outlook iCal invites format dynamically with the customized business name, contact person, and phone number.
- **Session Persistence:** Parameters are saved to `sessionStorage` so refreshing or navigating anchor tags retains the custom branding.

---

## 🧪 On-Screen Test Toolbar

A floating toolbar (`⚡ Test Query Params`) is included in the top-right corner. It allows:
1. One-click preset switching (Charlotte, Austin, Orlando).
2. Live tweaking of business details with immediate rendering.
3. One-click copying of the generated shareable URL to send to clients.
4. Suppressed automatically if `?demo=false` is appended.
