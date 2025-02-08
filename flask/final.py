import pickle
from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestRegressor
import keras
import tensorflow as tf
tf.__version__
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import matplotlib.pyplot as plt
import io
import base64
from tensorflow.keras.models import load_model
import joblib
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index2.html')



import os
model_path = os.path.abspath('flask/lstm_sales_forecast.h5')
scaler_path = os.path.abspath('flask/scaler.pkl')

model = load_model(model_path)
scaler = joblib.load(scaler_path)


from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Sample Dataset
data = pd.read_csv('flask\synthetic_pricing_data.csv')

# Features and target variable
D = data[['Previous_Year_Price', 'Competitor_Price', 'Previous_Year_Sales']]
k = data['Price']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(D, k, test_size=0.2, random_state=42)

# Initialize and train the Linear Regression model
modle = LinearRegression()
modle.fit(X_train, y_train)


@app.route('/predict_price', methods=['POST'])
def predict_price():
    # Parse the input JSON
    input_data = request.json  # Expecting {"Previous_Year_Price": value, "Competitor_Price": value, "Previous_Year_Sales": value}
    
    # Check if the input has the correct keys
    if "features" not in input_data or not isinstance(input_data["features"], list) or len(input_data["features"]) != 3:
        return jsonify({"error": "Invalid input. Expected 3 numeric features in a list format."}), 400

    
    features = input_data["features"]
    input_dict = {
        'Previous_Year_Price': [features[0]], 
        'Competitor_Price': [features[1]], 
        'Previous_Year_Sales': [features[2]]
    }
    input_df = pd.DataFrame(input_dict)

    # Ensure the feature columns match those used during training
    input_df = input_df[['Previous_Year_Price', 'Competitor_Price', 'Previous_Year_Sales']]

    # Predict the price
    predicted_price = modle.predict(input_df)[0]

    # Return the result
    return jsonify({"predicted_price": round(predicted_price, 2)})



from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
data = pd.read_csv('flask\synthetic_sales_data.csv')
data.drop('date', inplace=True, axis=1) 
data.drop('customer_segment', inplace=True, axis=1)
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)
kmeans = KMeans(n_clusters=4, random_state=42)
kmeans.fit(data_scaled)


@app.route('/segment_customer', methods=['POST'])
def segment_customer():
    input_data = request.json  
    
    # Validate input
    if "features" not in input_data or not isinstance(input_data["features"], list) or len(input_data["features"]) != 2:
        return jsonify({"error": "Invalid input. Expected 2 numeric features in a list format."}), 400
    
    # Extract features
    features = input_data["features"]
    input_df = pd.DataFrame({
        'sales': [features[0]], 
        'price': [features[1]]
    })

    # Standardize the input data
    customer_scaled = scaler.transform(input_df)  

    # Predict the cluster
    cluster = int(kmeans.predict(customer_scaled)[0])  

    return jsonify({"cluster": cluster})


with open('flask\market_share_model.pkl', 'rb') as file:
    model = pickle.load(file)

# @app.route('/market_share_prediction', methods=['POST'])
# def market_share_prediction():
#     try:
#         # Parse the input JSON
#         data = request.json
#         features = data['features']

#         # Validate input (should be a list of 5 numeric values)
#         if not isinstance(features, list) or len(features) != 5:
#             return jsonify({"error": "Invalid input. Expected 5 numeric features in a list format."}), 400

#         # Predict using the model
#         prediction = model.predict([features])  # Input should be a 2D array
#         return jsonify({"prediction": prediction.tolist()})

#     except KeyError as e:
#         return jsonify({"error": f"Missing key in request: {str(e)}"}), 400
#     except Exception as e:
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500
@app.route('/market_share_prediction', methods=['POST'])
def market_share_prediction():
    try:
        # Parse the input JSON
        data = request.json
        features = data['features']  # Expecting a list of values

        # Validate input (should be a list of 5 numeric values)
        if not isinstance(features, list) or len(features) != 5:
            return jsonify({"error": "Invalid input. Expected 5 numeric features in a list format."}), 400

        # Predict using the model
        prediction = model.predict([features])  # Input should be a 2D array
        return jsonify({"prediction": prediction.tolist()})

    except KeyError as e:
        return jsonify({"error": f"Missing key in request: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/visualize', methods=['GET'])
def visualize():
    plt.figure(figsize=(10, 6))
    plt.plot(data.index, data.iloc[:, 0])
    plt.title('Data Visualization')
    plt.xlabel('Index')
    plt.ylabel('Values')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode()
    return f'<img src="data:image/png;base64,{img_base64}"/>'

if __name__ == '__main__':
    app.run(debug=True)
