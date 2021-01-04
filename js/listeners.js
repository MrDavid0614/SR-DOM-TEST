import {global} from './global.js';
import {table} from './table.js';

export function chargeListeners() {

    global.addRowBtn.addEventListener('click', () => {

        table.addRow();
        global.newColumnBtn.disabled = false;
        global.deleteBtn.disabled = false;
    
    });
    
    global.newColumnBtn.addEventListener('click', showModal);
    
    global.submitColumn.addEventListener('click', createColumn);
    
    global.closeBtn.addEventListener('click', closeModal);

    global.deleteBtn.addEventListener('click', deleteSelectedRows)
    
    window.onclick = e => {

        if(e.target === global.modal) {
    
            closeModal();

        }

    };
    
}

function deleteSelectedRows() {
    
    const allCheckbox = document.querySelectorAll('input[type="checkbox"]');

        if(document.querySelector('#main-checkbox').checked) {

            if(confirm('Are you sure of you wanna delete all table rows?')) {

                [].forEach.call(global.tbody.rows, (row, index) => {

                    if(index === 0) {

                        return;

                    }

                    global.tbody.deleteRow(index + 1);

                })

            }

        }
        else {

            allCheckbox.forEach((checkbox, index) => {

                if(checkbox.checked) {
    
                    if(confirm(`Are you sure of you wanna delete row ${index + 1}?`)) {

                        global.tbody.deleteRow(index)

                    }
    
                }
    
            })

        }

}

function createColumn() {

    if(global.columnHeader.value) {
            
        table.addColumn(global.columnHeader.value, global.columnType.value);
        global.modal.style.display = "none"

    }
    else {

        alert("You should put a header before add a column.");

    }

}

function showModal() {
    
    global.modal.style.display = "block";

}

function closeModal() {

    global.modal.style.display = "none";

}