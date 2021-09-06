const addNew = document.querySelector(".button-add-new");
const modal = document.querySelector(".modal-container");
const cancelButton = document.querySelector(".cancel");
const saveButton = document.querySelector(".save");

const trDescription = document.querySelector("#transaction-description");
const trValue = document.querySelector("#transaction-value");
const trDate = document.querySelector("#transaction-date");  

var income = document.querySelector(".income p");
var expense = document.querySelector(".expense p");
var total= document.querySelector(".total p");

const table = document.querySelector(".description table");

/* Starting values */
income.innerHTML = "R$ 0,00";
expense.innerHTML = "R$ 0,00";
total.innerHTML = "R$ 0,00";

/* Working with the modal */
addNew.addEventListener("click", ()=>{
    modal.classList.remove("inactive");
})

cancelButton.addEventListener("click", ()=>{    
    clearInputs();

    modal.classList.add("inactive");
})

saveButton.addEventListener("click", ()=>{    
    addNewRow();

    calculateBalance();

    clearInputs();

    modal.classList.add("inactive");
})


/* Formating date */

function formatDate(){
    var newTrDate = trDate.value.split("-");

    return newTrDate[2] + "/" + newTrDate[1] + "/" + newTrDate[0];
}

/* Add new row in the table */

function addNewRow(){    
    var row = table.insertRow(1);
    
    var description = row.insertCell(0);
    var value = row.insertCell(1);
    var date = row.insertCell(2);
    
    description.innerHTML = trDescription.value;
    value.innerHTML = trValue.value;
    date.innerHTML = formatDate();

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
