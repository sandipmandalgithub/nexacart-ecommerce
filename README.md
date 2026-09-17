# NexaCart — E-Commerce Web Application

NexaCart is a modern and responsive e-commerce web application built with **React, Redux Toolkit, React Router and REST APIs**.

The application provides a complete shopping experience including product discovery, search, filtering, sorting, product details, cart management, wishlist management and a checkout flow with mock payment options.

---

## 🚀 Live Project

**GitHub Repository:**
https://github.com/sandipmandalgithub/nexacart-ecommerce

---

## ✨ Features

### 🏠 Home

* Modern hero section
* Shop by category
* Featured products
* Product navigation
* Responsive layout

### 🛍️ Products

* Fetch products from REST API
* Search products by name
* Filter by category
* Filter by rating
* Filter by minimum and maximum price
* Sort by price
* Smart pagination
* Loading state
* Error state
* Empty product state
* Clear search and filters

### 📦 Product Details

* Dynamic product details page
* Product image gallery
* Active image selection
* Product rating
* Stock information
* Discounted price calculation
* Quantity selector
* Stock-aware quantity handling
* Add to cart
* Add to wishlist
* Buy Now functionality

### 🛒 Cart

* Add products to cart
* Increase/decrease quantity
* Stock limit handling
* Remove products
* Move products to wishlist
* Clear cart
* Total item calculation
* Subtotal calculation
* Shipping calculation
* Total savings calculation
* Grand total calculation
* Checkout navigation

### ❤️ Wishlist

* Add products to wishlist
* Remove products
* Move products to cart
* Wishlist persistence
* Empty wishlist state

### 💳 Checkout

* Customer information form
* Name validation
* Email validation
* Phone number validation
* Address validation
* Payment method selection
* Cash on Delivery
* UPI
* Card
* Order ID generation
* Order success screen
* Order total display

> Payment methods are currently implemented as a **mock checkout flow** for demonstration purposes. No real payment gateway is connected.

### 🔔 User Feedback

* Toast notifications
* Confirmation dialogs
* Loading indicators
* Error messages
* Empty states
* Success states

### 📱 Responsive Design

* Desktop responsive layout
* Tablet responsive layout
* Mobile responsive layout
* Mobile navigation menu
* Responsive product grid
* Responsive cart, wishlist and checkout pages

### ❌ 404 Page

* Custom Page Not Found screen
* Navigation back to Home
* Navigation to Products

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5
* CSS3

### State Management

* Redux Toolkit
* React Redux

### Routing

* React Router DOM

### API

* Axios
* DummyJSON REST API

### Notifications

* React Hot Toast

### Development Tools

* Vite
* VS Code
* Git
* GitHub

---

## 🔗 API

Product data is fetched from the **DummyJSON API**.

API endpoints used include:

```text
https://dummyjson.com/products?limit=0
https://dummyjson.com/products?limit=6
https://dummyjson.com/products/category-list
https://dummyjson.com/products/{id}
```

---

## 📂 Project Structure

```text
nexacart-ecommerce/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Product.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── redux/
│   ├── slice.js
│   └── store.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧠 State Management

NexaCart uses **Redux Toolkit** to manage global shopping state.

The Redux store currently handles:

* Cart items
* Wishlist items
* Product quantities
* Cart operations
* Wishlist operations

Cart and wishlist data are also persisted using **browser localStorage**, allowing the user's shopping data to remain available after refreshing the page.

---

## 💾 Local Storage

The application stores the following data in browser localStorage:

```text
cartItems
wishlistItems
```

This allows cart and wishlist information to persist between browser sessions.

---

## 🔄 Application Flow

```text
Home
  │
  ├── Browse Categories
  │
  └── Featured Products
          │
          ▼
      Products
          │
          ├── Search
          ├── Filter
          ├── Sort
          └── Pagination
          │
          ▼
    Product Details
          │
          ├── Add to Cart
          ├── Add to Wishlist
          └── Buy Now
          │
          ▼
        Cart
          │
          └── Checkout
                │
                ├── Customer Details
                ├── Payment Method
                └── Place Order
                        │
                        ▼
                 Order Success
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/sandipmandalgithub/nexacart-ecommerce.git
```

### 2. Navigate to the project

```bash
cd nexacart-ecommerce
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available on the local development server shown by Vite.

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📸 Application Pages

The project contains the following major pages:

* Home
* Products
* Product Details
* Wishlist
* Cart
* Checkout
* Order Success
* 404 Not Found

---

## 🔐 Payment Disclaimer

NexaCart currently uses a **mock payment selection system**.

The following payment methods are available for demonstration:

* Cash on Delivery
* UPI
* Card

No real payment transaction is processed.

---

## 🎯 Project Goals

This project was created to demonstrate practical knowledge of modern React application development, including:

* Component-based architecture
* React Hooks
* Global state management
* REST API integration
* Client-side routing
* Search and filtering
* Pagination
* Shopping cart logic
* Wishlist management
* Form validation
* Responsive UI development
* Local storage persistence
* Git and GitHub workflow

---

## 🚧 Future Improvements

Possible future enhancements include:

* User authentication
* Backend integration
* Real database
* Real payment gateway
* Order history
* User profile
* Product reviews
* Product comparison
* Advanced filtering
* Admin dashboard
* Backend-powered search
* Deployment with CI/CD

---

## 👨‍💻 Author

**Sandip Mandal**

Full Stack Developer

### GitHub

https://github.com/sandipmandalgithub

### Portfolio

https://sandipmandalgithub.github.io/sandip-portfolio/

### LinkedIn

https://www.linkedin.com/in/mrsandipmandal/

---

## 📄 License

This project is created for learning, portfolio and demonstration purposes.
