---
name: Modern Luxury Residential
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#594046'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#8d7076'
  outline-variant: '#e1bec5'
  surface-tint: '#b90a5a'
  primary: '#b90a5a'
  on-primary: '#ffffff'
  primary-container: '#ff4d8d'
  on-primary-container: '#5b0028'
  inverse-primary: '#ffb1c4'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#6a5a64'
  on-tertiary: '#ffffff'
  tertiary-container: '#9e8c97'
  on-tertiary-container: '#33262f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#ffb1c4'
  on-primary-fixed: '#3f001a'
  on-primary-fixed-variant: '#8f0043'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#f2dde9'
  tertiary-fixed-dim: '#d5c1cc'
  on-tertiary-fixed: '#241820'
  on-tertiary-fixed-variant: '#51434c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
This design system embodies the intersection of safety, luxury, and modern hospitality. The brand personality is sophisticated yet welcoming, aiming to evoke a sense of "premium belonging" for residents. 

The aesthetic strategy blends **Minimalism** with **Glassmorphism**. We utilize expansive white space and a rigorous layout structure inspired by high-end editorial and technology platforms. This is layered with translucent materials and subtle background blurs to create depth and a sense of lightness. The emotional goal is to provide a serene, digital environment that reflects the physical quality of a premium living space.

## Colors
The palette is anchored by "Luxury Pink" and "Premium Purple," used strategically to highlight key actions and premium features. 

- **Primary & Secondary:** These are reserved for high-intent actions (Booking, Payments) and brand-heavy moments. The pink-to-purple gradient is the hallmark of the luxury tier.
- **Backgrounds:** We use a pure white (`#FFFFFF`) for primary surfaces and a soft slate (`#F8FAFC`) for secondary containers to provide a clean, "Apple-level" canvas.
- **Accents:** The light pink (`#FDE7F3`) is used for subtle backgrounds on chips, badges, or selected states to maintain a soft, feminine, yet professional touch.

## Typography
The system relies on **Inter** to achieve a systematic, neutral, and highly legible interface akin to leading fintech and travel platforms. 

- **Display & Headlines:** Use tight letter-spacing and bold weights to create a sense of authority and modernity. Large display type is used for room pricing and welcome headings.
- **Body Text:** Optimized for readability with generous line heights (1.5–1.6). 
- **Labels:** Used for metadata (e.g., room amenities, availability status). Small labels use a slightly heavier weight and subtle tracking to remain legible at small sizes.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy with fixed maximum widths to maintain readability on ultra-wide displays.

- **Grid:** A 12-column grid is used for desktop, collapsing to 4 columns on mobile. 
- **Airbnb-Inspired Content:** Layouts for room listings and galleries use a "masonry-lite" approach, where images take precedence and are separated by generous 24px gutters.
- **Vertical Rhythm:** We use a base-8 spacing scale. Large sections are separated by `stack-xl` (64px) to ensure the design feels breathable and premium, never cramped.

## Elevation & Depth
Depth is created through a combination of **Ambient Shadows** and **Glassmorphism**.

1.  **Level 0 (Base):** Primary page background (`#FFFFFF`).
2.  **Level 1 (Cards):** Low-contrast surfaces with a very soft, diffused shadow: `box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05)`.
3.  **Level 2 (Modals/Overlays):** Glassmorphic surfaces. Use a background of `rgba(255, 255, 255, 0.7)` with a `backdrop-filter: blur(12px)`. This is essential for navigation bars and sticky headers.
4.  **Floating Elements:** Elements like "Book Now" floating buttons use a more pronounced shadow with a hint of the secondary color: `box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15)`.

## Shapes
This design system utilizes a high degree of roundedness to feel approachable and modern. 

- **Containers:** Room cards, modals, and main content blocks use `rounded-3xl` (1.5rem to 2rem) to create a soft, high-end furniture-like aesthetic.
- **Interactive Elements:** Buttons and input fields follow suit with `rounded-2xl` or pill shapes, ensuring consistency across the interface.
- **Visual Harmony:** Circular imagery is used for profile avatars, while room photos maintain the `rounded-3xl` corners to match the UI containers.

## Components

### Buttons
- **Primary:** Features the pink-to-purple gradient with white text. High-end hover state involves a subtle scale-up (1.02x) and an increased shadow spread.
- **Secondary:** White background with a thin 1px border of `#FDE7F3`. Text uses the primary pink color.
- **Glass Action:** Translucent background with blur, used for buttons sitting directly on top of imagery.

### Cards (The "Room" Card)
The central component of the system. It must feature:
- Top-aligned image with `rounded-3xl` corners.
- Padding: 20px all around the text content.
- Typography: Headline-md for price, Body-md for room type, and a row of icons (chips) for amenities.
- Transition: On hover, the image should subtly zoom while the container lifts via an increased shadow.

### Inputs & Fields
- Background: `#F8FAFC`.
- Border: 1px solid transparent, turning into 1px solid `#8B5CF6` on focus.
- Height: 56px for a premium, accessible touch target.

### Chips & Badges
Small, highly rounded (`rounded-full`) indicators. Use the Accent color (`#FDE7F3`) for "Available" statuses and a soft grey for "Filled."

### Navigation Bar
Sticky at the top, utilizing the Glassmorphism blur effect (`blur(16px)`). This ensures the content remains visible as the user scrolls, creating a sophisticated layered effect.