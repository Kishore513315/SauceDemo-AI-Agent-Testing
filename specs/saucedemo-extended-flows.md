# SauceDemo Extended Flows Test Plan

## Application Overview

Comprehensive test plan for SauceDemo e-commerce application focusing on product sorting, product details viewing, and cart badge count validation.

## Test Scenarios

### 1. Extended Flows Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Product Sorting Validation

**File:** `tests/sorting.spec.ts`

**Steps:**
  1. Select 'Name (A to Z)' from the sort dropdown
    - expect: Products are displayed in alphabetical order from A to Z
  2. Select 'Name (Z to A)' from the sort dropdown
    - expect: Products are displayed in alphabetical order from Z to A
  3. Select 'Price (low to high)' from the sort dropdown
    - expect: Products are displayed in ascending price order (low to high)
  4. Select 'Price (high to low)' from the sort dropdown
    - expect: Products are displayed in descending price order (high to low)

#### 1.2. Product Details Page Validation

**File:** `tests/product-details.spec.ts`

**Steps:**
  1. Click on the first product item in the inventory list
    - expect: Product details page is displayed with product name, description, price, and image
  2. Verify the URL contains the product ID
    - expect: Page URL changes to product details URL
  3. Check for 'Back to products' button
    - expect: Back to products button is present

#### 1.3. Cart Badge Count Validation

**File:** `tests/cart-badge.spec.ts`

**Steps:**
  1. Click 'Add to cart' button on the first product
    - expect: Cart badge shows '1'
  2. Click 'Add to cart' button on the second product
    - expect: Cart badge shows '2'
  3. Click 'Add to cart' button on the third product
    - expect: Cart badge shows '3'
  4. Click 'Remove' button on the first product
    - expect: Cart badge shows '2'

#### 1.4. Cart Badge Edge Cases

**File:** `tests/cart-badge-edge.spec.ts`

**Steps:**
  1. Ensure no items are in cart initially
    - expect: Cart badge is not visible
  2. Add one item to cart
    - expect: Cart badge shows '1' after adding
  3. Remove the item from cart
    - expect: Cart badge disappears
