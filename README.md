# AI Interview Strategy Generator 🚀

An intelligent, full-stack platform designed to give job seekers a competitive edge. This application uses **Google Gemini AI** to analyze job descriptions and resumes, providing personalized interview preparation plans, match scores, and tailored question sets.

## 🌟 Key Features

- **AI-Powered Analysis**: Leverages Google Gemini to bridge the gap between your resume and the job requirements.
- **Match Score**: Get a percentage match score based on your skills and experience relative to the target role.
- **Custom Preparation Plan**: Receive a step-by-step strategy to ace your specific interview.
- **Tailored Questions**: Generates both Behavioral and Technical questions based on the job context.
- **Resume Parsing**: Automatically extracts data from PDF resumes.
- **Secure Authentication**: Built-in user registration and login system using JWT and secure cookies.
- **History Tracking**: Keep track of all your generated interview plans in one dashboard.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **SCSS** for premium, modern styling
- **React Router** for seamless navigation
- **Axios** for API communication

### Backend
- **Node.js & Express**
- **MongoDB** (via Mongoose) for data persistence
- **Google Generative AI (Gemini)** for intelligent insights
- **Multer & PDF-Parse** for resume handling
- **JWT & Cookie-Parser** for secure sessions

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nautiyalaman93-cyber/FullStack_GenAi.git
   cd FullStack_GenAi
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   # Create a .env file and add:
   # MONGO_URI, JWT_SECRET, GOOGLE_GENAI_API_KEY, PORT=5000, FRONTEND_URL=http://localhost:5173
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   # Create a .env file and add:
   # VITE_API_URL=http://localhost:5000
   npm run dev
   ```

## 🌐 Deployment

The app is ready to be deployed on platforms like **Render** (Backend) and **Vercel** (Frontend). 

### Security Note
For production environments, ensure `NODE_ENV` is set to `production` and `FRONTEND_URL` is set to your deployed frontend address.

---
Developed with ❤️ by Aman Nautiyal
