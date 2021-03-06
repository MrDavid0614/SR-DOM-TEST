import {global} from './global.js';
import {pagination} from './pagination.js';
import {isEmail, isUrl} from './validator.js';

const tbody = global.tbody;
pagination.addOptionsToPagination(global.selectOptions);

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

function elementAppendChildren(element, children) {

    children.forEach(child => {

        element.appendChild(child);

    })

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
            
            if(index === 0 || index === row.cells.length - 1) {
            
                return;
    
            }

            const objectOfData = { text: cell.textContent, type: cell.getAttribute('data-value')};

            rowData[ headers[index - 1] ] = objectOfData;

        })

        delete rowData.undefined;

        data.push(rowData);
    });

    saveTableInLocalStorage(data);

    return data;
}

function renderTableFromLocalStorage() {

    const table = JSON.parse(localStorage.getItem('table'));

    if(table === null || table === undefined) return;

    else if(table.length === 0) return;

    const rowElement = document.createElement('tr');
    const firstCell = document.createElement('td');
    const lastCell = document.createElement('td');
    const mainCheckbox = document.createElement('input');
    mainCheckbox.setAttribute('type', 'checkbox');

    firstCell.appendChild(mainCheckbox);
    elementAppendChildren(rowElement, [firstCell, lastCell]);
    

    if(isTableFirstRow()) {

        rowElement.id = "columns-row";
        Object.getOwnPropertyNames(table[0]).forEach(property => {

            const td = document.createElement('td');

            td.textContent = property;
            td.setAttribute('data-value', table[0][property].type);

            rowElement.insertBefore(td, lastCell);
        })

        tbody.appendChild(rowElement);
        selectAllRows(mainCheckbox);
    }

    const rows = table.map(data => {
        
        const row = document.createElement('tr');
        row.innerHTML += `<tr>

            <td><input type="checkbox"></input></td>
            ${
                Object.keys(data).map(property => {

                    return `<td data-value="${data[property].type}">${data[property].text}</td>`

                }).join("")
            }
            <td><i class="fas fa-cog"></i></td>
        </tr>`

        return row;
    })

    rows.forEach(row => {
        addEventsToRowCells();
        tbody.insertAdjacentHTML('beforeend', row.innerHTML);
    });

    addEventsToFirstRowCells(document.querySelector('#columns-row'));
    addEventsToRowCells();
    global.deleteBtn.disabled = false;
    console.log(pagination.addPagination())
}

function selectAllRows(input) {

    input.id = "main-checkbox";

    input.onclick = function(){

        const allCheckbox = document.querySelectorAll('input[type = "checkbox"]');

        if(input.checked) {
            allCheckbox.forEach(checkbox => {

                checkbox.checked = true;
    
            });
        
        }
        else {

            allCheckbox.forEach(checkbox => {

                checkbox.checked = false;
    
            });

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
            sortColumn(element);

        }

        cell.oncontextmenu = e => {
            e.preventDefault();
            openContextMenu(e);

        };
        
    })
    
}

function addEventsToRowCells() {

    [].forEach.call(tbody.rows, row => {

        if(row !== tbody.rows[0])
            row.draggable = true;

        [].forEach.call(row.cells, (rowCell, index) => {

            if(index === 0) {

                return;

            }

            if(index === row.cells.length - 1) {

                rowCell.onclick = e => {

                    if(e.target.className === "fas fa-cog")
                        openOptionsPopUp(e);

                }
                return;
            }
            

            rowCell.onkeydown = e => {

                if(e.keyCode === 13) {

                    e.preventDefault();

                    if(e.target.textContent === "") {

                        if(confirm("Do you wanna let empty the cell?")) {

                            rowCell.setAttribute('contenteditable', 'false');
                            tableToJSON(tbody);

                            console.log("El texto está vacío");

                        }
    
                    }
                    else {

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

            if(rowCell.getAttribute('data-value') === "email") {
                rowCell.onclick = e => {
                    
                    if(window.event.ctrlKey) {

                        window.open(`mailto:${rowCell.textContent}`);

                    }

                }
            }

        })

    })

    addDragEventsToRowCells();

}

function addRow() {

    const row = document.createElement('tr');
    const checkboxCell = document.createElement('td');
    const lastCell = document.createElement('td');
    const input = document.createElement('input');
    const icon = document.createElement('i');
    
    row.draggable = true;

    if(isTableFirstRow()) { 
        row.id = "columns-row"
        selectAllRows(input);

    }

    input.setAttribute('type', 'checkbox');

    checkboxCell.appendChild(input);
    lastCell.appendChild(icon);
    
    row.appendChild(checkboxCell);
    row.appendChild(lastCell);

    if(!isTableFirstRow()) {

        icon.setAttribute('class', 'fas fa-cog');

        const firstRow = document.querySelector('#columns-row');

        addRowsBasedOnFirstRow(firstRow, row);

    }

    tbody.appendChild(row);

    addEventsToRowCells();
    saveTableInLocalStorage(tableToJSON(tbody));
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

    saveTableInLocalStorage(tableToJSON(tbody));

}

function sortColumn(element) {
    
    let infoBeforeSort = Array.from(JSON.parse(localStorage.getItem('table')));

    let sortedArray = [];
    if(element.getAttribute('data-value') === "number"){
        sortedArray = [...infoBeforeSort].sort((a, b) => a[element.textContent].text - b[element.textContent].text);
    }    
    else {
        sortedArray = [...infoBeforeSort].sort((a, b) => a[element.textContent].text > b[element.textContent].text ? 1 : -1);
    }

    localStorage.setItem('table', JSON.stringify(sortedArray));

    tbody.innerHTML = "";
    renderTableFromLocalStorage();
}

function openContextMenu(event) {

    drawContextMenu(event.clientX, event.clientY);
    window.addEventListener('click', closeContextMenu);
   
    function drawContextMenu(positionX, positionY) {
        
        global.contextMenu.style.display = "flex";
        global.contextMenu.style.left = `${positionX + 10}px`;
        global.contextMenu.style.top = `${positionY}px`;

    }

    document.querySelector('#btn-delete-column').onclick = (e)=> {
        e.preventDefault();
        deleteColumn(event);
    };

}

function closeContextMenu() {

    global.contextMenu.style.display = "none";
    window.removeEventListener('click', closeContextMenu);
}

function deleteColumn(event) {
    event.preventDefault();
    const info = JSON.parse(localStorage.getItem('table'));
    const arrayOfInfo = Array.from(info);

    arrayOfInfo.forEach(data => {

        delete data[event.target.textContent];

    })
    
    saveTableInLocalStorage(arrayOfInfo);
    tbody.innerHTML = "";
    renderTableFromLocalStorage();

}

function openOptionsPopUp(event) {

    drawOptionsPopUp(event.clientX, event.clientY);
    window.onclick = e => {

        if(e.target.className !== "fas fa-cog" && e.target.id !== "options-popup")
            closeOptionsPopUp();

    }
    addEventsToOptions()

    function drawOptionsPopUp(positionX, positionY) {
        global.optionsPopUp.style.display = "flex";
        global.optionsPopUp.style.left = `${positionX + 10}px`;
        global.optionsPopUp.style.top = `${positionY}px`;
    }

    function addEventsToOptions() {
        
        global.optionsPopUp.onclick = (e) => {

            switch (e.target.id) {

                case "btn-edit":
                    optionEdit();
                    break;
                
                case "btn-copy-json":
                    optionCopyJSON();
                    break;

                case "btn-copy-csv":
                    optionCopyCSV();
                    break;
            }
            
        }

    }

    function optionEdit() {

        const row = event.target.parentElement.parentElement;
        const cells = Array.from(row.cells);
        
        cells.forEach((cell, index) => {

            if(index === 0 || index === cells.length - 1)
                return;

            cell.setAttribute('contenteditable', 'true');

        });
        alert("Your row content is now editable");

    }

    function optionCopyJSON() {
        
        const firstRow = document.querySelector('#columns-row');
        const firstRowCells = Array.from(firstRow.cells);
        const row = event.target.parentElement.parentElement;
        const rowCells = Array.from(row.cells);
        const rowToJson = {};
        
        firstRowCells.forEach((cell, index) => {

            if(index === 0 || index === firstRowCells.length - 1)
                return;
            
            rowToJson[cell.textContent] = rowCells[index].textContent;

        });

        navigator.clipboard.writeText(JSON.stringify(rowToJson))
        .then(() => alert("Your row content in JSON format is now in your clipboard"));

    }

    function optionCopyCSV() {

        const row = event.target.parentElement.parentElement;
        const rowCells = Array.from(row.cells);
        const rowInfo = [];
        
        rowCells.forEach((cell, index) => {

            if(index === 0 || index === rowCells.length - 1)
                return;
            
            rowInfo.push(cell.textContent);

        });

        navigator.clipboard.writeText(rowInfo.join(", "))
        .then(() => alert("Your row content in CSV format is now in your clipboard"));
    }

}

function closeOptionsPopUp() {
    global.optionsPopUp.style.display = "none";
    document.removeEventListener('click', closeOptionsPopUp);
}

tbody.addEventListener('dragover', dragOver);

function addDragEventsToRowCells() {
    
    const rows = Array.from(tbody.rows);

    rows.forEach((row, index)=> {

        if(index === 0)
            return;

        row.classList.add('draggable');
        row.ondragstart = dragStart;
        row.ondragend = dragEnd;
    });
}

function dragStart(event) {
    event.target.classList.add("dragging");
    event.dataTransfer.setData('text', event.target);

}

function dragEnd(event) {
    event.target.classList.remove("dragging");

}

function dragOver(event) {

    event.preventDefault();
    const draggable = tbody.querySelector('.dragging');
    const afterElement = getDragAfterElement(event.clientY);

    if(afterElement === null) {
        tbody.appendChild(draggable);
    }
    else {
        tbody.insertBefore(draggable, afterElement);
    }

    function getDragAfterElement(y) {
        const draggableElements = [...tbody.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest, child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if(offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            }
            else {

                return closest;

            }

        }, {offset: Number.NEGATIVE_INFINITY}).element;
    }

    saveTableInLocalStorage(tableToJSON(tbody));
}

export const table = {

    renderTableFromLocalStorage,
    desactivateNewColumnBtn,
    addRow,
    addColumn,
    deleteSelectedRows,

}