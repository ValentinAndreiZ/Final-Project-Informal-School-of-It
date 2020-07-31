var productContainerDetails = document.getElementById('productContainerDetails');
var popUpSpan = document.getElementById('popUpSpan');
var popUpDiv = document.getElementById('popUpDiv');

var baseURL = "https://siit-webshop.firebaseio.com/"
var url = location.href;
var urlId = url.split('?')[1]

//Exista pentru a filtra informatiile de care este nevoie pentru cart

var singleProduct;

var singleProductFetch = new XMLHttpRequest()
singleProductFetch.open('GET', `${baseURL}${urlId}.json`)
singleProductFetch.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var parsedResponse = JSON.parse(singleProductFetch.responseText)
        renderDetails(parsedResponse)
    }
}
singleProductFetch.send()





function renderDetails(product) {

    singleProduct = product;


    let imgContainer = document.createElement('div')
    imgContainer.setAttribute('class', 'product__image')
    let textContainer = document.createElement('div')
    textContainer.setAttribute('class', 'product__text')



    let productImage = document.createElement('img')
    productImage.setAttribute('src', product.imageUrl)

    let productName = document.createElement('h3')
    productName.innerHTML = product.name;
    let productDescription = document.createElement('p')
    productDescription.innerHTML = product.description;
    let productPrice = document.createElement('p')
    productPrice.innerHTML = product.price + ' $';
    let productStock = document.createElement('p');
    productStock.innerHTML = 'In stoc: ' + product.quantity + ' buc';

    let desiredDiv = document.createElement('div')
    let desiredString = document.createElement('p')
    desiredString.innerHTML = 'Cantitate'
    let desiredQuantityInput = document.createElement('input');
    Object.assign(desiredQuantityInput, {
        type: 'number',
        value: 1,
        min: 0

    })
    desiredDiv.appendChild(desiredString)
    desiredDiv.appendChild(desiredQuantityInput)

    let productAdd = document.createElement('input')
    Object.assign(productAdd, {
        type: 'button',
        value: 'adauga in cos',
        name: product.name
    })

    console.log(product.quantity)


    productAdd.addEventListener('click', () => {

        var storageProductQuantity = 0;

        var productsOnStorage = JSON.parse(localStorage.getItem('product'))

        if (productsOnStorage !== null) {
            productsOnStorage.forEach(productOnStorage => {
                if (productOnStorage.id === urlId) {
                    // console.log(productOnStorage.quantity)
                    storageProductQuantity = productOnStorage.quantity
                }
            })
        }
        console.log(product.quantity, +desiredQuantityInput.value, storageProductQuantity)

        if (preventExceedingStock(product.quantity, (+desiredQuantityInput.value) + storageProductQuantity)) {

            productsToLocalStorage(desiredQuantityInput.value);
            showPopUp(popUpDiv, product.name);
            desiredQuantityInput.value = 1;
        } else {

        }

    })

    // console.log(cartProducts)
    imgContainer.appendChild(productImage);

    textContainer.appendChild(productName);
    textContainer.appendChild(productDescription);
    textContainer.appendChild(productPrice);
    textContainer.appendChild(productStock);
    textContainer.appendChild(desiredDiv)
    textContainer.appendChild(productAdd)

    productContainerDetails.appendChild(imgContainer);
    productContainerDetails.appendChild(textContainer);

}

class CartProduct {
    constructor(quantity, id) {
        this.quantity = quantity;
        this.id = id;
    }
}

function productsToLocalStorage(userInputQuantity) {
    var objectToCart = new CartProduct(userInputQuantity * 1, urlId)
    var cartProducts = [];
    cartProducts.push(objectToCart)
    //Urmatoarea conditie evalueaza daca exista deja produse setate pe local storage.
    //Daca nu exista, initializeaza primul produs intr un array care mai apoi este folosit pentru urmatoarele adaugari
    //Am ajuns la aceasta solutie pentru ca aveam nevoie de un array setat in local storage, nu ca variabila globala din cauza de refresh page si stergere info
    var existingProducts = JSON.parse(localStorage.getItem('product'))

    if (existingProducts !== null) {
        var found = false;
        existingProducts.forEach(product => {
            //Daca produsul este gasit, se updateaza doar cantitatea adaugand userInputQuantity
            if (urlId === product.id) { //id
                if (preventExceedingStock(singleProduct.quantity, (+product.quantity) + (+userInputQuantity))) {
                    // alert('Stock limit exceeded')
                    product.quantity = (+product.quantity) + (+userInputQuantity)
                }
                found = true;
            }
        })
        // Daca produsul nu este gasit, conditie care se evalueaza cand se trece prin primul if, in existingProducts array se inserreaza noul produs
        if (found === false) {
            existingProducts.push(objectToCart)
        }
    }
    //Initiaza array cu primul produs creat daca existingProducts nu contine nimic
    else {
        existingProducts = cartProducts;
    }

    localStorage.setItem('product', JSON.stringify(existingProducts))
}

function showPopUp(popUpDiv, popUpName) {
    popUpDiv.style.display = 'block';
    popUpSpan.innerHTML = popUpName;
    setTimeout(function () { hidePopUp(popUpDiv); }, 3000);
}

function hidePopUp(popUpDiv) {
    popUpDiv.style.display = 'none',
        popUpSpan.innerHTML = '';
}

function preventExceedingStock(stocks, desiredQuantity) {
    if (stocks < desiredQuantity) {
        window.alert('Stock exceeded')
        return false
    }
    else {
        return true
    }
}