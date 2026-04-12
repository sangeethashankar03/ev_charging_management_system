EV Charging Management System

Project Overview

This project is a web-based application developed to manage electric vehicle charging stations. It allows users to add, view, update, and delete station details through a simple interface.

The frontend is built using HTML, CSS, and JavaScript, and it communicates with a Flask backend through API calls. The backend stores the data using a SQLite database.

 
Features
	•	Add new charging stations
	•	View all stations in a table
	•	Update station details
	•	Delete stations with confirmation
	•	Search stations by name or location
	•	Filter stations based on status
	•	Sort table columns
	•	Auto-fill power based on charger type
	•	Display summary of total, active, inactive, and maintenance stations


Technologies Used

Frontend:
	•	HTML
	•	CSS
	•	JavaScript

Backend:
	•	Python
	•	Flask
	•	Flask-CORS

Database:
	•	SQLite
  The SQLite database file is created automatically when the application runs.

Testing:
	•	Python unittest


How the System Works

The frontend sends requests to the backend using JavaScript fetch calls. The backend processes these requests, performs operations on the database, and returns the results in JSON format. The frontend then updates the user interface accordingly.


API Endpoints
	•	GET /stations – retrieves all stations
	•	POST /stations – adds a new station
	•	PUT /stations/ – updates a station
	•	DELETE /stations/ – deletes a station


Testing

Testing was carried out locally using Python’s unittest framework.

The following were tested:
	•	Adding a station
	•	Retrieving stations
	•	Preventing duplicate entries
	•	Updating a station
	•	Deleting a station
	•	Full flow of operations
  
  To run the tests:

    cd backend
    python test.py

  All tests run successfully.
  

  Deployment

  The application is deployed on AWS EC2 and can be accessed using the public IP address.

  http://54.226.76.176
  

  Project Structure

  ev_charging_management_system/
  │ 
  ├── backend/
  │   ├── app.py
  │   ├── test.py
  │
  ├── frontend/
  │   ├── index.html
  │   ├── style.css
  │   └── app.js
  │
  └── README.md
  

  Conclusion

  This project demonstrates a complete working system with frontend and backend integration, database handling, and testing. It meets the requirements of the        assignment and shows how a simple full-stack application can be built and deployed.



  
  

  
