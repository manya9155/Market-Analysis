# import pandas as pd
# import numpy as np

# # Set random seed for reproducibility
# np.random.seed(42)

# # Generate synthetic data
# n_samples = 1000
# data = {
#     'Previous_Year_Price': np.random.uniform(50, 150, n_samples),  # Prices range from $50 to $150
#     'Competitor_Price': np.random.uniform(45, 155, n_samples),    # Competitor prices in a similar range
#     'Previous_Year_Sales': np.random.randint(200, 1000, n_samples),  # Sales between 200 and 1000 units
# }


# noise = np.random.normal(0, 5, n_samples)  
# data['Price'] = (data['Previous_Year_Price'] + data['Competitor_Price']) / 2 + noise

# # Create a DataFrame
# df = pd.DataFrame(data)

# # Save to CSV
# df.to_csv('synthetic_pricing_data.csv', index=False)

# print("Synthetic dataset saved as 'synthetic_pricing_data.csv'")


# import pandas as pd
# import numpy as np

# # Set random seed for reproducibility
# np.random.seed(42)

# # Number of samples for the dataset
# n_samples = 1000

# # Generate synthetic features
# data = {
#     'Competitor_Sales': np.random.randint(500, 5000, n_samples),  # Competitor sales between 500 and 5000 units
#     'Advertising_Spend': np.random.uniform(1000, 50000, n_samples),  # Advertising spend in dollars
#     'Price': np.random.uniform(10, 100, n_samples),  # Product price in dollars
#     'Customer_Rating': np.random.uniform(1, 5, n_samples),  # Customer rating between 1 and 5
#     'Product_Availability': np.random.randint(0, 2, n_samples),  # 0 (Out of stock) or 1 (In stock)
# }

# # Calculate 'Market_Share' based on some relationships
# # Example formula: Market_Share = (Advertising_Spend / 1000) + (Customer_Rating * 2) - (Price / 10) + Noise
# noise = np.random.normal(0, 5, n_samples)  # Random noise
# data['Market_Share'] = (data['Advertising_Spend'] / 1000) + \
#                        (data['Customer_Rating'] * 2) - \
#                        (data['Price'] / 10) + \
#                        noise

# # Create a DataFrame
# market_share_df = pd.DataFrame(data)

# # Save the dataset as a CSV file
# file_path = '/mnt/data/synthetic_market_share_data.csv'
# market_share_df.to_csv(file_path, index=False)

# file_path


import pandas as pd
import numpy as np

# Generate a synthetic dataset
np.random.seed(42)
dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
sales = np.round(np.sin(np.linspace(0, 2 * np.pi, len(dates))) * 100 + 200 + np.random.normal(scale=10, size=len(dates)), 2)

data = pd.DataFrame({'Date': dates, 'Sales': sales})
data.to_csv('sales_data.csv', index=False)
