const addNew = document.querySelector(".button-add-new");
const modal = document.querySelector(".modal-container");
const cancelButton = document.querySelector(".cancel");
const saveButton = document.querySelector(".save");

addNew.addEventListener("click", ()=>{
    modal.classList.remove("inactive");
})

cancelButton.addEventListener("click", ()=>{
    modal.classList.add("inactive");
})

saveButton.addEventListener("click", ()=>{
    modal.classList.add("inactive");
})