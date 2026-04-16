EV Charging Management System

## Problem Statement

In ESB eCars, there was no centralized system for managing charging station data, and the information was often maintained using Excel files. This made it difficult to manage, update, and track data efficiently across different locations. Therefore, there was a need for a centralized system to store and manage charging station data in a more efficient and reliable way.

 
## Proposed Solution

To address this problem, a web-based EV Charging Management System was developed.

The system provides an internal dashboard where staff can:

- Add new charging stations
- View all station records
- Update existing station details
- Delete stations
- Search and filter stations
- Monitor station status through summary


## System Requirements

- Add new charging stations
- View all stations in a table
- Update station details
- Delete stations with confirmation
- Search stations by name or location
- Filter stations based on status
- Sort table data
- Auto-fill power based on charger type
- Display summary of total, active, inactive, and maintenance stations


## CRUD Operations

- Create: Add a new charging station
- Read: View all station records
- Update: Modify existing station details
- Delete: Remove a station


## Data Requirements and Storage

### Charging Station

Each record contains:
- ID (Primary Key)
- Name
- Location
- Type
- Status
- Power
- Date

### Database

- SQLite is used as the database
- Data is stored in a table called stations


## System Architecture

The system follows a client-server architecture:
- Frontend: HTML, CSS, JavaScript
- Backend: Flask (Python)
- Database: SQLite


## API Endpoints

- GET /stations -> retrieves all stations
- POST /stations -> adds a new station
- PUT /stations/<id> -> updates a station
- DELETE /stations/<id> -> deletes a station


## System Workflow

1. Staff enters data in the frontend dashboard
2. JavaScript collects the input data
3. A request is sent to the backend using the Fetch API
4. The backend receives and processes the request
5. The backend interacts with the SQLite database
6. The database stores or retrieves the data
7. The backend sends a response in JSON format
8. The frontend updates the user interface accordingly


## Technologies Used

Frontend:
- HTML - structure
- CSS - styling
- JavaScript - interaction and API calls

Backend:
- Python - backend development
- Flask - used to build REST APIs
- Flask-CORS - enables communication between frontend and backend

Database:
- SQLite - data storage

API:
- REST API – communication using GET, POST, PUT, DELETE

Testing:
- Python unittest - testing CRUD operations


## Testing

Testing was carried out locally using Python’s unittest framework.

The following were tested:
- Adding a station
- Retrieving stations
- Preventing duplicate entries
- Updating station details
- Deleting a station
- Full flow of operations
  
To run the tests:

cd backend
python test.py

All tests run successfully.
  

## Deployment

The application is deployed on AWS EC2 and can be accessed using the public IP address.

http://54.226.76.176
  

## Project Structure

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
  

## Use of AI and External Resources

This project was developed with the assistance of AI tools.

### AI Usage

AI tools such as ChatGPT and Claude were used during this project to:
- Understand concepts such as REST APIs, CRUD operations, and Flask development
- Assist in generating and structuring parts of the code
- Debug errors and improve implementation
- Guide the development process

### External Resources

- W3Schools - for HTML, CSS, and JavaScript concepts


## Conclusion

This project demonstrates a complete working system with frontend and backend integration, database handling, and testing. It provides a centralized and efficient solution for managing EV charging station data.


  
  

  
