# Fahrtenchronik
Fahrtenchronik is a web application designed to scan and display GPX files on an interactive map. The app requires GPX files to follow a specific naming scheme to be recognized correctly.

---

## Features
- **Upload GPX Files**: Easily upload and view your travel routes on a map.
- **Interactive Map**: Visually inspect your uploaded routes.

---

## GPX File Naming Scheme

To ensure proper recognition, GPX files must follow this naming format:

```
firstName-LastName_licenseplate_ddMMyy.gpx
```

**Example:**
```
Max-Mustermann_B-MM1111_010199.gpx
```

---

## Requirements

### Backend
- **Python**: Ensure Python is installed on your system.
- **Required Python Libraries**:
  - `flask`
  - `flask_cors`

### Frontend
- **Node.js and npm**: Required for frontend development and running the app.

---

## Setup Instructions

### Backend
1. Install Python on your system if not already installed.
2. Install the required libraries using pip:
   ```bash
   pip install flask flask_cors
   ```
3. Run the backend:
   ```bash
   python app.py
   ```
   - If the database is not created automatically, manually create it:
     1. Inside the `backend` folder, create a directory named `database`.
     2. Inside `database`, create a file named `fahrtenchronik.db`.

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd src/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```

### Important
- Always start the **backend** before starting the **frontend**.

---

## Usage
1. Launch the backend server by running `app.py`.
2. Start the frontend using `npm start`.
3. Open your web browser and navigate to the provided localhost URL.
4. Upload GPX files adhering to the required naming scheme to visualize them on the map.

---

## Troubleshooting

- **Database Errors**: 
  - Ensure the `fahrtenchronik.db` file exists in the correct directory (`src/backend/database`).
  - Confirm the `app.py` script has write permissions in the backend folder.

- **Dependency Issues**:
  - Ensure all required libraries are installed correctly using `pip` and `npm`.
  - Verify Python and Node.js versions are compatible with the project.

- **App Not Loading**:
  - Double-check that the backend is running before starting the frontend.

--- 

Enjoy using Fahrtenchronik to explore your GPX routes! 🚗
