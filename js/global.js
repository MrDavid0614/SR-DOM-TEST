export const tbody = document.querySelector('#tbody');

export const addRowBtn = document.querySelector('.btn-row');
export const newColumnBtn = document.querySelector('.btn-column');

export const modal = document.querySelector('.modal');
export const columnHeader = document.querySelector('#column-header');
export const columnType = document.querySelector('#column-type');
export const submitColumn = document.querySelector('#add-column');
export const close = document.querySelector('.close');


export function isTableFirstRow() {

    return tbody.rows.length === 0;

}

// export function isTableFirstColumn() {
    
//     return tbody.rows.cells === 0;

// }

export function addRow() {

    const row = document.createElement('tr');
    const checkboxCell = document.createElement('td');
    const lastCell = document.createElement('td');
    const input = document.createElement('input');
    const icon = document.createElement('i');

    if(isTableFirstRow()) {

        row.setAttribute('id', 'columns-row');

    }

    input.setAttribute('type', 'checkbox');
    icon.setAttribute('class', 'fas fa-cog');

    checkboxCell.appendChild(input);
    lastCell.appendChild(icon);
    
    row.appendChild(checkboxCell);
    row.appendChild(lastCell);

    if(!isTableFirstRow()) {

        const firstRow = document.querySelector('#columns-row');

        console.log(firstRow.cells.length);

        Array.prototype.forEach.call(firstRow.cells, (column, index) => {

            const cell = document.createElement('td');

            if(index === 0 || index === firstRow.cells.length - 1) {

                return;

            }

            row.insertBefore(cell, row.lastElementChild);

        })

    }

    tbody.appendChild(row);

}

export function addColumn(columnText) {

    const firstRow = document.querySelector('#columns-row');
    const cell = document.createElement('td');

    cell.innerText += columnText;

    firstRow.insertBefore(cell, firstRow.lastElementChild);

}