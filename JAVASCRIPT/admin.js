



//Buttons
var addProductButton = document.getElementById('addProductButton');
var saveButton = document.getElementById('saveButton');
var cancelButton = document.getElementById('cancelButton');

//Buttons

//Text inputs
imageUrlWrite = document.getElementById('imageUrlWrite')
nameWrite = document.getElementById('nameWrite')
descriptionWrite = document.getElementById('descriptionWrite')
priceWrite = document.getElementById('priceWrite')
quantityWrite = document.getElementById('quantityWrite')

//Text inputs

//Areas
var productsContainerAdmin = document.getElementById('productsContainerAdmin');
var addForm = document.getElementById('addForm');
var addOrUpdateString = document.getElementById('addOrUpdateString');
//All products of ADMIN page to be added here 
var tableBody = document.getElementById('tableBody');
//Areas



window.onload = () => {
    sendHTTPRequestGET(renderData)
}

var baseURL = "https://siit-webshop.firebaseio.com/.json"

var serverData = []
var updating = false;
var updatingId;


function renderData(data) {
    tableBody.innerHTML = '';
    data.forEach(product => {
        let row = tableBody.insertRow();
        let imgCell = row.insertCell();
        let nameCell = row.insertCell();
        let priceCell = row.insertCell();
        let quantityCell = row.insertCell();
        let removeCell = row.insertCell();

        let imageElement = document.createElement('img')
        imageElement.setAttribute('src', product.imageUrl)
        imgCell.appendChild(imageElement)

        let editButton = document.createElement('input')
        Object.assign(editButton, {
            type: 'button',
            value: trimName(product.name, 90, 90),
            id: product.id
        })
        editButton.addEventListener('click', (e) => {
            addOrUpdateString.innerHTML = 'Modifica produsul';
            formUpdate(e.target.id)
        })

        nameCell.appendChild(editButton)

        priceCell.innerHTML = product.price + '$';

        quantityCell.innerHTML = product.quantity;

        let removeButton = document.createElement('input')
        Object.assign(removeButton, {
            type: 'button',
            value: 'Remove',
            id: product.id
        })
        removeButton.addEventListener('click', (e) => {
            sendHTTPRequestDELETE(e.target.id);
        })
        removeCell.appendChild(removeButton);
    })
}

function formUpdate(id) {
    addForm.style.display = 'block';
    productsContainerAdmin.style.display = 'none';
    resetBorders()
    updating = true;
    updatingId = id;
    var foundProduct;

    serverData.forEach(product => {
        if (product.id === id) {
            foundProduct = product;
            return;
        }
    })
    imageUrlWrite.value = foundProduct.imageUrl;
    nameWrite.value = foundProduct.name;
    descriptionWrite.value = foundProduct.description;
    priceWrite.value = foundProduct.price;
    quantityWrite.value = foundProduct.quantity;
}


addProductButton.addEventListener('click', (e) => {
    addForm.style.display = 'block';
    productsContainerAdmin.style.display = 'none';
    clearForm()
    resetBorders()
    addOrUpdateString.innerHTML = 'Adauga un produs nou';
});

saveButton.addEventListener('click', (e) => {
    let formUncomplete = forbidEmpty()
    let negativeNumbers = forbidNegative()
    if (formUncomplete === true || negativeNumbers === true) {
        forbidEmpty()
        forbidNegative()
    } else {
        productsContainerAdmin.style.display = 'block';
        addForm.style.display = 'none';
        if (updating === false) {

            var dataToBeSent = new postForm(imageUrlWrite.value, nameWrite.value, descriptionWrite.value, priceWrite.value * 1, quantityWrite.value * 1)
            sendHTTPRequestPOST(dataToBeSent)
        } else {

            var dataToBeSent = new postForm(imageUrlWrite.value, nameWrite.value, descriptionWrite.value, priceWrite.value * 1, quantityWrite.value * 1)
            sendHTTPRequestUPDATE(updatingId, dataToBeSent, renderData)
            updating = false;
        }
    }
});

cancelButton.addEventListener('click', (e) => {
    productsContainerAdmin.style.display = 'block';
    addForm.style.display = 'none';
    updating = false;

    // clearForm();
});

function clearForm() {
    imageUrlWrite.value = '';
    nameWrite.value = '';
    descriptionWrite.value = '';
    priceWrite.value = '';
    quantityWrite.value = '';
}

(function warnEmpty() {
    var arrayOfInputs = document.getElementsByClassName('addForm__container_input')
    for (var i = 0; i < arrayOfInputs.length; i++) {
        let checkElement = arrayOfInputs[i];
        checkElement.addEventListener('input', () => {
            if (checkElement.value === '') {
                checkElement.style.border = '.5px solid red';
            } else {
                checkElement.style.border = '.5px solid black';
            }
        })
    }
}());

function resetBorders() {
    var arrayOfInputs = document.getElementsByClassName('addForm__container_input')
    for (var i = 0; i < arrayOfInputs.length; i++) {
        let checkElement = arrayOfInputs[i];
        checkElement.style.border = '.5px solid black';
    }
}

function forbidEmpty() {
    let isEmpty = false;
    let arrayOfInputs = document.getElementsByClassName('addForm__container_input')

    for (var i = 0; i < arrayOfInputs.length; i++) {
        let checkElement = arrayOfInputs[i];
        if (checkElement.value === '') {
            checkElement.style.border = '.5px solid red';
            isEmpty = true;
        } else {
            checkElement.style.border = '.5px solid black';
        }
    }
    return isEmpty;
}

function forbidNegative() {
    let isNegative = false;
    let arrayOfInputs = document.getElementsByClassName('addForm__container_input')
    let arrayOfTypeNumberInputs = [];

    for (var i = 0; i < arrayOfInputs.length; i++) {
        let checkElement = arrayOfInputs[i];
        if (checkElement.type === 'number') {
            arrayOfTypeNumberInputs.push(checkElement)
        }
    }

    arrayOfTypeNumberInputs.forEach(input => {
        if (input.value < 0) {
            isNegative = true;
            input.style.border = '.5px solid red';
        } else {
            // console.log('good')
        }
    })
    return isNegative
}

forbidNegative()