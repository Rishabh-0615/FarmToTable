import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load the dataset
df = pd.read_csv("../Dataset/vegetable_prices_city_dataset.csv")

# Debug: Print original column names
print("Original Columns in the dataset:", df.columns.tolist())

# Remove leading/trailing spaces and convert to lowercase
df.columns = df.columns.str.strip().str.lower()

# Ensure the "date" column exists and convert to datetime
if "date" in df.columns:
    df["date"] = pd.to_datetime(df["date"])
else:
    raise KeyError("The 'date' column is missing from the dataset. Check column names.")

# Extract additional features from the "date"
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"] = df["date"].dt.day

# Drop the original "date" column
df.drop("date", axis=1, inplace=True)

# One-hot encode categorical columns
df = pd.get_dummies(df, columns=["vegetable", "region"], drop_first=True)

# Fill missing values if any
df.fillna(df.mean(), inplace=True)

# Split features and target variable
X = df.drop("price", axis=1)
y = df["price"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error (MSE): {mse}")
print(f"R2 Score: {r2}")

# Save the trained model using joblib
joblib.dump(model, "../Model/vegetable_price_predictor.pkl")
print("Model saved successfully as '../Model/vegetable_price_predictor.pkl'")
