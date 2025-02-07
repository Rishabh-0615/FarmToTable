import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load the trained model and encoders
model = joblib.load("demand_model.pkl")
vegetable_encoder = joblib.load("vegetable_encoder.pkl")
season_encoder = joblib.load("season_encoder.pkl")
day_type_encoder = joblib.load("day_type_encoder.pkl")

app = Flask(__name__)
CORS(app)

# Helper function for safe encoding
def safe_encode(encoder, value, feature_name):
    if value not in encoder.classes_:
        raise ValueError(f"Invalid value '{value}' for {feature_name}. Expected one of {list(encoder.classes_)}.")
    return encoder.transform([value])[0]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Extract input data
        data = request.json

        # Validate required fields
        required_fields = ["vegetable", "available_quantity", "previous_demand", "price_per_unit", "season", "day_type"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Transform categorical features using the loaded encoders
        vegetable_encoded = safe_encode(vegetable_encoder, data["vegetable"], "vegetable")
        season_encoded = safe_encode(season_encoder, data["season"], "season")
        day_type_encoded = safe_encode(day_type_encoder, data["day_type"], "day_type")

        # Compute the new feature price_demand_ratio
        if data["previous_demand"] == 0:
            return jsonify({"error": "Previous demand cannot be zero for ratio calculation"}), 400

        price_demand_ratio = data["price_per_unit"] / data["previous_demand"]

        # Create a DataFrame for prediction
        features_df = pd.DataFrame([{
            "vegetable": vegetable_encoded,
            "available_quantity": data["available_quantity"],
            "previous_demand": data["previous_demand"],
            "price_per_unit": data["price_per_unit"],
            "season": season_encoded,
            "day_type": day_type_encoded,
            "price_demand_ratio": price_demand_ratio
        }])

        # Make prediction
        prediction = model.predict(features_df)[0]

        # Return the prediction result
        return jsonify({"predicted_demand": round(prediction, 2)})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5001)
