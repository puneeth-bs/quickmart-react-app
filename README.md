# **QuickMart**  

Welcome to **QuickMart**, a marketplace application inspired by online Marketplace. **QuickMart** connects buyers and sellers, offering an intuitive and dynamic platform for product discovery, sales, and reviews.

---

## 🌟 **Features**

### **Unauthenticated Users**
- 🌐 **Browse Products**: View items fetched from the Dummy API.  
- 🔍 **Search & Filter**: Locate products easily through advanced filtering and sorting.  
- 🛍️ **Product Details**: Check product descriptions, ratings, and reviews.  

---

### **Authenticated Users**
#### **Buyer**
- 🛒 **Explore Listings**: Browse and purchase items listed by sellers.  
- 🔍 **Search & Sort**: Refine searches with filters and sorting tools.  
- 📜 **Detailed Pages**: See in-depth product details and seller information.  
- ✍️ **Write Reviews**: Share feedback on purchased products.  
- 👤 **Profile Management**: Edit and secure your profile data.  

#### **Seller**
- 🛍️ **List Products**: Add items for sale with ease.  
- 🛠️ **Manage Listings**: Update or delete product listings.  
- 📜 **Access Reviews**: Gain insights from detailed buyer reviews.  
- 👤 **Profile Customization**: Manage and secure your account details.  

#### **Admin**
- 🛡️ **User Management**: Add, edit, or remove buyers and sellers.  
- 📊 **Platform Monitoring**: Oversee activity to ensure compliance.  

---

## 💻 **Tech Stack**
- **Frontend**:  
  - React (powered by Vite for faster development).  
  - Tailwind CSS for a sleek, responsive design.  
- **Backend**:  
  - Node.js and Express.js.  
- **Database**:  
  - MongoDB for reliable and scalable data management.  
- **Cloud Service**
  - S3 (AWS Simple Storage Service) for storing images.

---

## 🚀 **Getting Started**

### **Prerequisites**
Ensure you have the following installed:  
- **Node.js** (v16+ recommended).  
- **MongoDB** (local or cloud instance).  
- **AWS Account** S3 (Free Tier)
- **Git** for cloning the repository.  

---


### Setting Up the Frontend
Create a folder named `client` and clone the frontend code from [here](https://github.com/puneeth-bs/quickmart-react-app).



#### 1. Navigate to the client directory:

```bash
cd client
```
#### 2. Install dependencies:

```bash
npm install
```
#### 3. Create a .env file in the frontend directory and add the following environment variables:

```makefile
VITE_API_URL=
VITE_S3_BUCKET_NAME=
```

#### 3. Run the frontend:

```bash
npm run dev
```

### Setting Up the Backend
Create a folder named `server` and clone the frontend code from [here](https://github.com/puneeth-bs/quickmart-node-app).



#### 1. Navigate to the server directory:

```bash
cd server
```
#### 2. Install dependencies:

```bash
npm install
```
#### 3. Create a .env file in the frontend directory and add the following environment variables:

```makefile
PORT=
CLIENT_URL=
JWT_SECRET_KEY=
MONGO_URI=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

#### 3. Run the backend:

```bash
nodemon server.js
```



## Project Structure
```bash
QuickMark/
│
├── client/              # Frontend code (React + Tailwind CSS)
│   ├── public/          # Static assets
│   ├── src/             # React components and pages
│   ├── .env             # Client environment variables
│   ├── vite.config.js   # Vite configuration
│   └── ...              # Other React files
│
├── server/              # Backend code (Node.js + Express.js)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── .env             # Server environment variables
│   └── ...              # Other backend files
│
├── README.md            # Project documentation
└── ...                  # Other root-level files
```




## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.
