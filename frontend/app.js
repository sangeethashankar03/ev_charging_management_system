window.onload = loadStations;
function loadStations(){
    const table = document.getElementById("stationsTable");
    table.innerHTML="";
}

let stations = [];
let id = 1;

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

    stations.push(station);
    id++;

    displayStations();
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
            <td>${st.date}</td>
            <td>-</td>
        </tr>
        `;

        table.innerHTML += row;
    }
}