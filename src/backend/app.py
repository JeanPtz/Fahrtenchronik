import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from GPXRepository import GPXRepository
from GPXProcessor import GPXProcessor

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/get-route', methods=['GET'])
def get_route():
    try:
        route_data = request.get_json()
        requestedRoutes = gpxRepository.get_routes(route_data['name'], route_data['kfz'], route_data['start_date'], route_data['end_date'], )
        return jsonify(requestedRoutes)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)

@app.route('/license-plates', methods=['GET'])
def get_license_plates():
    try:
        requestedLicensePlates = gpxRepository.get_license_plate()
        return jsonify(requestedLicensePlates)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)

@app.route('/upload-gpx-file', methods=['POST'])
def upload_gpx_file():
    if 'gpxFile' not in request.files:
        return "No file part"
    file = request.files['gpxFile']
    try:
        message = gpxRepository.upload_gpx_file(file)
        gpx_processor.process_gpx_data()
        return jsonify(message)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)

if __name__ == '__main__':
    database = r"./src/backend/database/fahrtenchronik.db"
    if not os.path.isfile(database): # If it doesn't exist, create the database directory if needed
        db_dir = os.path.dirname(database)
        if not os.path.exists(db_dir):
            os.makedirs(db_dir)
    gpxRepository = GPXRepository(database)

    folder_path = r"./src/backend/gpx_files/"
    gpx_processor = GPXProcessor(database, folder_path)
    gpx_processor.process_gpx_data()

    app.run(debug=True)