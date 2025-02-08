import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Load your data (replace 'your_data.csv' with your actual file path)
# The dataset should have columns: 'Previous_Year_Price', 'Competitor_Price', 'Previous_Year_Sales', 'Price'
data = pd.read_csv('synthetic_pricing_data.csv')

# Features and target variable
X = data[['Previous_Year_Price', 'Competitor_Price', 'Previous_Year_Sales']]
y = data['Price']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict prices on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean Squared Error:", mse)
print("R^2 Score:", r2)

# Example: Predict the optimal price for a new scenario
new_data = pd.DataFrame({
    'Previous_Year_Price': [120],
    'Competitor_Price': [115],
    'Previous_Year_Sales': [500]
})
predicted_price = model.predict(new_data)
print("Predicted Price:", predicted_price[0])