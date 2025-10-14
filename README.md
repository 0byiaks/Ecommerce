# 🛒 E-Commerce Fullstack Application

A modern, full-featured e-commerce application built with React, Node.js, MongoDB, and Docker. Features Amazon-like UI with complete shopping functionality.

## ✨ Features

### 🎨 Frontend (React + Vite)
- **Modern UI**: Amazon-style design with Tailwind CSS
- **Authentication**: Login/Register with JWT tokens
- **Product Catalog**: Search, filter, and browse products
- **Shopping Cart**: Add/remove items with real-time counter
- **Order Management**: Place orders and view order history
- **Search Functionality**: Real-time search with suggestions
- **Responsive Design**: Mobile-first approach

### 🔧 Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **Search**: Full-text search across products
- **Cart Management**: Persistent cart storage
- **Order Processing**: Complete order lifecycle

### 🐳 DevOps
- **Docker**: Containerized application
- **Docker Compose**: Multi-service orchestration
- **Production Ready**: Optimized for deployment

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin requests

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **Nginx** - Web server (production)

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Product.js     # Product schema
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   ├── products.js    # Product routes
│   │   ├── cart.js        # Cart routes
│   │   └── orders.js      # Order routes
│   ├── index.js           # Server entry point
│   ├── seed.js           # Database seeding
│   └── Dockerfile        # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   └── SearchSuggestions.jsx
│   │   ├── pages/
│   │   │   ├── Products.jsx   # Product listing
│   │   │   ├── Cart.jsx       # Shopping cart
│   │   │   ├── Orders.jsx     # Order history
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Register.jsx   # Registration page
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state
│   │   ├── api/
│   │   │   └── axiosConfig.js  # API configuration
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── tailwind.config.js     # Tailwind configuration
│   └── Dockerfile             # Frontend container
├── docker-compose.yml         # Multi-service setup
└── README.md                  # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- MongoDB Atlas account (or local MongoDB)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed Database**
   ```bash
   cd backend
   node seed.js
   ```

### Docker Development

1. **Start all services**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000
   - MongoDB: localhost:27017

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products?search=query` - Search products
- `GET /api/products/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:productId` - Remove item
- `DELETE /api/cart/clear` - Clear cart

### Orders (Protected)
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order

## 🎨 UI Features

### Design System
- **Colors**: Amazon-inspired color palette
- **Typography**: Clean, modern fonts
- **Components**: Reusable, consistent design
- **Responsive**: Mobile-first approach

### Key Components
- **Navbar**: Search, cart counter, user menu
- **Product Cards**: Hover effects, clean layout
- **Forms**: Modern input fields with validation
- **Cart**: Professional shopping cart interface
- **Orders**: Order tracking and history

## 🚀 Deployment

### Render Deployment

1. **Backend Deployment**
   - Connect GitHub repository
   - Set environment variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `PORT`: 8000
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`

2. **Frontend Deployment**
   - Connect GitHub repository
   - Set environment variables:
     - `VITE_API_URL`: Your backend URL
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`

### Environment Variables

#### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_here
PORT=8000
```

#### Frontend
```
VITE_API_URL=https://your-backend-url.com/api
```

## 🧪 Testing

### Manual Testing
1. **User Registration/Login**
2. **Product Browsing**
3. **Search Functionality**
4. **Cart Operations**
5. **Order Placement**

### API Testing
Use Postman or curl to test endpoints:
```bash
# Test health check
curl http://localhost:8000/health

# Test product search
curl "http://localhost:8000/api/products?search=wireless"
```

## 📱 Features Overview

### User Experience
- ✅ User authentication (register/login)
- ✅ Product browsing with search
- ✅ Shopping cart with real-time updates
- ✅ Order placement and tracking
- ✅ Responsive design for all devices
- ✅ Modern, Amazon-like UI

### Technical Features
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration
- ✅ RESTful API design
- ✅ Docker containerization
- ✅ Production-ready configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Multi-language support

---

**Built with ❤️ using React, Node.js, and MongoDB**
