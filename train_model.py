import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error

# Create a sample dataset for a month
data = {
    "vegetable": ["Tomato", "Potato", "Carrot", "Spinach", "Tomato", "Potato", "Carrot", "Spinach"],
    "available_quantity": [100, 200, 150, 180, 130, 140, 160, 170],
    "previous_demand": [80, 150, 120, 160, 100, 110, 130, 140],
    "price_per_unit": [50, 45, 48, 55, 52, 47, 49, 56],
    "season": ["Spring", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Summer"],
    "day_type": ["Weekday", "Weekend", "Weekday", "Weekend", "Weekday", "Weekend", "Weekday", "Weekend"],
    "demand": [90, 180, 140, 170, 120, 130, 150, 160]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Create additional features for better accuracy
df["price_demand_ratio"] = df["price_per_unit"] / df["previous_demand"]

# Encode categorical columns
vegetable_encoder = LabelEncoder()
df["vegetable"] = vegetable_encoder.fit_transform(df["vegetable"])

season_encoder = LabelEncoder()
df["season"] = season_encoder.fit_transform(df["season"])

day_type_encoder = LabelEncoder()
df["day_type"] = day_type_encoder.fit_transform(df["day_type"])

# Save encoders for use in the prediction service
joblib.dump(vegetable_encoder, "vegetable_encoder.pkl")
joblib.dump(season_encoder, "season_encoder.pkl")
joblib.dump(day_type_encoder, "day_type_encoder.pkl")

# Define features and target
X = df.drop("demand", axis=1)
y = df["demand"]

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Hyperparameter tuning using GridSearchCV
param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [5, 10, 15, None],
    "min_samples_split": [2, 5, 10]
}

model = RandomForestRegressor(random_state=42)
grid_search = GridSearchCV(model, param_grid, cv=3, scoring="neg_mean_squared_error", n_jobs=-1)
grid_search.fit(X_train, y_train)

# Use the best model from GridSearchCV
best_model = grid_search.best_estimator_

# Evaluate the model
predictions = best_model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Improved Mean Squared Error: {mse}")

# Save the trained model
joblib.dump(best_model, "demand_model.pkl")
