# PLACIFY - AI-Powered Learning Platform

![PLACIFY Logo](https://via.placeholder.com/150x50/6366f1/ffffff?text=PLACIFY)

A modern, AI-driven learning platform designed to help users master computer science fundamentals through personalized roadmaps, interactive tasks, and comprehensive progress tracking.

## ✨ Features

### 🔐 Secure Authentication
- **OTP Verification**: Secure registration with email-based OTP verification
- **Profile Management**: Complete user profiles with personalized learning preferences
- **Path Selection**: Choose your learning journey based on career goals

### 📊 Dashboard & Analytics
- **Progress Tracking**: Real-time visualization of learning metrics (Study consistency, Quiz mastery, Task completion)
- **Current Streak**: Daily learning streak counter with motivational elements
- **Weekly Achievements**: Track completed lessons, quizzes, and tasks

### 🗺️ AI-Powered Roadmap
- **7-Day Weekly Plans**: Each week contains detailed daily learning objectives
- **Dynamic Timeline**: Visual roadmap with milestone tracking
- **Adaptive Learning**: AI recommendations based on user progress and performance

### ✅ Task Management
- **Daily Learning Tasks**: Interactive checklist for daily study items
- **Custom Task Creation**: Add personalized learning tasks
- **Progress Validation**: Mark tasks complete and track completion rates

### 📚 Learning Modules
- **Fundamentals**: Core computer science subjects (DBMS, OS, Networking, Software Engineering)
- **Interactive Quizzes**: Test knowledge with comprehensive assessments
- **AI Chatbot**: Get instant help and explanations for complex topics

### 🎨 Modern UI/UX
- **Pastel Color Scheme**: Beautiful gradients in teal, blue, purple, and green
- **Dark Mode Support**: Seamless light/dark theme switching
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Engaging transitions and hover effects

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing and navigation
- **Lucide Icons** - Beautiful, consistent iconography

### Development Tools
- **Create React App** - React application boilerplate
- **ESLint** - Code linting and formatting
- **Hot Reload** - Instant development feedback

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Usage Guide

### Getting Started
1. **Register**: Create an account with email verification
2. **Complete Profile**: Set up your learning preferences and timeline
3. **Choose Path**: Select your career-focused learning journey
4. **Start Learning**: Follow your personalized AI roadmap

### Key Workflows

#### Daily Learning Routine
- Check your dashboard for daily progress
- Complete tasks from the Tasks page
- Take quizzes to test knowledge
- Review your learning streak

#### Weekly Planning
- View your 7-day roadmap for each week
- Track milestone completion
- Adjust learning pace based on progress

#### Progress Monitoring
- Monitor key metrics on the dashboard
- Review weekly achievements
- Analyze quiz performance

## 📁 Project Structure

```
my-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Button.js          # Reusable button component
│   │   ├── Card.js            # Card component with variants
│   │   ├── Navbar.js          # Navigation header
│   │   ├── ProgressBar.js     # Progress visualization
│   │   └── Sidebar.js         # Navigation sidebar
│   ├── contexts/
│   │   └── ThemeContext.js    # Dark/light theme management
│   ├── pages/
│   │   ├── DashboardPage.js   # Main dashboard
│   │   ├── FundamentalsPage.js # Subject learning modules
│   │   ├── LandingPage.js     # Welcome page
│   │   ├── ProfilePage.js     # User profile setup
│   │   ├── RegisterPage.js    # User registration
│   │   ├── RoadmapPage.js     # Learning roadmap
│   │   ├── SelectionPage.js   # Path selection
│   │   ├── TasksPage.js       # Daily tasks
│   │   └── QuizPage.js        # Quiz interface
│   ├── App.js                 # Main application component
│   ├── index.js               # Application entry point
│   └── setupTests.js          # Test configuration
├── package.json
└── README.md
```

## 🎯 Key Components

### Authentication Flow
- **RegisterPage**: Email registration with OTP verification
- **ProfilePage**: User profile completion with validation
- **SelectionPage**: Learning path selection

### Learning Features
- **DashboardPage**: Progress overview and quick actions
- **RoadmapPage**: 7-day weekly learning plans
- **TasksPage**: Daily task management
- **FundamentalsPage**: Subject-specific learning content

### UI Components
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Automatic dark/light mode
- **Gradient Backgrounds**: Modern visual appeal
- **Interactive Elements**: Hover states and animations

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001
PORT=3000
```

### Theme Customization
Modify colors in `tailwind.config.js` or component styles for branding adjustments.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent styling with Tailwind classes
- Add proper error handling and validation
- Test components across different screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**PLACIFY** - Transform your learning journey with AI-powered personalization and beautiful design.