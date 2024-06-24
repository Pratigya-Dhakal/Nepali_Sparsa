## Nepali Sparsa - E-commerce Website
Welcome to the Nepali Sparsa project! This is an e-commerce website built using the MERN stack (MongoDB, Express, React, Node.js) with Prisma ORM for database management and integrated payment systems.

### Prerequisites
1. Node.js and npm installed
2. MongoDB installed and running
3. Prisma installed globally (optional, but recommended)

### Getting Started
**Backend Setup**
1. Navigate to the backend directory:

cd api

2. Install Dependencies

npm install

3. Set up environment variables:

Create a .env file in the api directory with the following content:

DATABASE_URL="your_database_connection_string"
PORT=5000

4. Initialize Prisma:

npx prisma init

5. Update Prisma schema:

Edit the prisma/schema.prisma file to define your data models.

6. Run Prisma migrations:

npx prisma migrate dev --name init

7. Generate Prisma client:

npx prisma generate

8. Start the backend Server

npm start

**Frontend Setup**

1. Navigate to the frontend directory:

cd client

2. Install dependencies:

npm install

3. Set up environment variables:

Create a .env file in the client directory with the following content:

REACT_APP_API_URL="http://localhost:5000/api"

4. Start the frontend development server:

npm start


### Project Features
Admin Dashboard: Manage products, users, and orders.
Product Listings: Browse and search for products.
User Authentication: Secure login and registration.
Responsive Design: Optimized for mobile and desktop.


### Technologies Used
Frontend: React, React Router, Axios
Backend: Node.js, Express, Prisma ORM
Database: MongoDB

### Contributing
Contributions are welcome! Please fork this repository and submit pull requests with meaningful changes.