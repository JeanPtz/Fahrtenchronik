import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from GPXRepository import GPXRepository
from GPXProcessor import GPXProcessor
from AppInteractor import Appinteractor


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/search', methods=['POST'])
def get_route():
    try:
        route_data = request.get_json()
        requestedRoute = appInteractor.get_route_by_search(route_data['name'], route_data['licensePlate'], route_data['startDate'], route_data['endDate'], )
        return jsonify(requestedRoute)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)

@app.route('/license-plates', methods=['GET'])
def get_all_license_plates():
    try:
        requestedLicensePlates = appInteractor.get_all_license_plates()
        return jsonify(requestedLicensePlates)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)
    
@app.route('/names', methods=['GET'])
def get_all_full_names():
    try:
        requestedFullNames = appInteractor.get_all_full_names()
        return jsonify(requestedFullNames)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)
    
@app.route('/license-plate-routes', methods=['POST'])
def get_routes_by_license_plate():
    try:
        license_plate = request.get_json()
        requestedLicensePlates = appInteractor.get_track_ids_by_license_plate(license_plate['licensePlate'])
        return jsonify(requestedLicensePlates)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)
    
@app.route('/track-id-routes', methods=['POST'])
def get_routes_by_track_id():
    try:
        track_id = request.get_json()
        requestedRoute = appInteractor.get_route_by_track_id(track_id['track_id'])
        return jsonify(requestedRoute)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)
    
@app.route('/route-data', methods=['POST'])
def get_table_data_by_track_id():
    try:
        track_id = request.get_json()
        requestedRoute = appInteractor.get_table_data_by_track_id(track_id['track_id'])
        return jsonify(requestedRoute)
    except Exception as e:
        return (jsonify({'error': str(e)}), 500)
    
@app.route('/driver-data', methods=['POST'])
def get_table_data_by_license_plate():
    try:
        track_id = request.get_json()
        requestedRoute = appInteractor.get_table_data_by_track_id(track_id['track_id'])
        return jsonify(requestedRoute)
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
    appInteractor = Appinteractor(database)

    folder_path = r"./src/backend/gpx_files/"
    gpx_processor = GPXProcessor(database, folder_path)
    gpx_processor.process_gpx_data()

    app.run(debug=True)