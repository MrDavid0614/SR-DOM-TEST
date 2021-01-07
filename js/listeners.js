import {global} from './global.js';
import {table} from './table.js';

export function chargeListeners() {
    
    document.onload = table.renderTableFromLocalStorage();

    global.addRowBtn.addEventListener('click', () => {

        table.addRow();
        global.newColumnBtn.disabled = false;
        global.deleteBtn.disabled = false;
    
    });
    
    global.newColumnBtn.addEventListener('click', showModal);
    
    global.submitColumn.addEventListener('click', createColumn);
    
    global.closeBtn.addEventListener('click', closeModal);

    global.deleteBtn.addEventListener('click', table.deleteSelectedRows)
    
    window.onclick = e => {

        if(e.target === global.modal) {
    
            closeModal();

        }

    };
    
}

function createColumn() {

    if(global.columnHeader.value) {
        
        table.addColumn(global.columnHeader.value, global.columnType.value);
        global.modal.style.display = "none";
        global.columnHeader.value = "";

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