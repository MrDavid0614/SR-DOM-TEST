const tbody = document.querySelector('#tbody');

const addRowBtn = document.querySelector('#btn-row');
const newColumnBtn = document.querySelector('#btn-column');
const deleteBtn = document.querySelector('#btn-delete');

const modal = document.querySelector('.modal');
const columnHeader = document.querySelector('#column-header');
const columnType = document.querySelector('#column-type');
const submitColumn = document.querySelector('#add-column');
const closeBtn = document.querySelector('.close');

const contextMenu = document.querySelector('#context-menu');
const optionsPopUp = document.querySelector('#options-popup');

export const global = {

    tbody,
    addRowBtn,
    newColumnBtn,
    deleteBtn,
    modal,
    columnHeader,
    columnType,
    submitColumn,
    closeBtn,
    contextMenu,
    optionsPopUp

}