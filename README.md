#ressult1.png
# 🌧️ RainFlow Analytics

A modern, full-stack web application for real-time rainfall data analysis and visualization. Upload CSV data, get automated insights, and generate visualizations.

![RainFlow Analytics](https://img.shields.io/badge/React-18.2.0-blue) ![Flask](https://img.shields.io/badge/Flask-2.3.3-green) ![License](https://img.shields.io/badge/License-MIT-yellow) [![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://rain-flow-analytics-mdhv.vercel.app/)

## 🚀 Live Demo

**Frontend Application:** [https://rain-flow-analytics-mdhv.vercel.app/](https://rain-flow-analytics-mdhv.vercel.app/)  
**Backend API:** [https://rain-flow-analytics.onrender.com](https://rain-flow-analytics.onrender.com)

## ✨ Features

- **📊 Smart Data Analysis** - Automatically identifies rainfall trends and patterns
- **📈 Interactive Visualizations** - Generate charts for basic stats, extreme events, and time series
- **📁 Easy File Upload** - Simple CSV upload with 'rainfall' column support
- **🌙 Modern Dark UI** - Beautiful, responsive dashboard with dark theme
- **⚡ Real-time Processing** - Instant analysis and visualization generation
- **📱 Mobile Friendly** - Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd rain-flow-analytics-new
   \`\`\`

2. **Backend Setup** (Optional - API is already deployed)
   \`\`\`bash
   cd backend
   pip install -r requirements.txt
   python app.py
   \`\`\`
   Backend runs on http://localhost:5000

3. **Frontend Setup**
   \`\`\`bash
   # Install dependencies
   npm install

   # Start development server
   npm start
   \`\`\`
   Frontend runs on http://localhost:3000

## 📁 Project Structure

\`\`\`
rain-flow-analytics-new/
├── backend/                 # Flask API
│   ├── app.py              # Main Flask application
│   └── requirements.txt    # Python dependencies
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── Dashboard/      # Main dashboard components
│   │   ├── Navigation/     # Header and sidebar
│   │   └── Charts/         # Visualization components
│   ├── services/           # API service functions
│   └── App.js             # Main React component
└── package.json           # Node.js dependencies
\`\`\`

## 🔧 API Endpoints

### Backend Routes (Live at: https://rain-flow-analytics.onrender.com)
- \`POST /api/load-data\` - Upload CSV file for analysis
- \`GET /api/analyze\` - Get automated trend analysis
- \`GET /api/visualization/<type>\` - Generate charts (basic_stats, extreme_events, time_series)
- \`GET /api/report\` - Generate comprehensive analysis report
- \`GET /\` - API status check

### Frontend Features
- **Dashboard** - Overview with statistics and alerts
- **File Upload** - Drag-and-drop CSV file upload
- **Trend Analysis** - Automated insights from your data
- **Visualizations** - Interactive charts and graphs
- **Real-time Updates** - Live data processing status

## 📊 Data Format

Your CSV file should include:
- \`rainfall\` column (required) - Rainfall measurements in mm
- \`timestamp\` column (optional) - Date/time for time series analysis

**Example CSV:**
\`\`\`csv
timestamp,rainfall
2024-01-01,12.5
2024-01-02,8.2
2024-01-03,15.7
\`\`\`

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Recharts** - Beautiful, composable charts
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **CSS3** - Custom properties and modern layout

### Backend
- **Flask** - Lightweight Python web framework
- **Pandas** - Data analysis and manipulation
- **Matplotlib** - Visualization and plotting
- **Flask-CORS** - Cross-origin resource sharing

## 📖 Usage

1. **Visit the live demo** - Go to [https://rain-flow-analytics-mdhv.vercel.app/](https://rain-flow-analytics-mdhv.vercel.app/)
2. **Upload your data** - Click "Upload & Analyze" and select your CSV file
3. **View trends** - See automated analysis of your rainfall patterns
4. **Generate visuals** - Click visualization types to create charts
5. **Explore insights** - Understand rainfall patterns and extreme events

## 🚀 Deployment

### Frontend (Deployed on Vercel)
\`\`\`bash
npm run build
# Deploy the 'build' folder to Vercel
\`\`\`

### Backend (Deployed on Render)
\`\`\`bash
# Backend is deployed on Render with automatic deployments from main branch
\`\`\`

## 🎯 Available Scripts

\`\`\`bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App (one-way operation)
\`\`\`

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



**RainFlow Analytics** - Making rainfall data analysis beautiful and accessible for everyone. 💧
**Results**
