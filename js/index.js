import Table from './Table.js';

const tableContainer = document.querySelector('#table-container');

const table = new Table(tableContainer);

table.addColumn("id");
table.addColumn("name");

table.addRow({
    id: 1,
    cells: [ 
        { text: "Primera columna"},
        { text: "Segunda columna"}
    ]
})