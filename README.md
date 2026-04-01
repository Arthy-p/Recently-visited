# Recently Viewed Products – CRO Assessment

## Overview

This solution implements a Recently Viewed Products feature injected into Amazon.in using JavaScript and CSS.

## Features

* Tracks user behavior on product pages
* Stores data using localStorage
* Displays recently viewed products on homepage
* Prevents duplicates and maintains recency order
* Responsive layout (5/3/2)
* Carousel with navigation arrows
* Injected into Amazon layout dynamically

## Technical Approach

* Used ASIN extraction for consistent product identification
* Used localStorage for persistence
* Implemented lightweight carousel using CSS scroll + JS controls
* Ensured responsive design using media queries
* Handled async DOM loading with retry-based injection

Potential Enhancement (Variant Tracking)
As an improvement, product variants such as color and size can be tracked as separate entries.

Suggested Approach:
Extract variant details from DOM (e.g., selected color or size)
Extend product ID using:
ASIN + Variant
Example:
Headset (Black) → B0FH73TTNN-Black
Headset (Blue) → B0FH73TTNN-Blue
Benefits:
More accurate representation of user behavior
Avoids overwriting different product variations
Improves personalization and recommendation quality

## Assumptions

* Amazon DOM structure remains mostly stable

## Limitations

* Carousel is custom-built (no external library)
* Some edge cases in Amazon DOM may vary
* Variant tracking is not implemented but proposed as an enhancement

## How to Run

1. Install "User JavaScript and CSS" Chrome extension
2. Add script.js and styles.css
3. Open Amazon.in and test

<img width="2750" height="730" alt="image" src="https://github.com/user-attachments/assets/fa9f0c6f-95d7-42a3-9e40-80192264139b" />
