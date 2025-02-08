import requests

# Test the Pricing Strategy endpoint
pricing_data = {
    "Previous_Year_Price": [120],
    "Competitor_Price": [115],
    "Previous_Year_Sales": [500]
}
response = requests.post("http://127.0.0.1:5000/predict_price", json=pricing_data)
print(response.json())
