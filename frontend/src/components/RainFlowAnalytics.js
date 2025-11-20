import React, { useState } from 'react';
import './RainFlowAnalytics.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const RainFlowAnalytics = () => {
    const [data, setData] = useState(null);
    const [trends, setTrends] = useState([]);
    const [visualizations, setVisualizations] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');

    const loadData = async (file) => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        setLoading(true);
        setError('');
        setFileName(file.name);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_BASE_URL}/api/load-data`, {
                method: 'POST',
                body: formData,
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setError('');
                await analyzeData();
            } else {
                setError(result.error || 'Failed to load data');
            }
        } catch (error) {
            setError('Cannot connect to server. Make sure backend is running.');
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const analyzeData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/analyze`);
            const result = await response.json();
            
            if (response.ok) {
                setTrends(result.trends);
                setData({
                    totalDataPoints: result.data_points,
                    totalTrends: result.total_trends
                });
            } else {
                setError(result.error || 'Analysis failed');
            }
        } catch (error) {
            setError('Cannot connect to analysis service');
            console.error('Error analyzing data:', error);
        }
    };

    const generateVisualization = async (trendType) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/visualization/${trendType}`);
            const result = await response.json();
            
            if (response.ok) {
                setVisualizations(prev => ({
                    ...prev,
                    [trendType]: result.image_data
                }));
            } else {
                setError(result.error || 'Visualization failed');
            }
        } catch (error) {
            setError('Cannot generate visualization');
            console.error('Error generating visualization:', error);
        }
    };

    const generateReport = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/report`);
            const report = await response.json();
            
            if (response.ok) {
                // Download report as JSON
                const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `rainflow-report-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                setError(report.error || 'Report generation failed');
            }
        } catch (error) {
            setError('Cannot generate report');
            console.error('Error generating report:', error);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            loadData(file);
        }
    };

    return (
        <div className="rainflow-analytics">
            <div className="analytics-container">
                <header className="analytics-header">
                    <h1>🌧️ Rain Flow Analytics</h1>
                    <p>Advanced Rainfall Data Analysis & Visualization Platform</p>
                    <p className="api-status">
                        Backend: {API_BASE_URL}
                    </p>
                </header>

                <div className="content-area">
                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="upload-section">
                        <h3>📤 Upload Rainfall Data</h3>
                        <p>Upload your CSV file containing rainfall data for analysis</p>
                        
                        <div className="file-input-container">
                            <input 
                                type="file" 
                                accept=".csv"
                                onChange={handleFileUpload}
                                disabled={loading}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="file-input-label">
                                📁 Choose CSV File
                            </label>
                        </div>
                        
                        {fileName && (
                            <div className="file-name">
                                Selected: {fileName}
                            </div>
                        )}
                        
                        {loading && <div className="loading">Analyzing your data</div>}
                        
                        <div className="sample-data">
                            <h4>📋 Sample Data Format:</h4>
                            <pre>
{`date,rainfall,temperature,humidity
2024-01-01,12.5,15,75
2024-01-02,8.2,16,72
2024-01-03,15.7,14,80
2024-01-04,0.0,18,65
2024-01-05,22.1,13,85`}
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

                            <div className="trends-section">
                                <h2 className="section-title">📈 Identified Trends</h2>
                                <div className="trends-grid">
                                    {trends.map((trend, index) => (
                                        <div key={index} className="trend-card">
                                            <h4>{trend.name}</h4>
                                            <p>{trend.description}</p>
                                            <div className="trend-actions">
                                                <button 
                                                    onClick={() => generateVisualization('basic_stats')}
                                                    className="visualize-btn"
                                                >
                                                    📊 Basic Stats
                                                </button>
                                                <button 
                                                    onClick={() => generateVisualization('extreme_events')}
                                                    className="visualize-btn"
                                                >
                                                    ⚡ Extreme Events
                                                </button>
                                                <button 
                                                    onClick={() => generateVisualization('time_series')}
                                                    className="visualize-btn"
                                                >
                                                    📈 Time Series
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {Object.keys(visualizations).length > 0 && (
                                <div className="visualizations-section">
                                    <h2 className="section-title">🖼️ Visual Reports</h2>
                                    <div className="visualizations-grid">
                                        {Object.entries(visualizations).map(([type, imageData]) => (
                                            <div key={type} className="visualization-card">
                                                <h4>{type.replace('_', ' ').toUpperCase()} Analysis</h4>
                                                <img 
                                                    src={`data:image/png;base64,${imageData}`} 
                                                    alt={`${type} visualization`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="report-section">
                                <button onClick={generateReport} className="report-btn">
                                    📄 Generate Detailed Report
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RainFlowAnalytics;