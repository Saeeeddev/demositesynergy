# Translation Integration Guide

This guide explains how to integrate the i18next translations into your React components.

## Setup Completed

✅ All English translations have been extracted and placed in `/locales/en/`
✅ i18n.js configuration file has been created with namespace support
✅ LanguageSwitcher component has been created
✅ Basic Arabic and Persian translations for common elements have been added
✅ Stub files for all other translations have been created (empty JSON objects)

## Required Changes to Integrate Translations

### 1. Update main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // Add this line to initialize i18n

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 2. Update Header.jsx to include Language Switcher

Replace the "Get Started" button in the Header component with the LanguageSwitcher:

```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import '../../style/Header.css';

function Header({ useColoredLogo = false, isHomePage = false }) {
  const { t } = useTranslation('Header');
  // ... existing state and effects

  return (
    <>
      <header className={`header__container ${isScrolled ? 'header__container--scrolled' : ''}`}>
        <div className={`header__wrapper ${isScrolled ? 'header__wrapper--scrolled' : ''}`}>
          {/* Logo Placeholder */}
          <div className="header__logo-placeholder">
            <Link to="/" className="header__logo-image">
              {/* ... existing logo code */}
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="header__nav-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item"><Link to="/product">{t('menu.product')}</Link></li>
              <li className="header__nav-item"><Link to="/about">{t('menu.about')}</Link></li>
              <li className="header__nav-item"><Link to="/contact">{t('menu.contact')}</Link></li>
            </ul>
          </nav>

          {/* Actions Section - Replace Get Started button with Language Switcher */}
          <div className="header__actions">
            <LanguageSwitcher />
          </div>

          {/* ... rest of the component */}
        </div>
      </header>
      {/* ... mobile menu code with translations */}
    </>
  );
}
```

### 3. Example: How to use translations in any component

```jsx
import { useTranslation } from 'react-i18next';

function YourComponent() {
  // Use the namespace that contains your translations
  const { t } = useTranslation('Home'); // or 'About', 'Product', etc.
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta')}</button>
    </div>
  );
}
```

### 4. Common Patterns for Different Components

#### For Hero Section (Home.jsx):
```jsx
const { t } = useTranslation('Home');

// In JSX:
<h1>{t('hero.title')}</h1>
<p>{t('hero.subtitle')}</p>
<button>{t('hero.cta')}</button>
```

#### For Footer (Footer.jsx):
```jsx
const { t } = useTranslation('Footer');

// For section titles:
{t('sections.app.title')}
{t('sections.app.links.webApp')}

// For copyright:
{t('copyright')}
```

#### For About Page:
```jsx
const { t } = useTranslation('About');

// For hero section:
<p>{t('hero.badge')}</p>
<h1>{t('hero.title')}</h1>
<p>{t('hero.description')}</p>

// For team members:
<h3>{t('team.members.saeed.name')}</h3>
<p>{t('team.members.saeed.role')}</p>
```

### 5. Handling Multi-line Text

For text with line breaks (using \n in JSON), use:
```jsx
<h1 style={{ whiteSpace: 'pre-line' }}>{t('hero.title')}</h1>
// OR split and map:
{t('hero.title').split('\n').map((line, i) => (
  <React.Fragment key={i}>
    {line}
    {i < t('hero.title').split('\n').length - 1 && <br />}
  </React.Fragment>
))}
```

### 6. For Dynamic Content (like FAQ items in Support.jsx):

```jsx
const { t } = useTranslation('Support');

// For FAQ items:
<FaqItem question={t('faq.items.pricing.question')}>
  <p>{t('faq.items.pricing.answer')}</p>
</FaqItem>
```

### 7. Package Dependencies

Make sure these packages are installed:
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

## Translation Files Structure

- `/locales/en/` - Complete English translations
- `/locales/ar/` - Arabic translations (common.json has basic translations, others are stubs)
- `/locales/fa/` - Persian translations (common.json has basic translations, others are stubs)

Each language has these namespaces:
- common.json - Common buttons, navigation, etc.
- Header.json - Header component translations
- Footer.json - Footer component translations
- Home.json - Home page translations
- page/About.json - About page
- page/Product.json - Product page
- page/Contact.json - Contact page
- page/Pricing.json - Pricing page
- page/Support.json - Support page
- page/CaseStudies.json - Case Studies page
- page/legal/Privacy.json - Privacy policy
- page/legal/Security.json - Security page
- page/legal/TermsAndCondition.json - Terms & Conditions

## Next Steps

1. Complete the Arabic and Persian translations by filling in the stub JSON files
2. Add the `useTranslation` hook to each component and replace hard-coded text with `t()` calls
3. Test the language switcher functionality
4. Consider adding RTL support for Arabic and Persian in your CSS

## RTL Support

For Arabic and Persian, the LanguageSwitcher component already sets the document direction:
```javascript
document.documentElement.dir = 'rtl'; // or 'ltr'
```

You may need to add RTL-specific CSS:
```css
[dir="rtl"] .your-class {
  /* RTL specific styles */
}
```
