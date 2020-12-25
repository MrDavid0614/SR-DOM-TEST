class Table {

    constructor(container) {

        this.container = container;
        this.rows = [];
        this.columns = [];

    }

    addColumn(columnName) {

        const firstRow = document.querySelector('#columns-row');

        const newColumn = firstRow.insertCell();
        newColumn.innerHTML += columnName;
        // insertBefore(newColumn, firstRow.lastElementChild);
        const lastColumn = firstRow.children.length - 2;

        firstRow.children[lastColumn].before(newColumn);

        this.columns.push(newColumn)

    }

    addRow() {

        if(this.isTableFirstColumn()) {

            const firstRow = this.container.insertRow(0);

            firstRow.setAttribute('id', 'columns-row');

            firstRow.insertCell();
            firstRow.insertCell();

            firstRow.children[0].innerHTML += `<td><input type="checkbox" id="checkbox"></td>`;
            firstRow.children[1].innerHTML += `<i class="fas fa-cog"></i>`

            Array.prototype.forEach.call(firstRow.children, cell => {

                this.columns.push(cell);

            })

        }
        else {

            const newRow = this.container.insertRow();

            const lastColumn = this.columns.length - 2;

            this.columns.forEach((column, index) => {

                console.log(column)
                if(index == 0 || index == lastColumn) {
                    
                    newRow.innerHTML += column.outerHTML;
                    return;

                }
                newRow.insertCell();

            })

        }

    }

    isTableFirstRow() {

        if(this.rows.length === 0) {

            return true;
        }
        else {

            return false;

        }

    }

    isTableFirstColumn() {

        if(this.columns.length === 0) {

            return true;

        }
        else {

            return false;

        }

    }

}

export default Table;