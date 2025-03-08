🍽️ Recipe Finder & Saver App
An interactive full-stack recipe application that allows users to:

🔍 Search for recipes
📖 View detailed recipe information
❤️ Save favorite recipes
🔄 Reorder saved recipes using drag-and-drop
🚀 Features
✅ Search Recipes – Fetch recipes using the Spoonacular API
✅ Filter by Category – Choose between categories like Vegan, Desserts, Fast Food, etc.
✅ View Recipe Details – See ingredients, instructions, and nutrition info
✅ Save Recipes – Store and access your favorite recipes
✅ Drag & Drop Reordering – Reorder saved recipes in your preferred order
✅ User Authentication – Register, Login, and access saved recipes securely
✅ Fully Responsive – Optimized for mobile, tablet, and desktop
🛠️ Tech Stack
Frontend
⚛ React.js – UI framework
💅 CSS (Tailwind/Custom) – Styling
🏗 DND Kit – Drag-and-drop feature
Backend
🖥 Node.js + Express.js – API development
🗄 MongoDB + Mongoose – Database for storing users & recipes
🔐 JWT Authentication – Secure user authentication
📦 Installation
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
REACT_APP_API_KEY=your_spoonacular_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
4️⃣ Start the Development Server
bash
Copy
Edit
npm start
🚀 The app will be running at http://localhost:3000

🔧 Usage
1️⃣ Register/Login to access saved recipes
2️⃣ Search for recipes using the search bar
3️⃣ Filter recipes by category
4️⃣ Click on a recipe to view details
5️⃣ Save a recipe to your favorites
6️⃣ Go to "Saved Recipes" in the navbar to view & manage saved recipes
7️⃣ Drag & Drop recipes to reorder them

🚀 Deployment
1️⃣ Build for Production
bash
Copy
Edit
npm run build
2️⃣ Deploy to Vercel / Netlify / Render
Vercel: vercel deploy
Netlify: Connect repo & deploy
Render: Deploy backend separately
🤝 Contributing
Want to contribute? Fork & create a pull request! 🚀

