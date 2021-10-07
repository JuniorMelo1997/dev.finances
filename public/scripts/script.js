const addNew = document.querySelector(".button-add-new");
const modal = document.querySelector(".modal-container");
const cancelButton = document.querySelector(".cancel");
const saveButton = document.querySelector(".save");
const invertButton = document.querySelector(".invert");

const trDescription = document.querySelector("#transaction-description");
var trValue = document.querySelector("#transaction-value");
const trDate = document.querySelector("#transaction-date");  

var income = document.querySelector(".income p");
var expense = document.querySelector(".expense p");
var total= document.querySelector(".total p");

const table = document.querySelector(".description table");

/* Setting initial table with values saved in local storage */
window.addEventListener("load", ()=>{
    for (let [keyLS, valueLS] of Object.entries(localStorage)) {
        var row = table.insertRow(1);
        
        var description = row.insertCell(0);
        var value = row.insertCell(1);
        var date = row.insertCell(2);
        var deleteButton = row.insertCell(3);
        
        description.innerHTML = `${keyLS}`;

        newValueLS = valueLS.split(",");
        
        value.innerHTML = `${newValueLS[0]}`;  
        date.innerHTML = formatDate(newValueLS[1]);


        deleteButton.innerHTML = "<a><img src=\"./public/img/delete-button.svg\"></a>";

        deleteButton.addEventListener("click", ()=>{
            row.remove();
            localStorage.removeItem(keyLS);
            calculateBalance();
        })

        description.classList.add("description");
        value.classList.add("value");
        date.classList.add("date");

        calculateBalance();
        
      }
})

/* Starting values */
income.innerHTML = "R$ 0,00";
expense.innerHTML = "R$ 0,00";
total.innerHTML = "R$ 0,00";

/* Inverting the value */
invertButton.addEventListener("click", ()=>{
    if(trValue.value[0] == "-"){
        trValue.value = trValue.value.slice(1);
    }else{
        trValue.value = "-" + trValue.value;
    }
})

/* Working with the modal */
addNew.addEventListener("click", ()=>{
    modal.classList.remove("inactive");
})

cancelButton.addEventListener("click", ()=>{    
    clearInputs();

    modal.classList.add("inactive");
})

saveButton.addEventListener("click", ()=>{   
    
    addNewTransaction();

    calculateBalance();

    clearInputs();

    modal.classList.add("inactive");
})


/* Add new transaction */

function addNewTransaction(){
    localStorage.setItem(trDescription.value, [trValue.value, trDate.value]);

    addNewRow();
}

/* Formating date */

function formatDate(dateToFormat){
    var newTrDate = dateToFormat.split("-");
    
    if(newTrDate.length == 3){
        return newTrDate[2] + "/" + newTrDate[1] + "/" + newTrDate[0];
    } else{
        return "-";
    }
}

/* Add new row in the table */

function addNewRow(){    
    var row = table.insertRow(1);
    
    var description = row.insertCell(0);
    var value = row.insertCell(1);
    var date = row.insertCell(2);
    var deleteButton = row.insertCell(3);
    
    description.innerHTML = trDescription.value
    value.innerHTML = trValue.value;       
    date.innerHTML = formatDate(trDate.value);

    deleteButton.innerHTML = "<a><img src=\"./public/img/delete-button.svg\"></a>";

    deleteButton.addEventListener("click", ()=>{
        row.remove();
        localStorage.removeItem(description.innerHTML);
        calculateBalance();
    })

    description.classList.add("description");
    value.classList.add("value");
    date.classList.add("date");

    return;
}


/* calculating the balance */

function calculateBalance(){
    /* geting the number of rows in the table */
    tableLenght = table.rows.length;

    var resIn = 0;
    var resOut = 0;
    var resTot = 0;
    var i;

    /* the "for" below starts on "i = 1" because i == 0 is the head row of the table */
    for(i=1; i<tableLenght; i++){
        var val = Number(table.rows[i].cells[1].innerHTML);
            
        if(val < 0){
            resOut += val;

            table.rows[i].cells[1].style.color = "#E92929"
        }

        if(val >= 0){
            resIn += val;
        }

        resTot += val;
        
    }

    income.innerHTML = "R$ " + resIn;
    expense.innerHTML = "R$ " + resOut*(-1);
    total.innerHTML = "R$ " + resTot;

    return;
}


/* Cleaning the inputs in the modal forms */
function clearInputs(){
    trDescription.value = "";
    trValue.value = "";
    trDate.value = "";
}
