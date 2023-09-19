import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from GPXRepository import GPXRepository

# Create a Flask application instance
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/create-routes', methods=['POST'])
def create_route():
    try:
        gpxRepository.create_routes()
        return (jsonify({'message': 'Routes created successfully'}), 200)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)

@app.route('/get-routes', methods=['GET'])
def get_route():
    route_data = request.get_json()
    requestedRoutes = gpxRepository.get_routes(route_data['name'], route_data['kfz'], route_data['start_date'], route_data['end_date'], )
    return requestedRoutes

if __name__ == '__main__':
    database = r"./database/fahrtenchronik.db"
    if not os.path.isfile(database): # If it doesn't exist, create the database directory if needed
        db_dir = os.path.dirname(database)
        if not os.path.exists(db_dir):
            os.makedirs(db_dir)
    gpxRepository = GPXRepository(database)
    app.run(debug=True) # Run the Flask application