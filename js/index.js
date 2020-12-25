import Table from './Table.js';

const tbody = document.querySelector('#tbody');
const table = new Table(tbody);

const addRowBtn = document.querySelector('.btn-row');
const newColumnBtn = document.querySelector('.btn-column');

const modal = document.querySelector('.modal');
const columnHeader = document.querySelector('#column-header');
const columnType = document.querySelector('#column-type');
const submitColumn = document.querySelector('#add-column');
const close = document.querySelector('.close');

addRowBtn.addEventListener('click', () => {

    table.addRow();
    newColumnBtn.disabled = false;

})


newColumnBtn.addEventListener('click', () => {

    modal.style.display = "block";

})

submitColumn.addEventListener('click', e => {

    if(columnHeader.value) {
            
        table.addColumn(columnHeader.value);
        modal.style.display = "none"

    }
    else {

        alert("You should put a header before add column.");

    }

})

close.addEventListener('click', () => {

    modal.style.display = "none";

})

window.onclick = e => {

    if(e.target == modal) {

        modal.style.display = "none";

    }

}

if (table.isTableFirstRow()) {

    newColumnBtn.disabled = true;

}


// table.addColumn("id");
// table.addColumn("name");

// table.addRow({
//     id: 1,
//     cells: [ 
//         { text: "Primera columna"},
//         { text: "Segunda columna"}
//     ]
// })