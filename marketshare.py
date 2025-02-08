import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pickle

# Load the dataset
data = pd.read_csv('synthetic_market_share_data.csv')  # Replace with your dataset path

# Define features (X) and target (y)
X = data[['Competitor_Sales', 'Advertising_Spend', 'Price', 'Customer_Rating', 'Product_Availability']]
y = data['Market_Share']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Regressor
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Save the trained model to a .pkl file
with open('market_share_model.pkl', 'wb') as file:
    pickle.dump(model, file)

print("Model trained and saved successfully!")
