import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Example dataset
data = pd.read_csv('synthetic_sales_data.csv')

# Standardize the data (scaling for clustering)
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)

# Train the KMeans model
n_clusters = 4  # Define the number of clusters
kmeans = KMeans(n_clusters=n_clusters, random_state=42)
kmeans.fit(data_scaled)

# Assign clusters to the original data
data['Cluster'] = kmeans.labels_

print("Training complete. Data with clusters:")
print(data)
