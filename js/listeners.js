import * as global from './global.js';

export function chargeListeners() {

    global.addRowBtn.addEventListener('click', () => {

        global.addRow();
        global.newColumnBtn.disabled = false;
    
    });
    
    global.newColumnBtn.addEventListener('click', () => {
        
        global.modal.style.display = "block";
    
    });
    
    global.submitColumn.addEventListener('click', e => {
    
        if(global.columnHeader.value) {
            
            global.addColumn(global.columnHeader.value);
            global.modal.style.display = "none"
    
        }
        else {
    
            alert("You should put a header before add column.");
    
        }
    
    });
    
    global.close.addEventListener('click', () => {
    
        global.modal.style.display = "none";
    
    })
    
    window.onclick = e => {
    
        if(e.target === global.modal) {
    
            global.modal.style.display = "none";
    
        }
    
    }
    
}