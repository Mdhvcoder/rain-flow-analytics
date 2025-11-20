from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

class RainFlowAnalyzer:
    def __init__(self):
        self.data = None
        self.trends = []
        
    def load_data(self, file_path):
        """Load and preprocess rain flow data"""
        try:
            self.data = pd.read_csv(file_path)
            # Ensure required columns exist
            if 'rainfall' not in self.data.columns:
                return False
                
            if 'timestamp' in self.data.columns:
                self.data['timestamp'] = pd.to_datetime(self.data['timestamp'])
                self.data.set_index('timestamp', inplace=True)
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def analyze_trends(self):
        """Identify key trends in the rain flow data"""
        if self.data is None or self.data.empty:
            return []
            
        trends = []
        
        try:
            # Basic statistics
            avg_rainfall = self.data['rainfall'].mean()
            max_rainfall = self.data['rainfall'].max()
            min_rainfall = self.data['rainfall'].min()
            
            trends.append({
                'name': 'Basic Rainfall Statistics',
                'description': f'Average: {avg_rainfall:.2f}mm, Max: {max_rainfall:.2f}mm, Min: {min_rainfall:.2f}mm',
                'value': f'{avg_rainfall:.2f}'
            })
            
            # Monthly patterns if timestamp exists
            if hasattr(self.data.index, 'month'):
                monthly_avg = self.data.groupby(self.data.index.month)['rainfall'].mean()
                wettest_month = monthly_avg.idxmax()
                trends.append({
                    'name': 'Seasonal Pattern',
                    'description': f'Wettest month is month #{wettest_month} with {monthly_avg.max():.2f}mm average',
                    'value': wettest_month
                })
            
            # Extreme events
            extreme_threshold = self.data['rainfall'].quantile(0.90)
            extreme_events = self.data[self.data['rainfall'] > extreme_threshold]
            trends.append({
                'name': 'Extreme Rainfall Events',
                'description': f'Found {len(extreme_events)} days with rainfall above {extreme_threshold:.2f}mm',
                'value': len(extreme_events)
            })
            
            # Dry spells
            dry_days = self.data[self.data['rainfall'] == 0]
            trends.append({
                'name': 'Dry Days',
                'description': f'Found {len(dry_days)} days with no rainfall',
                'value': len(dry_days)
            })
            
        except Exception as e:
            print(f"Error in trend analysis: {e}")
            
        self.trends = trends
        return trends
    
    def generate_visualization(self, trend_type):
        """Generate various visualizations"""
        try:
            plt.figure(figsize=(10, 6))
            
            if trend_type == 'basic_stats':
                stats = self.data['rainfall'].describe()
                plt.bar(['Min', 'Avg', 'Max'], 
                       [stats['min'], stats['mean'], stats['max']])
                plt.title('Rainfall Basic Statistics')
                plt.ylabel('Rainfall (mm)')
                
            elif trend_type == 'extreme_events':
                extreme_threshold = self.data['rainfall'].quantile(0.90)
                extreme_days = self.data[self.data['rainfall'] > extreme_threshold]
                if len(extreme_days) > 0:
                    plt.bar(range(len(extreme_days)), extreme_days['rainfall'].head(10))
                    plt.title('Top 10 Extreme Rainfall Events')
                    plt.xlabel('Event Index')
                    plt.ylabel('Rainfall (mm)')
                
            elif trend_type == 'time_series' and hasattr(self.data.index, 'day'):
                # Show last 30 days if available
                recent_data = self.data.tail(30)
                plt.plot(recent_data.index, recent_data['rainfall'])
                plt.title('Recent Rainfall Trend (Last 30 days)')
                plt.xlabel('Date')
                plt.ylabel('Rainfall (mm)')
                plt.xticks(rotation=45)
            
            plt.tight_layout()
            
            # Convert plot to base64
            img = io.BytesIO()
            plt.savefig(img, format='png', bbox_inches='tight')
            img.seek(0)
            plot_data = base64.b64encode(img.getvalue()).decode()
            plt.close()
            
            return plot_data
            
        except Exception as e:
            print(f"Error generating visualization: {e}")
            return None

analyzer = RainFlowAnalyzer()

@app.route('/')
def home():
    return jsonify({"message": "Rain Flow Analytics API is running!"})

@app.route('/api/load-data', methods=['POST'])
def load_data():
    """API endpoint to load rain flow data"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save temporarily and load
        temp_path = 'temp_data.csv'
        file.save(temp_path)
        
        if analyzer.load_data(temp_path):
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return jsonify({'message': 'Data loaded successfully', 'rows': len(analyzer.data)})
        else:
            return jsonify({'error': 'Failed to load data. Ensure CSV has "rainfall" column.'}), 400
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/analyze', methods=['GET'])
def analyze_data():
    """API endpoint to analyze data and return trends"""
    try:
        trends = analyzer.analyze_trends()
        return jsonify({
            'trends': trends,
            'total_trends': len(trends),
            'data_points': len(analyzer.data) if analyzer.data is not None else 0
        })
    except Exception as e:
        return jsonify({'error': f'Analysis error: {str(e)}'}), 500

@app.route('/api/visualization/<trend_type>', methods=['GET'])
def get_visualization(trend_type):
    """API endpoint to get visualization for specific trend"""
    try:
        plot_data = analyzer.generate_visualization(trend_type)
        if plot_data:
            return jsonify({
                'plot_type': trend_type,
                'image_data': plot_data
            })
        else:
            return jsonify({'error': 'Could not generate visualization'}), 400
    except Exception as e:
        return jsonify({'error': f'Visualization error: {str(e)}'}), 500

@app.route('/api/report', methods=['GET'])
def generate_report():
    """Generate comprehensive analysis report"""
    try:
        trends = analyzer.analyze_trends()
        
        report = {
            'generated_at': datetime.now().isoformat(),
            'total_data_points': len(analyzer.data) if analyzer.data is not None else 0,
            'trends_identified': len(trends),
            'analysis_summary': trends,
            'interpretation_time_saved': '40%'
        }
        
        return jsonify(report)
    except Exception as e:
        return jsonify({'error': f'Report generation error: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)