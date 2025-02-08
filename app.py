from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestRegressor
from joblib import load

app = Flask(__name__)

# Initialize models and scalers
pricing_model = LinearRegression()
scaler = MinMaxScaler()
kmeans_model = None  # Placeholder for K-Means
rf_model = None  # Placeholder for Random Forest

# Load pre-trained models if available
try:
    kmeans_model = load('kmeans_model.pkl')
    rf_model = load('market_share_model.pkl')
except:
    print("K-Means or Random Forest models not found. Train them before use.")

# Pricing Strategy Endpoint
@app.route('/predict_price', methods=['POST'])
def predict_price():
    data = request.json
    input_data = pd.DataFrame(data)
    predicted_price = pricing_model.predict(input_data)
    return jsonify({'predicted_price': predicted_price.tolist()})

# Sales Forecasting Endpoint
@app.route('/forecast_sales', methods=['POST'])
def forecast_sales():
    data = request.json
    df = pd.DataFrame(data)
    # Preprocess and create dataset
    df['price_lag1'] = df['price'].shift(1)
    df['sales_lag1'] = df['sales'].shift(1)
    df['sales_moving_avg'] = df['sales'].rolling(window=7).mean()
    df.dropna(inplace=True)

    # Normalize
    scaled_data = scaler.fit_transform(df)
    return jsonify({'forecast': 'Sales forecasting logic to be added'})

# Customer Segmentation Endpoint
@app.route('/segment_customers', methods=['POST'])
def segment_customers():
    data = request.json
    df = pd.DataFrame(data)
    X = df.values
    X_scaled = StandardScaler().fit_transform(X)

    # Cluster and return labels
    clusters = kmeans_model.predict(X_scaled)
    return jsonify({'clusters': clusters.tolist()})

# Market Share Prediction Endpoint
@app.route('/predict_market_share', methods=['POST'])
def predict_market_share():
    data = request.json
    df = pd.DataFrame(data)
    predictions = rf_model.predict(df)
    return jsonify({'market_share_predictions': predictions.tolist()})

# Main Integration Endpoint
@app.route('/integrate', methods=['POST'])
def integrate_analysis():
    data = request.json

    # Pricing prediction
    price_input = pd.DataFrame(data['pricing'])
    predicted_price = pricing_model.predict(price_input)

    # Market share prediction
    market_input = pd.DataFrame(data['market_share'])
    predicted_market_share = rf_model.predict(market_input)

    # Customer segmentation
    segmentation_input = pd.DataFrame(data['customer_segmentation'])
    segmentation_scaled = StandardScaler().fit_transform(segmentation_input)
    clusters = kmeans_model.predict(segmentation_scaled)

    return jsonify({
        'predicted_price': predicted_price.tolist(),
        'predicted_market_share': predicted_market_share.tolist(),
        'customer_segments': clusters.tolist()
    })

if __name__ == '__main__':
    app.run(debug=True)
