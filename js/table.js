import {global} from './global.js';
import {validator} from './validator.js';

const tbody = global.tbody;

function isTableFirstRow(row = {}) {

    if(tbody.rows.length === 0) {

        return true;

    }
    else {

       return row === document.querySelector('#columns-row') ? true : false;

    }

}

function desactivateNewColumnBtn () {

    if (isTableFirstRow()) {

        global.newColumnBtn.disabled = true;
        
    }

}

function selectAllRows(row, input) {
        
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

function addRowsBasedOnFirstRow(firstRow, row) {
    
    [].forEach.call(firstRow.cells, (column, index) => {

        const cell = document.createElement('td');

        if(index === 0 || index === firstRow.cells.length - 1) {

            return;

        }

        row.insertBefore(cell, row.lastElementChild);

    })

}

function addColumnCellsToRows(firstRow) {

    [].forEach.call(tbody.rows, row => {

        const cell = document.createElement('td');

        if(row === firstRow) {

            return;

        }

        if(firstRow.cells.length > row.cells.length) {

            row.insertBefore(cell, row.lastElementChild);

        }

    })

}

function addEventsToFirstRowCells(firstRow) {
    
    [].forEach.call(firstRow.cells, (cell, index) => {

        if(index === 0 || index === firstRow.cells.length - 1) {

            return;

        }

        cell.oncontextmenu = e => {

            console.log(`hola ${cell.outerHTML}`);

        };

    })

}

function addEventsToRowCells() {

    [].forEach.call(tbody.rows, row => {

        [].forEach.call(row.cells, (rowCell, index) => {

            if(index === 0 || index === row.cells.length - 1) {

                return;

            }

            if(isTableFirstRow(row)) {

                rowCell.onclick = e => {

                    const element = e.target;
                    sortColumn(element, element.getAttribute('data-value'));

                }

            }

            rowCell.onkeydown = e => {

                if(e.keyCode === 13) {

                    rowCell.setAttribute('contenteditable', 'false');

                }
                

            }
            
            rowCell.ondblclick = e => {

                rowCell.setAttribute('contenteditable', 'true');
                rowCell.setAttribute('spellcheck', 'false');

            }

        })

    })

}

function getIndexOfElement(array, element) {
    
    return [].indexOf.call(array, element);

}

function addRow() {

    const row = document.createElement('tr');
    const checkboxCell = document.createElement('td');
    const lastCell = document.createElement('td');
    const input = document.createElement('input');
    const icon = document.createElement('i');

    if(isTableFirstRow()) { 

        selectAllRows(row, input);

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

        addRowsBasedOnFirstRow(firstRow, row);

    }

    tbody.appendChild(row);

    addEventsToRowCells();

}

function addColumn(columnText, columnValue) {

    const firstRow = document.querySelector('#columns-row');
    const cell = document.createElement('td');
    cell.setAttribute('data-value', columnValue);

    cell.innerText += columnText;

    firstRow.insertBefore(cell, firstRow.lastElementChild);

    addEventsToFirstRowCells(firstRow);

    addColumnCellsToRows(firstRow);

    addEventsToRowCells();

}

function sortColumn(element, dataType) {

    let sortableElements = [];
    let times = 0;

    const elementIndex = getIndexOfElement(document.querySelector('#columns-row').cells, element);

    [].forEach.call(tbody.rows, (row, index) => {

        if(isTableFirstRow(row)) {

            return;

        }

        [].forEach.call(row.cells, (cell, index) => {

            if(index === 0 || index === getIndexOfElement(row.cells, row.lastElementChild)) {

                return;

            }

            if (index === elementIndex) {

                sortableElements.push(cell);

            }

        })

    })

    if(dataType === "number"){

        sortableElements = sortableElements.sort( (a, b) => {

            return parseInt(a.innerText) - parseInt(b.innerText);

        });

    }
    else {

        sortableElements = sortableElements.sort( (a, b) => {

            if (a.innerText.toLowerCase() > b.innerText.toLowerCase()) {
              return 1;
            }

            if (a.innerText.toLowerCase() < b.innerText.toLowerCase()) {
              return -1;
            }

            return 0;
          }

        );

    }

    [].forEach.call(tbody.rows, (row, rowIndex) => {

        if(isTableFirstRow(row)){

            return;

        }

        [].forEach.call(row.cells, (cell, cellIndex) => {

            if (cellIndex === elementIndex) {
                
                row.replaceChild(sortableElements[times], cell);
                times++;
                return;
            }

        })

    })
    
}

export const table = {

    desactivateNewColumnBtn,
    addRow,
    addColumn

}