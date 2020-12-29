import {global} from './global.js';
import {validator} from './validator.js';

function isTableFirstRow() {

    return global.tbody.rows.length === 0;

}

function addRow() {

    const row = document.createElement('tr');
    const checkboxCell = document.createElement('td');
    const lastCell = document.createElement('td');
    const input = document.createElement('input');
    const icon = document.createElement('i');

    if(isTableFirstRow()) {
        
        row.setAttribute('id', 'columns-row');
        input.setAttribute('id', 'main-checkbox');

        input.onclick = e => {

            const allCheckbox = document.querySelectorAll('input[type = "checkbox"]');

            if(input.checked) {

                allCheckbox.forEach(checkbox => {

                    checkbox.checked = true;
    
                });

            }
            
            if(!input.checked) {

                allCheckbox.forEach(checkbox => {

                    checkbox.checked = false;
    
                })

            }

        }

    }

    input.setAttribute('type', 'checkbox');
    

    checkboxCell.appendChild(input);
    lastCell.appendChild(icon);
    
    row.appendChild(checkboxCell);
    row.appendChild(lastCell);
    // row.draggable = true;

    if(!isTableFirstRow()) {

        icon.setAttribute('class', 'fas fa-cog');

        const firstRow = document.querySelector('#columns-row');

        Array.prototype.forEach.call(firstRow.cells, (column, index) => {

            const cell = document.createElement('td');

            if(index === 0 || index === firstRow.cells.length - 1) {

                return;

            }

            row.insertBefore(cell, row.lastElementChild);

        })

    }

    global.tbody.appendChild(row);

    Array.prototype.forEach.call(global.tbody.rows, row => {

        Array.prototype.forEach.call(row.cells, (rowCell, index) => {

            if(index === 0 || index === row.cells.length - 1) {

                return;

            }
            
            rowCell.ondblclick = e => {

                rowCell.setAttribute('contenteditable', 'true');
                rowCell.setAttribute('spellcheck', 'false');

            }

        })

    })

}

function addColumn(columnText, columnValue) {

    const firstRow = document.querySelector('#columns-row');
    const cell = document.createElement('td');
    cell.setAttribute('data-value', columnValue);

    cell.innerText += columnText;

    firstRow.insertBefore(cell, firstRow.lastElementChild);

    Array.prototype.forEach.call(firstRow.cells, (cell, index) => {

        if(index === 0 || index === firstRow.cells.length - 1) {

            return;

        }

        cell.oncontextmenu = e => {

            console.log(`hola ${cell.outerHTML}`);

        };

        cell.onclick = e => {

            // console.log(cell.outerHTML);

        }

    })

    Array.prototype.forEach.call(global.tbody.rows, (row) => {

        const cell = document.createElement('td');

        if(row === firstRow) {

            return;

        }

        if(firstRow.cells.length > row.cells.length) {

            row.insertBefore(cell, row.lastElementChild);

        }

    })

}

export const table = {

    isTableFirstRow,
    addRow,
    addColumn

}