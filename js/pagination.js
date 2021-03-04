import { global } from './global.js';
const rows = global.tbody.rows;
let pageSlice = [];
let pageIndex = 1;
let pageSize = Number.parseInt(document.querySelector('#pag-options').value);
const previousButton = document.querySelector('#btn-previous');
const nextButton = document.querySelector('#btn-next');
const pageSizeOptions = [5, 10, 15, 20];

previousButton.addEventListener('click', moveToPreviousPage);
nextButton.addEventListener('click', moveToNextPage);

function addOptionsToPagination(element){

    pageSizeOptions.forEach(option =>{

        element.innerHTML += `
                    <option value="${option}">
                        
                        ${option}

                    </option>
                    `;
    });

}

function addPagination(){
    pageSlice = [...tbody.rows].slice(1, 6);
    const firstRow = rows[0];
    global.tbody.innerHTML = "";
    global.tbody.innerHTML = firstRow.outerHTML;
    pageSlice.forEach(row => {
        tbody.innerHTML += row.outerHTML;
    });
    return pageSlice;

}

function moveToPreviousPage(event){

    if(!buttonIsDisabled(previousButton)){

        pageIndex--;
        enableButton(nextButton);
        pageIndex === 1 && disableButton(previousButton);
        console.log(pageIndex);

    }
}

function moveToNextPage(event){
    
    if(!buttonIsDisabled(nextButton)){

        pageIndex++;
        enableButton(previousButton);
        pageIndex === 5 && disableButton(nextButton);
        console.log(pageIndex);

    }

}

function enableButton(button){
    button.setAttribute('disabled', false);
    button.classList.remove('disabled');
}

function disableButton(button) {
    button.setAttribute('disabled', true);
    button.classList.add('disabled');
}

function buttonIsDisabled(button){
    return button.classList.contains('disabled');
}

export const pagination = {

    addOptionsToPagination,
    addPagination,

}