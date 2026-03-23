

---

# PRD 4 — E-Commerce Product Explorer & Cart Management App (React Project)

## 1. Product Title

**E-Commerce Product Explorer & Cart Management App**

---

# 2. Problem Statement

Modern online shopping platforms allow users to browse thousands of products quickly through features such as:

* product search
* category filters
* price sorting
* product details pages
* wishlists
* shopping carts

However, building such an experience requires strong **state management, routing, and UI architecture**.

The goal of this project is to build a **complete e-commerce product browsing application** using React that allows users to:

* explore products
* search for products
* filter by categories and price
* sort product listings
* view product details
* add products to a cart
* manage cart items
* view checkout summary

The application should simulate the **core frontend experience of an online store**.

---

# 3. Product Goals

### Primary Goals

The system should allow users to:

1. Browse products
2. Search for products
3. Filter and sort listings
4. View product details
5. Add items to cart
6. Manage cart items

---

### Secondary Goals

* Demonstrate advanced React state management
* Implement a scalable component architecture
* Simulate a real e-commerce frontend

---

# 4. Target Users

### Primary Users

* Online shoppers
* Users browsing products across categories

### User Pain Points

Users want to:

* quickly find products
* compare prices
* organize purchases
* manage cart items easily

---

# 5. Core Functional Requirements

---

# Feature 1 — Product Listing

The system should display a list of products.

Each product card should show:

* Product image
* Product title
* Price
* Rating
* Category
* Add to cart button

---

### Product Grid

Products should be displayed in a responsive grid layout.

Example

```
3 columns desktop
2 columns tablet
1 column mobile
```

---

# Feature 2 — Product Details Page

Clicking a product should open a product details page.

Details page should include:

* Product image gallery
* Description
* Price
* Category
* Rating
* Add to cart
* Add to wishlist

---

# Feature 3 — Product Search

Users should be able to search products by name.

Example search queries:

```
laptop
smartphone
headphones
```

Search should update results dynamically.

Use **debounce search** for better performance.

---

# Feature 4 — Category Filters

Users should be able to filter products by category.

Example categories:

```
electronics
clothing
jewelery
home
```

Filters should be selectable from sidebar or dropdown.

---

# Feature 5 — Price Filters

Users should be able to filter products by price range.

Example

```
0-100
100-500
500-1000
1000+
```

---

# Feature 6 — Sorting

Sorting options should include:

* price low → high
* price high → low
* rating
* newest

---

# Feature 7 — Tabs for Category Navigation

Categories should also be displayed as tabs.

Example

```
All Products
Electronics
Clothing
Jewelry
Home
```

Switching tabs should update product listings.

---

# Feature 8 — Wishlist

Users should be able to save products to a wishlist.

Wishlist page should display saved items.

---

# Feature 9 — Shopping Cart

Users should be able to:

* add items to cart
* remove items from cart
* update quantity

Cart should display:

* product name
* quantity
* total price

---

# Feature 10 — Checkout Summary

Checkout page should display:

* cart items
* total price
* taxes
* order summary

Example

```
Subtotal
Tax
Total
```

---

# 6. Non Functional Requirements

The system must:

* support mobile devices
* handle loading states
* handle API failures
* provide smooth UI animations

---

# 7. Pages Required

Use **React Router DOM**.

---

### Home Page

Displays featured products.

Route

```
/
```

---

### Products Page

Displays product listings.

Route

```
/products
```

---

### Product Details Page

Displays full product information.

Route

```
/products/:id
```

---

### Wishlist Page

Displays saved products.

Route

```
/wishlist
```

---

### Cart Page

Displays cart items.

Route

```
/cart
```

---

### Checkout Page

Displays order summary.

Route

```
/checkout
```

---

# 8. APIs

Students must integrate a product API.

---

# Product API

Use Fake Store API

```
https://fakestoreapi.com/products
```

Example endpoints

```
GET /products
GET /products/categories
GET /products/:id
```

---

# Alternative API

DummyJSON

```
https://dummyjson.com/products
```

---

# 9. Data Models

---

### Product Object

```
{
 id,
 title,
 price,
 description,
 category,
 image,
 rating
}
```

---

### Cart Item Object

```
{
 productId,
 quantity,
 price
}
```

---

### Wishlist Object

```
{
 productId
}
```

---

# 10. React Concepts Required

---

# useState

Used for:

* cart items
* filters
* sorting
* search input

Example

```javascript
const [cartItems, setCartItems] = useState([])
```

---

# useEffect

Used for:

* fetching products
* updating cart totals
* updating filtered products

Example

```javascript
useEffect(()=>{
 fetchProducts()
},[])
```

---

# Context API

Used for **global state management**.

Create:

```
CartContext
```

Store global data such as:

* cart items
* wishlist items
* addToCart()
* removeFromCart()

Provider should wrap the entire app.

---

# Custom Hooks

Students should implement reusable hooks.

Examples

### useProducts()

Handles product fetching.

---

### useCart()

Handles cart logic.

---

### useWishlist()

Handles wishlist state.

---

### useDebounce()

Optimizes search performance.

---

# React Router DOM

Routing structure

```
/
/products
/products/:id
/wishlist
/cart
/checkout
```

---

# 11. External npm Packages

Students must use external libraries.

Required packages

```
react-router-dom
axios
react-icons
react-toastify
react-hook-form
yup
swiper
framer-motion
uuid
```

---

# 12. Suggested Folder Structure

```
src

components
   ProductCard
   ProductGrid
   CartItem
   Filters
   SearchBar

pages
   Home
   Products
   ProductDetails
   Cart
   Wishlist
   Checkout

context
   CartContext

hooks
   useProducts
   useCart
   useWishlist
   useDebounce

services
   api.js

utils
   helpers.js
```

---

# 13. Evaluation Criteria

| Criteria             | Weight |
| -------------------- | ------ |
| Feature completeness | 25%    |
| React architecture   | 25%    |
| State management     | 20%    |
| UI design            | 15%    |
| Code quality         | 15%    |

---




