# TRAVLS.io Hotel Booking UI --- Design Continuity & Tab System

## Visual Source of Truth · v1.0

This document defines the visual and interaction continuity for the
TRAVLS.io hotel-booking property flow. The supplied TRAVLS flight
booking UI, hotel homepage, hotel search-results UI, and hotel
property/room-selection UI are the visual references.

**Core rule:** preserve the existing UI exactly. New tab screens must
change only the active tab state and the content below the tab
navigation. The hotel header/property summary and the right-side
**Booking Summary** remain structurally consistent.

------------------------------------------------------------------------

## 1. Product Design Direction

TRAVLS.io should feel:

-   Premium
-   Calm
-   Trustworthy
-   Spacious
-   Modern
-   Travel-focused
-   Minimal without feeling empty
-   Sophisticated without looking overly luxurious
-   Friendly without becoming playful or childish

The hotel flow must feel like the same TRAVLS product as the flight
flow.

### Non-negotiable continuity

Do not introduce a new visual language for any hotel tab.

Preserve:

-   Same header
-   Same search-summary bar
-   Same breadcrumb treatment
-   Same property hero
-   Same image-gallery treatment
-   Same typography
-   Same yellow accent
-   Same card language
-   Same icon family
-   Same border radius
-   Same spacing rhythm
-   Same booking-summary sidebar
-   Same trust language
-   Same footer

Only the tab content changes.

------------------------------------------------------------------------

# 2. Reference Screen Structure

The hotel property page follows this fixed structure:

``` text
Header
↓
Hotel Search Summary
↓
Breadcrumb
↓
Hotel Property Hero
↓
Property Tabs
↓
┌───────────────────────────────┬─────────────────────┐
│ ACTIVE TAB CONTENT            │ Booking Summary     │
│                               │                     │
│ Changes per tab               │ FIXED / STICKY      │
│                               │                     │
└───────────────────────────────┴─────────────────────┘
↓
TRAVLS Member Banner
↓
Trust Strip
↓
Footer
```

The right-side Booking Summary is a persistent component.

------------------------------------------------------------------------

# 3. Hotel Property Tabs

The property navigation contains exactly six tabs:

1.  Overview
2.  Rooms & Rates
3.  Amenities
4.  Reviews (1,243)
5.  Location
6.  Policies

### Active state

The active tab uses:

-   Dark text
-   TRAVLS yellow icon/accent
-   Yellow underline
-   No dark filled background
-   Same tab height and spacing regardless of tab

### Inactive state

-   Dark/secondary gray text
-   Neutral outline icon
-   No underline

Never resize the tab bar depending on the active tab.

------------------------------------------------------------------------

# 4. Fixed Property Header

Everything above the tabs remains unchanged when switching tabs.

## Search Summary

``` text
WHERE
Bengaluru (BLR)
All areas

CHECK-IN
21 Jun, 2024
Fri, 2:00 PM

CHECK-OUT
24 Jun, 2024
Mon, 11:00 AM

GUESTS & ROOMS
2 Guests, 1 Room

[ Edit Search ]
```

White rounded card with subtle border.

## Breadcrumb

``` text
Home > Hotels > India > Karnataka > Bengaluru > The Leela Bhartiya City
```

Small muted typography.

## Property Hero

Left: - Large hotel gallery - Best Seller badge - Heart/favorite
control - Gallery arrows - Thumbnail strip - Photo count

Middle: - The Leela Bhartiya City - Verified badge - 4.8 rating -
Excellent - 1,243 reviews - Location - Distance - Amenity pills - Free
cancellation - Property description - View More

Right: - 15% OFF - Original price - Current price - Taxes & fees -
TRAVLS rating 9.2/10 - Select Room CTA

This entire hero must remain visually identical across tabs.

------------------------------------------------------------------------

# 5. Persistent Booking Summary

## Position

Desktop:

``` text
Main Content                       Booking Summary
68–72%                             28–32%
```

The Booking Summary is sticky while the user scrolls through tab
content.

It does NOT disappear when switching tabs.

It does NOT move to another side.

It does NOT change card styling.

## Content

``` text
Booking Summary

[Hotel thumbnail]
The Leela Bhartiya City
Bengaluru, Karnataka

Check-in
Fri, 21 Jun, 2:00 PM

Check-out
Mon, 24 Jun, 11:00 AM

Guests & Rooms
2 Guests, 1 Room

3 Nights

Room
Premier Room
₹6,470 × 3

Taxes & Fees
₹3,540

Discount
-₹2,330

Total Amount
₹20,620

You will pay in INR
Inclusive of all taxes and fees

Great Choice! 🎉
You're saving ₹2,330 on this booking.

Free cancellation
Until 20 Jun, 2:00 PM

Instant confirmation
Your booking is confirmed instantly

[ Continue to Guest Details ]
```

### Critical rule

When changing tabs:

-   Booking Summary remains fixed
-   Same position
-   Same width
-   Same typography
-   Same pricing
-   Same CTA
-   Same card
-   Same visual hierarchy

Only update it if the user actually selects a different room/rate.

------------------------------------------------------------------------

# 6. Color Tokens

``` css
--brand-primary: #FFB91F;
--brand-hover: #F4AA00;
--brand-soft: #FFF7E3;

--text-primary: #111827;
--text-secondary: #596273;
--text-muted: #8B94A5;
--text-disabled: #B5BBC5;

--surface-page: #F8F9FB;
--surface-card: #FFFFFF;
--surface-subtle: #F5F6F8;

--border-default: #E5E8ED;
--border-strong: #D7DBE2;

--success: #22C55E;
--success-soft: #ECFDF3;
--warning: #F59E0B;
--warning-soft: #FFF7E6;
--error: #EF4444;
--error-soft: #FFF1F2;
--info: #3B82F6;
--info-soft: #EFF6FF;
```

Yellow is the primary TRAVLS action color.

Do not overuse it.

------------------------------------------------------------------------

# 7. Typography

Primary:

**Outfit**

Supporting / brand:

**Montserrat**

``` text
Major heading     32–40px / 700
Section heading   22–28px / 700
Card heading      16–18px / 600–700
Body              14–16px / 400
Supporting        12–14px / 400
Metadata          11–12px / 500
Button            14–15px / 600
```

Avoid oversized display typography.

------------------------------------------------------------------------

# 8. Spacing

Use the 8px rhythm:

``` text
4
8
12
16
20
24
32
40
48
64
```

Maintain generous whitespace.

Never compress a tab screen simply because its content is shorter.

------------------------------------------------------------------------

# 9. Radius & Shadows

``` text
Small control:    8px
Input/button:     10–12px
Card:             12–16px
Feature card:     16–20px
Pill:             999px
Avatar:           50%
```

Standard shadow:

``` css
0 2px 12px rgba(17,24,39,.04)
```

Elevated:

``` css
0 8px 28px rgba(17,24,39,.07)
```

No heavy black shadows.

------------------------------------------------------------------------

# 10. Iconography

Use one consistent outline icon family.

Characteristics:

-   Rounded geometry
-   1.5--2px stroke
-   20--22px standard size
-   16px compact size
-   Simple silhouettes

Icons should never become decorative clutter.

------------------------------------------------------------------------

# 11. TAB 01 --- OVERVIEW

Overview is the property-information landing tab.

### Content structure

``` text
About this property

Property description

Check-in        Check-out
Children & Beds Pets
Parties

Property highlights

[icon] Outdoor Swimming Pool
[icon] World-class Spa
[icon] 3 Restaurants & 2 Bars
[icon] Fitness Center
[icon] Business Center
[icon] EV Charging Station

Popular amenities

✓ Free Wi-Fi
✓ Breakfast included
✓ Pool
✓ Spa
✓ Fitness center
✓ Restaurant
✓ Room service
✓ 24-hour front desk
✓ Airport shuttle
✓ Laundry service
✓ Free parking
✓ Non-smoking rooms

The fine print

• Cancellation and prepayment policies...
• Guests are required to show photo ID...
• Please inform the property...
• Special requests are subject to availability...
```

### Design

Use clean information blocks, not promotional cards.

Keep the content spacious.

------------------------------------------------------------------------

# 12. TAB 02 --- ROOMS & RATES

This is the primary booking tab.

### Heading

``` text
Choose Your Room
Prices are for 3 nights (21 Jun – 24 Jun)
```

### Room Card

Each card contains:

-   Room image
-   Room name
-   Size
-   View
-   Bed
-   Guest occupancy
-   Included benefits
-   Cancellation
-   Room Details
-   Original price
-   Discount
-   Current price
-   Taxes & fees
-   Select button

Rooms:

1.  Deluxe Room --- ₹5,220
2.  Premier Room --- ₹6,470 --- Recommended
3.  Executive Suite --- ₹8,330
4.  Presidential Suite --- ₹12,950

### Selected state

The selected room receives a subtle yellow border/accent.

The Booking Summary updates only when a room is selected.

------------------------------------------------------------------------

# 13. TAB 03 --- AMENITIES

The Amenities tab must preserve the same left-content/right-summary
structure.

### Heading

``` text
Hotel Amenities
Everything you need for a comfortable stay.
```

Organize amenities into clean categories.

Suggested groups:

### Popular

-   Free Wi-Fi
-   Breakfast included
-   Swimming pool
-   Spa
-   Fitness center
-   Restaurant
-   Room service

### Room

-   Air conditioning
-   City view
-   King bed
-   Room service
-   Housekeeping

### Property

-   24-hour front desk
-   Business center
-   EV charging
-   Parking
-   Concierge

### Accessibility

Use accessible facilities and services where supported by the property
data.

### Rules

Do not turn amenities into oversized colorful cards.

Use compact rows / icon lists.

------------------------------------------------------------------------

# 14. TAB 04 --- REVIEWS

### Heading

``` text
Guest Reviews
4.8
Excellent
1,243 reviews
```

Create a clean review summary.

### Rating breakdown

``` text
Cleanliness       4.8
Comfort           4.7
Location          4.8
Facilities        4.7
Service           4.9
Value             4.6
```

Use thin rating bars.

### Review cards

Each review:

``` text
Avatar
Guest name
Verified stay
Rating
Date

Review title

Review text

[Helpful]
```

Use white cards with subtle borders.

Do not introduce social-media-style UI.

### Sorting

``` text
Sort: Most Relevant
```

Small secondary control.

------------------------------------------------------------------------

# 15. TAB 05 --- LOCATION

### Heading

``` text
Location
Bengaluru, Karnataka
```

### Main layout

Left/content:

-   Map
-   Property location marker
-   Address
-   Distance from city center

Right or below:

``` text
What's nearby

2.3 km   City Center
...
```

Possible categories:

### Attractions

-   Nearby landmarks
-   Shopping
-   Restaurants
-   Entertainment

### Transport

-   Airport
-   Metro
-   Railway station
-   Taxi

### Location information

Use simple list rows.

### Map styling

The map must remain visually quiet.

It should not dominate the entire page.

Use TRAVLS yellow for the main property marker.

------------------------------------------------------------------------

# 16. TAB 06 --- POLICIES

### Heading

``` text
Hotel Policies
Everything you need to know before your stay.
```

Use structured accordion/list sections.

Categories:

### Check-in & Check-out

Check-in: From 2:00 PM

Check-out: Until 11:00 AM

### Cancellation

Free cancellation until the stated deadline.

### Children & Beds

Children welcome.

### Pets

Not allowed.

### Parties

Not allowed.

### Payment

Show supported payment information where available.

### Important information

Use a restrained yellow/soft-warning callout when necessary.

Avoid turning policy content into large cards.

------------------------------------------------------------------------

# 17. Persistent Member Banner

After the main tab content:

``` text
TRAVLS Members get extra 10% off on this booking!

[ Login / Sign up to save ]
```

Use soft yellow background.

Keep height compact.

------------------------------------------------------------------------

# 18. Persistent Trust Strip

Always preserve:

``` text
Price Guarantee
Find a lower price? We'll match it.

Secure Booking
Your booking is safe with us.

No Hidden Charges
What you see is what you pay.

24/7 Concierge
We're here whenever you need us.
```

Four equal columns.

Same iconography and spacing across every tab.

------------------------------------------------------------------------

# 19. Persistent Footer

Footer remains identical.

Columns:

### TRAVLS.io

Short brand description.

### Explore

Flights Hotels Trains Stays eSIM Global

### Company

About Us Careers Sustainability

### Support

Help Center Wallet Connection Refund Policy Contact Us

------------------------------------------------------------------------

# 20. Switching Logic

When a tab is clicked:

``` text
Overview
Rooms & Rates
Amenities
Reviews
Location
Policies
```

ONLY these should change:

-   Active tab underline
-   Active tab icon state
-   Main content below the tabs

Everything else remains stable.

### Must NOT change

-   Header
-   Search bar
-   Breadcrumb
-   Hotel hero
-   Gallery
-   Property title
-   Hotel rating
-   Price panel
-   Property tabs position
-   Booking Summary
-   Member banner
-   Trust strip
-   Footer

This is the central continuity rule.

------------------------------------------------------------------------

# 21. Scroll Behavior

Desktop:

``` text
Header
Search Summary
Property Hero
Tabs
─────────────────────────────
Main tab content       Sticky Booking Summary
Main tab content       Sticky Booking Summary
Main tab content       Sticky Booking Summary
─────────────────────────────
Member Banner
Trust Strip
Footer
```

The Booking Summary should remain visible while the user explores long
tabs.

On shorter tabs, do not stretch the content unnaturally just to match
the sidebar height.

------------------------------------------------------------------------

# 22. Responsive Rules

Desktop:

-   Two-column content
-   Sticky Booking Summary

Tablet:

-   Reduce content gap
-   Maintain readable two-column layout where possible

Mobile:

-   Single-column content
-   Booking Summary moves below main content or becomes a sticky bottom
    CTA
-   Tabs become horizontally scrollable
-   Never simply shrink desktop UI
-   Preserve touch targets around 44px+

------------------------------------------------------------------------

# 23. Interaction Rules

### Tab switching

Fast and subtle.

Recommended transition: 150--200ms ease-out.

Do not use dramatic page animations.

### Gallery

-   Thumbnail changes main image
-   Previous/next works
-   Favorite toggles

### Room selection

-   Selected state changes
-   Booking Summary updates
-   CTA remains visible

### Accordions

Use subtle expand/collapse.

### Map

Interactive where supported.

------------------------------------------------------------------------

# 24. Visual Anti-Patterns

Never introduce:

-   Dark mode
-   Glassmorphism
-   Neon
-   Heavy gradients
-   Excessive yellow
-   Huge typography
-   Excessive badges
-   Cartoon illustrations
-   Mixed icon styles
-   Heavy shadows
-   Dense information walls
-   Random card shapes
-   Random border radii
-   Different button treatments
-   Generic Booking.com/Airbnb cloning

------------------------------------------------------------------------

# 25. Figma / HTML Component Mapping

Every meaningful UI block should be independently editable.

Recommended component tree:

``` text
HotelPropertyPage
├── Header
├── HotelSearchSummary
├── Breadcrumb
├── HotelHero
│   ├── HotelGallery
│   ├── HotelInformation
│   └── HotelPricePanel
├── PropertyTabs
├── ContentArea
│   ├── OverviewTab
│   ├── RoomsRatesTab
│   ├── AmenitiesTab
│   ├── ReviewsTab
│   ├── LocationTab
│   └── PoliciesTab
├── BookingSummary
├── MemberBanner
├── TrustStrip
└── Footer
```

The six tab components should share the same parent layout.

------------------------------------------------------------------------

# 26. Image Creation Rules

When generating each tab as a visual reference:

1.  Start from the exact Rooms & Rates reference.
2.  Preserve the complete upper half of the page.
3.  Preserve the exact Booking Summary.
4.  Preserve the same viewport.
5.  Preserve the same margins.
6.  Preserve the same tab bar.
7.  Change ONLY the active tab and content below it.
8.  Do not redesign existing components.
9.  Do not change colors.
10. Do not change typography.
11. Do not change the hotel.
12. Do not change booking values unless required by the tab.
13. Do not change the footer/trust/member areas.
14. Keep all screens visually comparable as a single product.

Each generated screen must be able to sit beside the others in a
prototype and look like one continuous product.

------------------------------------------------------------------------

# 27. Six-Screen Production Order

Create the screens in this exact order:

### Screen 01

**Overview --- active**

### Screen 02

**Rooms & Rates --- active**

### Screen 03

**Amenities --- active**

### Screen 04

**Reviews --- active**

### Screen 05

**Location --- active**

### Screen 06

**Policies --- active**

Do not generate all six at once.

Generate and validate one screen at a time.

------------------------------------------------------------------------

# 28. Final Consistency Test

Before approving a new tab screen, compare it against the Rooms & Rates
reference.

Ask:

``` text
Did the header move?
Did the search summary change?
Did the hero change?
Did the hotel image change?
Did the hotel title change?
Did the price panel change?
Did the tabs move?
Did the Booking Summary move?
Did the Booking Summary width change?
Did the CTA change?
Did the member banner change?
Did the trust strip change?
Did the footer change?
Did the typography change?
Did the spacing change?
Did the visual language change?
```

If the answer is YES to anything other than:

-   active tab
-   tab content
-   legitimately content-dependent information

then correct it.

------------------------------------------------------------------------

# 29. Master Principle

> **The user should feel that they are switching views inside one hotel
> page, not navigating between six different designs.**

Consistency is more important than novelty.

The six tabs are six content states of ONE interface.

The Booking Summary is a persistent anchor.

The property hero is a persistent anchor.

The TRAVLS visual language is persistent everywhere.

Only the information changes.
