const API_URL = "http://54.226.76.176:5000/stations";

function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alertBox");
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.style.display = "block";
    alertBox.style.color = type === "success" ? "#4caf50" : "#f44336";
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}

window.onload = loadStations;

async function loadStations(){
    let res = await fetch(API_URL);
    let data = await res.json();
    displayStations(data);
}

let currentEditId = null;

async function addStation(){
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let type = document.getElementById("type").value;
    let status = document.getElementById("status").value;
    let power = document.getElementById("power").value;
    let date = document.getElementById("date").value;

    if(!name || !location || !type || !status || !power || !date){
        showAlert("Please fill all fields before adding station", "error");
        return;
    }

    let station = {
        name: name,
        location: location,
        type: type,
        status: status,
        power: power,
        date: date
    };

    if(currentEditId !== null){
    await fetch(`${API_URL}/${currentEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(station)
    });
    showAlert("Station updated successfully");

    currentEditId = null;
    document.getElementById("submitBtn").innerText = "Add Station";
    document.getElementById("submitBtn").classList.remove("update-mode");
    
    clearForm();
    loadStations();
} 

else {
    let res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(station)
    });
    if(res.status === 409){
        showAlert("Station already exists", "error");
        return;
    }
    showAlert("Station added successfully");
    clearForm();
    loadStations();
}

}

function formatDate(dateString){
    let parts = dateString.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function updateSummary(data){
    let total = data.length;
    let active = 0;
    let inactive = 0;
    let maintenance = 0;

    for(let i = 0; i < data.length; i++){
        if(data[i].status === "Active"){
            active++;
        } 
        else if(data[i].status === "Inactive"){
            inactive++;
        } 
        else if(data[i].status === "Maintenance"){
            maintenance++;
        }
    }
    document.getElementById("totalCount").innerText = total;
    document.getElementById("activeCount").innerText = active;
    document.getElementById("inactiveCount").innerText = inactive;
    document.getElementById("maintenanceCount").innerText = maintenance;
}

function displayStations(data){
    let table = document.getElementById("stationsTable");
    table.innerHTML = "";
    if(data.length === 0){
        table.innerHTML = `<tr><td colspan="8">No stations found</td></tr>`;
        updateSummary(data);
        return;
    }

    for(let i = 0; i < data.length; i++){
        let st = data[i];
        let row = `
        <tr>
            <td>${st.id}</td>
            <td>${st.name}</td>
            <td>${st.location}</td>
            <td>${st.type}</td>
            <td>${st.status}</td>
            <td>${st.power}</td>
            <td>${formatDate(st.date)}</td>
            <td>
                <button class="edit-btn" onclick="editStation(${st.id})">Edit</button>
                <button class="delete-btn" onclick="deleteStation(${st.id})">Delete</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    }
    updateSummary(data);
}

async function editStation(id){

    let res = await fetch(`${API_URL}`);
    let data = await res.json();

    let st = data.find(s => s.id === id);
    document.getElementById("name").value = st.name;
    document.getElementById("location").value = st.location;
    document.getElementById("type").value = st.type;
    document.getElementById("status").value = st.status;
    document.getElementById("power").value = st.power;
    document.getElementById("date").value = st.date;

    currentEditId = id;
    document.getElementById("submitBtn").innerText = "Update Station";
    document.getElementById("submitBtn").classList.add("update-mode");
}

let stationToDeleteId = null;

function deleteStation(id){
    stationToDeleteId = id;
    document.getElementById("deleteModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("deleteModal").style.display = "none";
    stationToDeleteId = null;
}

async function confirmDelete(){
    if(stationToDeleteId){
        await fetch(`${API_URL}/${stationToDeleteId}`, {
            method: "DELETE"
        });
        closeModal();
        const deleteAlert = document.getElementById("deleteAlertBox");
        deleteAlert.textContent = "Station deleted successfully";
        deleteAlert.style.display = "block";
        setTimeout(() => {
            deleteAlert.style.display = "none";
        }, 3000);

        loadStations();
    }
}

async function searchStations(){

    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let statusFilter = document.getElementById("filterStatus").value;
    let res = await fetch(API_URL);
    let data = await res.json();
    let filtered = data.filter(st =>
        (st.name.toLowerCase().includes(searchText) ||
        st.location.toLowerCase().includes(searchText)) &&
        (statusFilter === "" || st.status === statusFilter)
    );
    displayStations(filtered);
}

function resetSearch(){
    document.getElementById("searchInput").value = "";
    document.getElementById("filterStatus").value = "";
    loadStations();
}

function clearForm(){
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("type").value = "";
    document.getElementById("status").value = "";
    document.getElementById("power").value = "";
    document.getElementById("date").value = "";
}

function autoFillPower() {
    let type = document.getElementById("type").value;
    let power = document.getElementById("power");
    
    if(type === "Standard") {
        power.value = "22 kW";
    } else if(type === "Fast") {
        power.value = "50 kW";
    } else if(type === "Rapid") {
        power.value = "100 kW";
    } else {
        power.value = "";
    }
}

let sortDirection = 1;
let lastSortedColumn = -1;
function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        let cellA = a.cells[columnIndex].textContent.trim();
        let cellB = b.cells[columnIndex].textContent.trim();
        if (columnIndex === 0 || columnIndex === 5) {
            cellA = parseFloat(cellA) || 0;
            cellB = parseFloat(cellB) || 0;
        }
        if (cellA < cellB) return -1 * sortDirection;
        if (cellA > cellB) return 1 * sortDirection;
        return 0;
    });
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    if (lastSortedColumn !== -1) {
        document.getElementById('icon-' + lastSortedColumn).textContent = '↕';
        document.querySelectorAll('th').forEach(th => th.classList.remove('sorted'));
    }
    const icon = document.getElementById('icon-' + columnIndex);
    icon.textContent = sortDirection === 1 ? '▲' : '▼';
    icon.parentElement.classList.add('sorted');
    lastSortedColumn = columnIndex;
    sortDirection *= -1;
}
