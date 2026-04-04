window.onload = loadStations;
function loadStations(){
    const table = document.getElementById("stationsTable");
    table.innerHTML="";
}

let stations = [];
let id = 1;
let currentEditId = null;

function addStation(){
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let type = document.getElementById("type").value;
    let status = document.getElementById("status").value;
    let power = document.getElementById("power").value;
    let date = document.getElementById("last_inspected").value;

    let station = {
        id: id,
        name: name,
        location: location,
        type: type,
        status: status,
        power: power,
        date: date
    };

    if(currentEditId !== null){

    for(let i = 0; i < stations.length; i++){
        if(stations[i].id === currentEditId){
            stations[i] = station;
        }
    }

    currentEditId = null;
    document.querySelector("button").innerText = "Add Station";

} else {
    stations.push(station);
    id++;
}
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("type").value = "";
    document.getElementById("status").value = "";
    document.getElementById("power").value = "";
    document.getElementById("last_inspected").value = "";

    displayStations();

}

function formatDate(dateString){
    let parts = dateString.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function displayStations(){
    let table = document.getElementById("stationsTable");
    table.innerHTML = "";

    for(let i = 0; i < stations.length; i++){

        let st = stations[i];

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
                <button onclick="editStation(${st.id})">Edit</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    }
}

function editStation(id){

    for(let i = 0; i < stations.length; i++){

        if(stations[i].id === id){

            let st = stations[i];

            document.getElementById("name").value = st.name;
            document.getElementById("location").value = st.location;
            document.getElementById("type").value = st.type;
            document.getElementById("status").value = st.status;
            document.getElementById("power").value = st.power;
            document.getElementById("last_inspected").value = st.date;
            currentEditId = id;
            document.querySelector("button").innerText = "Update Station";

            break;
        }
    }
}

function searchStations(){

    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let statusFilter = document.getElementById("filterStatus").value;

    let filteredStations = [];

    for(let i = 0; i < stations.length; i++){

        let st = stations[i];
        let nameMatch = st.name.toLowerCase().includes(searchText);
        let locationMatch = st.location.toLowerCase().includes(searchText);
        let statusMatch = (statusFilter === "" || st.status === statusFilter);

        if((nameMatch || locationMatch) && statusMatch){
            filteredStations.push(st);
        }
    }

    displayFilteredStations(filteredStations);
}

function displayFilteredStations(data){

    let table = document.getElementById("stationsTable");
    table.innerHTML = "";

    if(data.length === 0){
        table.innerHTML = `
        <tr>
            <td colspan="8">No stations found</td>
        </tr>`;
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
            <td>${st.date}</td>
            <td>-</td>
        </tr>
        `;

        table.innerHTML += row;
    }
}