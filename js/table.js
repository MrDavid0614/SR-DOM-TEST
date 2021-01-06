import {global} from './global.js';
import {isEmail, isUrl} from './validator.js';

const tbody = global.tbody;

function isTableFirstRow(row = {}) {

    if(tbody.rows.length === 0) {

        return true;

    }
    else {

       return row === document.querySelector('#columns-row') ? true : false;

    }

}

function desactivateNewColumnBtn() {

    if (isTableFirstRow()) {

        global.newColumnBtn.disabled = true;
        
    }

}

function deleteSelectedRows() {
    
    const allCheckbox = document.querySelectorAll('input[type="checkbox"]');

        if(document.querySelector('#main-checkbox').checked) {

            if(confirm('Are you sure of you wanna delete all table rows?')) {

                [].forEach.call(tbody.rows, (row, index) => {
                    
                    if(index === 0) return;

                    tbody.removeChild(row);

                })

                tableToJSON(tbody);

            }

        }
        else {

            allCheckbox.forEach((checkbox, index) => {

                if(checkbox.checked) {
    
                    if(confirm(`Are you sure of you wanna delete row ${index + 1}?`)) {

                        tbody.deleteRow(index);
                        tableToJSON(tbody);

                    }
    
                }
    
            })

        }

}

function saveTableInLocalStorage(data) {
    
    localStorage.setItem('table', JSON.stringify(data));

}

function tableToJSON(tbody) {

    const data = [];

    const headers = [];

    const firstRow = tbody.rows[0];

    [].forEach.call(firstRow.cells, (cell, index) => {

        if(index === 0 || index === firstRow.cells.length - 1) {
            
            return;

        }

        headers.push(cell.textContent.trim());

    });

    [].forEach.call(tbody.rows, row => {

        const rowData = {};

        if(isTableFirstRow(row)){
            return;
        }

        [].forEach.call(row.cells, (cell, index) => {
            
            if(index === row.cells.length - 1) {
            
                return;
    
            }

            rowData[ headers[index - 1] ] = cell.textContent.trim();

        })

        delete rowData.undefined;

        data.push(rowData);
    });

    saveTableInLocalStorage(data);

    return data;
}

function renderTableFromLocalStorage() {

    const table = localStorage.getItem('table');
    
    if(table === null || table === undefined) return;

    else if(table.length === 2) return;

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

function validateInput(element) {

    const dataType = element.getAttribute('data-value');

    const text = element.textContent;

    if(dataType === "number") {

        return !isNaN(text) && !isNaN(parseInt(text));

    }
    
    else if(typeof text === dataType) return true;

    else if(dataType === "email") return isEmail(text);

    else if(dataType === "link") return isUrl(text);

    return false;
}

function addRowsBasedOnFirstRow(firstRow, row) {
    
    [].forEach.call(firstRow.cells, (column, index) => {

        const cell = document.createElement('td');
        cell.setAttribute('data-value', column.getAttribute('data-value'));

        if(index === 0 || index === firstRow.cells.length - 1) {

            return;

        }

        row.insertBefore(cell, row.lastElementChild);

    })

}

function addColumnCellsToRows(firstRow, dataValue) {

    [].forEach.call(tbody.rows, row => {

        const cell = document.createElement('td');
        cell.setAttribute('data-value', dataValue);

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

        cell.onclick = e => {

            const element = e.target;
            sortColumn(element, element.getAttribute('data-value'));

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

            rowCell.onkeydown = e => {

                if(e.keyCode === 13) {

                    e.preventDefault();

                    if(e.target.textContent === "") {

                        if(confirm("Do you wanna let empty the cell?")) {

                            rowCell.setAttribute('contenteditable', 'false');
                            tableToJSON(tbody);

                        }

                        if(!validateInput(e.target)) {

                            alert(`The text in cell isn't of type ${e.target.getAttribute('data-value')}, please solve that.`);
    
                        }
                        else {
    
                            rowCell.setAttribute('contenteditable', 'false');
                            tableToJSON(tbody);
    
                        }
    
                        }

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
    console.log(tableToJSON(tbody));
    renderTableFromLocalStorage();
}

function addColumn(columnText, columnValue) {

    const firstRow = document.querySelector('#columns-row');
    const cell = document.createElement('td');
    cell.setAttribute('data-value', columnValue);

    cell.innerText += columnText;

    firstRow.insertBefore(cell, firstRow.lastElementChild);

    addEventsToFirstRowCells(firstRow);

    addColumnCellsToRows(firstRow, columnValue);

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
    addColumn,
    deleteSelectedRows,

}