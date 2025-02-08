from flask import Flask, request, jsonify
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Sample Dataset
data = pd.DataFrame({
    'Previous_Year_Price': [87.45, 145.07, 123.20, 109.87, 65.60],
    'Competitor_Price': [65.36, 104.61, 141.02, 125.54, 133.72],
    'Previous_Year_Sales': [419, 362, 419, 469, 831],
    'Price': [74.55, 135.35, 130.74, 119.53, 104.52]
})

# Features and target variable
X = data[['Previous_Year_Price', 'Competitor_Price', 'Previous_Year_Sales']]
y = data['Price']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

app = Flask(__name__)

@app.route('/predict_price', methods=['POST'])
def predict_price():
    # Parse the input JSON
    input_data = request.json  # Expecting {"Previous_Year_Price": value, "Competitor_Price": value, "Previous_Year_Sales": value}

    # Convert the input into a DataFrame
    input_df = pd.DataFrame([input_data])

    # Predict the price
    predicted_price = model.predict(input_df)[0]

    # Return the result
    return jsonify({"predicted_price": round(predicted_price, 2)})

