# 🛒 EcoMart24 - Modern E-Commerce Platform

<div align="center">

![EcoMart24](https://img.shields.io/badge/EcoMart24-E--Commerce-4CAF50?style=for-the-badge&logo=shopify&logoColor=white)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A feature-rich, full-stack e-commerce application built with the MERN stack, featuring Razorpay payment integration, comprehensive admin dashboard, and a stunning modern UI.**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**EcoMart24** is a modern, fully-featured e-commerce platform designed to provide an exceptional shopping experience. Built with scalability and performance in mind, it offers a seamless user journey from browsing products to checkout, with robust admin capabilities for business management.

### Key Highlights

- 🎨 **Modern UI/UX** - Glassmorphism design with smooth animations
- 💳 **Secure Payments** - Integrated Razorpay payment gateway
- 📊 **Admin Analytics** - Real-time dashboard with sales insights
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt encryption

---

## ✨ Features

### 🛍️ **Customer Features**

#### Authentication & User Management
- ✅ User registration with secure password hashing (bcrypt)
- ✅ Login/Logout with JWT authentication
- ✅ Session management with auto-expiry
- ✅ Profile management with personal info editing
- ✅ Password change functionality
- ✅ Beautiful animated auth screens with blob characters

#### Product Browsing
- ✅ Home page with hero section and featured products
- ✅ Product catalog with grid/list views
- ✅ Advanced search functionality with keyword highlighting
- ✅ Category-based filtering (Grocery, Dairy, Bakery, etc.)
- ✅ Product sorting (price, rating, newest)
- ✅ Pagination for large product lists
- ✅ Detailed product pages with full descriptions
- ✅ Product reviews and ratings system
- ✅ Star rating display component

#### Special Sections
- ✅ **Deals Section** - Products on special offers with deal prices
- ✅ **New Arrivals** - Latest products added to the store
- ✅ **Categories Page** - Browse by product categories
- ✅ **Shop Page** - Full product catalog with filters

#### Shopping Cart & Wishlist
- ✅ Add/remove products from cart
- ✅ Update product quantities
- ✅ Cart persistence across sessions
- ✅ Wishlist functionality
- ✅ Cart summary with subtotal calculation
- ✅ Stock availability checking

#### Address Management
- ✅ Multiple address support per user
- ✅ Address types (Home, Office, Other)
- ✅ Set default address
- ✅ Pincode validation for delivery availability
- ✅ Full address form with landmark support
- ✅ Location-based delivery checking

#### Checkout Process
- ✅ Multi-step checkout flow with progress indicator
- ✅ Shipping address selection
- ✅ Payment method selection
- ✅ Order review before placement
- ✅ Price breakdown (items, tax, shipping, total)
- ✅ Order confirmation

#### Payment Integration
- ✅ **Razorpay Payment Gateway** integration
- ✅ Secure payment processing
- ✅ Payment verification with signature validation
- ✅ Payment success/failure handling
- ✅ Payment receipt generation

#### Order Management
- ✅ View order history
- ✅ Detailed order view with all items
- ✅ **Real-time Order Tracking** with status updates:
  - Order Confirmed
  - Order Placed
  - Shipped
  - Out for Delivery
  - Delivered
- ✅ Order status timeline visualization
- ✅ Delivery date/time stamps

#### Additional Pages
- ✅ **About Us** - Company information
- ✅ **Contact Us** - Contact form and details
- ✅ **FAQ** - Frequently asked questions
- ✅ **SEO Meta Tags** - Optimized for search engines

---

### 👨‍💼 **Admin Features**

#### Admin Dashboard
- ✅ Comprehensive analytics dashboard
- ✅ Sales statistics and charts (Chart.js)
- ✅ Revenue overview
- ✅ Order count metrics
- ✅ User growth tracking

#### Product Management
- ✅ View all products with pagination
- ✅ Create new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ **Image upload** with Multer
- ✅ Manage stock levels
- ✅ Set deal prices and new arrival flags
- ✅ Product category assignment

#### Order Management
- ✅ View all customer orders
- ✅ Update order payment status
- ✅ Update delivery status
- ✅ **Order status step updates**:
  - Mark as confirmed
  - Mark as shipped
  - Mark as out for delivery
  - Mark as delivered
- ✅ Add delivery steps with timestamps
- ✅ Update order location

#### User Management
- ✅ View all registered users
- ✅ Edit user details
- ✅ Grant/revoke admin privileges
- ✅ Delete users

#### Location Management
- ✅ Manage delivery locations
- ✅ Pincode-based delivery zones
- ✅ Add/remove serviceable areas

---

### 🎨 **UI/UX Features**

#### Visual Design
- ✅ Modern glassmorphism design
- ✅ Smooth page transitions (Framer Motion)
- ✅ Animated hero sections
- ✅ Scroll progress indicator
- ✅ Floating dock navigation
- ✅ Grid patterns and visual effects

#### Navigation & Layout
- ✅ Responsive header with mega menu
- ✅ Mobile bottom tab navigation
- ✅ Hamburger menu for mobile
- ✅ Breadcrumb navigation
- ✅ Sticky header on scroll

#### Loading States
- ✅ Animated splash screen on app load
- ✅ Skeleton loaders for content
- ✅ Loading spinners
- ✅ Toast notifications for actions

#### Responsiveness
- ✅ Fully responsive design
- ✅ Mobile-first approach
- ✅ Tablet optimizations
- ✅ Desktop enhancements

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black) | UI Library |
| ![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white) | State Management |
| ![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=flat&logo=react-router&logoColor=white) | Routing |
| ![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat&logo=chakra-ui&logoColor=white) | Component Library |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility CSS |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white) | CSS Framework |
| ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white) | Data Visualization |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | Animations |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | HTTP Client |
| ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=flat&logo=react&logoColor=white) | Icon Library |
| ![React Toastify](https://img.shields.io/badge/React_Toastify-FFDD00?style=flat&logo=react&logoColor=black) | Notifications |
| ![React Helmet](https://img.shields.io/badge/React_Helmet-008080?style=flat&logo=react&logoColor=white) | SEO Management |

### Backend

| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime Environment |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Web Framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | ODM |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) | Authentication |
| ![bcrypt](https://img.shields.io/badge/bcrypt-338833?style=flat&logo=security&logoColor=white) | Password Hashing |
| ![Razorpay](https://img.shields.io/badge/Razorpay-0C2451?style=flat&logo=razorpay&logoColor=white) | Payment Gateway |
| ![Multer](https://img.shields.io/badge/Multer-FF6600?style=flat&logo=node.js&logoColor=white) | File Upload |
| ![Helmet](https://img.shields.io/badge/Helmet-000000?style=flat&logo=security&logoColor=white) | Security Middleware |
| ![Morgan](https://img.shields.io/badge/Morgan-000000?style=flat&logo=node.js&logoColor=white) | HTTP Logger |
| ![Winston](https://img.shields.io/badge/Winston-000000?style=flat&logo=node.js&logoColor=white) | Application Logger |
| ![Express Validator](https://img.shields.io/badge/Express_Validator-000000?style=flat&logo=express&logoColor=white) | Input Validation |

### DevOps & Deployment

| Technology | Purpose |
|------------|---------|
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Deployment Platform |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | Version Control |

---

## 📁 Project Structure

```
EcoMart24/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── db.js                 # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── addressController.js  # Address CRUD operations
│   │   ├── locationController.js # Location management
│   │   ├── orderController.js    # Order processing
│   │   ├── productController.js  # Product CRUD
│   │   ├── razorpayController.js # Payment processing
│   │   └── userController.js     # User authentication
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── 📁 models/
│   │   ├── addressModel.js       # Address schema
│   │   ├── locationModel.js      # Location schema
│   │   ├── orderModel.js         # Order schema
│   │   ├── pincodeModel.js       # Pincode schema
│   │   ├── productModel.js       # Product schema
│   │   └── userModel.js          # User schema
│   ├── 📁 routes/
│   │   ├── addressRoutes.js      # Address endpoints
│   │   ├── locationRoutes.js     # Location endpoints
│   │   ├── orderRoutes.js        # Order endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   ├── stats.js              # Analytics endpoints
│   │   ├── uploadRoutes.js       # File upload
│   │   └── userRoutes.js         # Auth endpoints
│   ├── 📁 utils/
│   │   └── helpers.js            # Utility functions
│   ├── server.js                 # Express server entry
│   └── package.json
│
├── 📁 frontend/
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 assets/            # Static assets
│   │   ├── 📁 components/
│   │   │   ├── 📁 profile/       # Profile components
│   │   │   ├── 📁 ui/            # Reusable UI components
│   │   │   ├── Header.jsx        # Navigation header
│   │   │   ├── Footer.jsx        # Site footer
│   │   │   ├── Product.jsx       # Product card
│   │   │   ├── SearchBox.jsx     # Search component
│   │   │   ├── Loader.jsx        # Loading spinner
│   │   │   └── ...more
│   │   ├── 📁 screens/
│   │   │   ├── 📁 admin/         # Admin panel screens
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Analytic.jsx
│   │   │   │   ├── ProductListScreen.jsx
│   │   │   │   ├── OrderListScreen.jsx
│   │   │   │   ├── UserListScreen.jsx
│   │   │   │   └── ...more
│   │   │   ├── HomeScreen.jsx    # Landing page
│   │   │   ├── AuthScreen.jsx    # Login/Register
│   │   │   ├── CartScreen.jsx    # Shopping cart
│   │   │   ├── ProductScreen.jsx # Product details
│   │   │   ├── OrderScreen.jsx   # Order details
│   │   │   ├── ProfileScreen.jsx # User profile
│   │   │   ├── WishlistScreen.jsx# Wishlist
│   │   │   └── ...more
│   │   ├── 📁 slices/            # Redux slices
│   │   │   ├── apiSlice.js       # RTK Query setup
│   │   │   ├── authSlice.js      # Auth state
│   │   │   ├── cartSlice.js      # Cart state
│   │   │   ├── productsApiSlice.js
│   │   │   ├── ordersApiSlice.js
│   │   │   └── ...more
│   │   ├── App.js                # Root component
│   │   ├── index.js              # App entry + routes
│   │   └── store.js              # Redux store
│   └── package.json
│
├── vercel.json                   # Vercel deployment config
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** v18+ 
- **MongoDB** (local or Atlas)
- **Razorpay Account** (for payments)

### Clone the Repository

```bash
git clone https://github.com/yourusername/EcoMart24.git
cd EcoMart24
```

### Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Run the Application

```bash
# Terminal 1: Start Backend (from backend directory)
npm run dev

# Terminal 2: Start Frontend (from frontend directory)
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## 🔐 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecomart24
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 📚 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Register new user |
| POST | `/api/users/auth` | Login user |
| POST | `/api/users/logout` | Logout user |
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| POST | `/api/products/:id/reviews` | Add product review |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/mine` | Get user's orders |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id/pay` | Update to paid |
| PUT | `/api/orders/:id/deliver` | Update to delivered |
| PUT | `/api/orders/:id/status` | Update order status |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/razorpay` | Create Razorpay order |
| POST | `/api/orders/verifypayment` | Verify payment |

### Addresses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/addresses` | Get user addresses |
| POST | `/api/addresses` | Add new address |
| PUT | `/api/addresses/:id` | Update address |
| DELETE | `/api/addresses/:id` | Delete address |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get dashboard stats |
| GET | `/api/users` | Get all users |
| GET | `/api/orders` | Get all orders |

---

## 📸 Screenshots

### Home Page
> Modern landing page with hero section, featured products, and category navigation

### Product Catalog
> Grid view of products with filters, search, and sorting options

### Product Details
> Detailed product view with images, reviews, and add to cart

### Shopping Cart
> Full cart functionality with quantity controls and price summary

### Checkout Flow
> Multi-step checkout with address selection and payment

### Order Tracking
> Real-time order status with delivery timeline

### Admin Dashboard
> Analytics dashboard with charts and key metrics

### Admin Product Management
> Full CRUD interface for product management

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pawan Kumar Yadav**

- Portfolio: [developerdev.online](https://developerdev.online)
- Email: pawan08.dev@proton.me
- Phone: +91 7011729770

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ using the MERN Stack

</div>
