import React, { useState } from 'react';
import './RainFlowAnalytics.css';

const RainFlowAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            setFileName(file.name);
            
            // Simulate analysis
            setTimeout(() => {
                setData({
                    totalDataPoints: 15000,
                    totalTrends: 5
                });
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="rainflow-analytics">
            <header className="analytics-header">
                <h1>🌧️ Rain Flow Analytics</h1>
                <p>Advanced Rainfall Data Analysis & Visualization Platform</p>
            </header>

            <div className="upload-section">
                <h3>📤 Upload Rainfall Data</h3>
                <p>Upload your CSV file containing rainfall data for analysis</p>
                
                <input 
                    type="file" 
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={loading}
                />
                
                {fileName && (
                    <div className="file-name">
                        Selected: {fileName}
                    </div>
                )}
                
                {loading && <div className="loading">Analyzing your data...</div>}
                
                <div className="sample-data">
                    <h4>📋 Sample Data Format:</h4>
                    <pre>
{`date,rainfall,temperature,humidity
2024-01-01,12.5,15,75
2024-01-02,8.2,16,72
2024-01-03,15.7,14,80`}
                    </pre>
                </div>
            </div>

            {data && (
                <div className="analysis-results">
                    <div className="stats-overview">
                        <div className="stat-card">
                            <h3>📊 Data Points Analyzed</h3>
                            <p className="stat-number">{data.totalDataPoints.toLocaleString()}+</p>
                        </div>
                        <div className="stat-card">
                            <h3>🔍 Key Trends Identified</h3>
                            <p className="stat-number">{data.totalTrends}</p>
                        </div>
                        <div className="stat-card">
                            <h3>⏱️ Interpretation Time Saved</h3>
                            <p className="stat-number">40%</p>
                        </div>
                    </div>

                    <div className="success-message">
                        <h2>✅ Analysis Complete!</h2>
                        <p>Your rainfall data has been successfully analyzed. Connect to your backend API to see detailed trends and visualizations.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RainFlowAnalytics;