


document.addEventListener('DOMContentLoaded', function() 
{
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    //.then(data => loadHTMLTable(data))
    .then(data => loadHTMLTable(data['data']));

});

const formSubmit = document.getElementById("form");
//the delete button doesn't exist in the dom on load so we need to dynamically look for it based on what IS there on load 
document.querySelector('table tbody').addEventListener('click',function(event)
{
    if(event.target.className === "delete-row-btn")
    {
        deleteRowById(event.target.dataset.id);
    }

    if(event.target.className === "edit-row-btn")
    {
        editRowByIdRowById(event.target.dataset.id);
    }


});

function submitBtn()
{
    console.log("clicked button");
    //get the input fields and clear them
    const gameTitleField = document.getElementById("title")
    const GameDescriptionField = document.getElementById("snippet")
    const gameScoreField = document.getElementById("body")

    //get the values of the fields before deletion
    const title = gameTitleField.value
    const description = GameDescriptionField.value
    const score = gameScoreField.value

    gameTitleField.value = "";
    GameDescriptionField.value = "";
    gameScoreField.value = "";
    
    //pass a manual fetch to the backend 
    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ game : title, description: description,score: score})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
   

    
    
    //fetch all the data and send it to the front end 
   
    
    //.then(insertRowIntoTable(title,description,score))
    //.then(data => insertRowIntoTable(data['data']));
    //update the front end 
    
}
//display the contents of the table in real time
function insertRowIntoTable(data)
{

    //console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr onclick = 'sendPage(this)'>";;

    for (var key in data) {
        if (data.hasOwnProperty(key)) 
        {
            if(key === 'game')
            {
                tableHtml += `<td class = 'gameurl'>${data[key]}</td>`;
            }
            else if (key === 'dateAdded') 
            {
                data[key] = new Date(data[key]).toLocaleDateString();
            }
            else
            {
                tableHtml += `<td> ${data[key]}</td>`;
            }
    
        }
    }
    
    tableHtml += `<td><button class="delete-row-btn" data-id=${data['id']}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data['id']}>Edit</td>`;
    
    tableHtml += "</tr>";
    //check if no data is there
    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
    

}
//load the table 
function loadHTMLTable(data)
{
  
    const table = document.querySelector('table tbody') //grab the tbody and add content to it
    let tableHtml = "";
    if(data.length === 0)
    {
        table.innerHTML = "<tr><td class = 'no-data' colspan = '6'>No Data<td></tr>"
        return;
    }
    //build the table 
    for(let i = 0; i < data.length;i++)
    {
       // console.log(data[i]['date_added'])
        tableHtml += "<tr onclick = 'sendPage(this)'>";
        tableHtml += `<td>${data[i]['id']}</td>`;
        tableHtml += `<td class = 'gameurl'  >${data[i]['game']}</td>`;
        tableHtml += `<td>${new Date(data[i]['date_added']).toLocaleDateString()}</td>`;
        tableHtml += `<td>${data[i]['description']}</td>`;
        tableHtml += `<td>${data[i]['score']}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${data[i]['id']}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${data[i]['id']}>Edit</td>`;
        tableHtml += "</tr>";

    }
    table.innerHTML = tableHtml;
    /*
    data.forEach(function ({id, name, date_added}) 
    {
        console.log(name)
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });
    */

}

function deleteRowById(id)
{
    fetch('http://localhost:3000/delete/' + id, 
    {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
   
}
//send a page back to the back end 
function sendPage(id)
{
    //console.log(id.cells[0].innerHTML);
    newId = Number(id.cells[0].innerHTML);
    fetch('http://localhost:3000/games/' + newId, 
    {
        method: 'GET'
    })
    .then(console.log(response.json()))
 
    
}
function editRowById(id)
{

}