class Table {

    constructor(containerId) {

        this.containerId = containerId;
        this.table = null;
        this.rows = [];
        this.columns = [];
        this.drawTable();

    }

    drawTable() {

        this.table = document.createElement('table');
        const thead = document.createElement('thead');
        const row = document.createElement('tr');
        row.setAttribute('id', 'columns-row')
        thead.appendChild(row);
        this.table.appendChild(thead);
        this.containerId.appendChild(this.table);
    }

    addColumn(columnName) {

        const columnsRow = document.querySelector('#columns-row');
        const column = document.createElement('td');
        column.innerText = columnName;
        columnsRow.appendChild(column);
        this.columns.push(columnName);
    }

    addRow(rowData) {

        const tbody = document.createElement('tbody');
        const row = document.createElement('tr');

        rowData.cells.forEach(cell => {

            const tableData = document.createElement('td');
            tableData.innerHTML+= cell.text;
            
            row.appendChild(tableData);
        
        });
        

        this.table.appendChild(tbody);
        tbody.appendChild(row);

        this.rows.push(rowData);
    }

}

export default Table;