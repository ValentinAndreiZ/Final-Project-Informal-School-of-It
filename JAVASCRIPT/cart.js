var localStorageProducts = JSON.parse(localStorage.getItem('product'));
// console.log(localStorageProducts)

var tableBody = document.getElementById('tableBody');
var cartContent = document.getElementById('cartContent');
var headerContent = document.getElementById('headerContent');

var noProductsTooltip = document.getElementById('noProductsTooltip')
var purchaseCompleted = document.getElementById('purchaseCompleted')



var productsCount = document.getElementById('productsCount');
var totalDue = document.getElementById('totalDue');
var buyProducts = document.getElementById('buyProducts');
var closePopup = document.getElementById('closePopup');

window.onload = displayTooltip(noProductsTooltip);


closePopup.addEventListener('click', () => {
    purchaseCompleted.style.display = 'none'
    location.href = 'index.html'
})

var productsToBeUpdated = [];

buyProducts.addEventListener('click', () => {
    productsToBeUpdated.forEach(product => {
        var updatedData = new postForm(product.imageUrl, product.name, product.description, product.price, product.stock - product.quantity)
        sendHTTPRequestUPDATE(product.id, updatedData)
    })
    let emptyArr = []

    if (localStorageProducts.length !== 0) {
        purchaseCompleted.style.display = 'flex';
        cartContent.style.display = 'none';
        headerContent.style.display = 'none';
        localStorage.setItem('product', JSON.stringify(emptyArr))
        updateOrder([])
    }
})


sendHTTPRequestGET(defineProducts)


function defineProducts(dataFromServer) {

    if (localStorageProducts.length !== 0) {
        var productsToBeRendered = [];
        dataFromServer.forEach((onServerProduct) => {

            localStorageProducts.forEach((localStoredProduct) => {
                if (onServerProduct.id === localStoredProduct.id) {
                    let productToBeRendered = new ProductToBeRendered(onServerProduct.name, onServerProduct.price, localStoredProduct.quantity, onServerProduct.id, onServerProduct.quantity, onServerProduct.imageUrl, onServerProduct.description)
                    productsToBeRendered.push(productToBeRendered)
                    productsToBeUpdated.push(productToBeRendered)
                }
            })
        })
        renderCart(productsToBeRendered)

    } else {
        tableBody.innerHTML = '';
    }

}

function renderCart(productsToBeRendered) {
    productsToBeRendered.forEach((product) => {

        let row = tableBody.insertRow();

        let nameCell = row.insertCell();
        let priceCell = row.insertCell();
        let quantityCell = row.insertCell();
        let dueCell = row.insertCell();
        let removeCell = row.insertCell();

        let nameButton = document.createElement('input')
        Object.assign(nameButton, {
            type: 'button',
            value: trimName(product.name, 65, 65),
            id: product.id
        })

        nameButton.addEventListener('click', (e) => {
            location.href = `details.html?${product.id}`
        })

        let subtractButton = document.createElement('input')
        Object.assign(subtractButton, {
            type: 'button',
            value: ' - ',
            id: product.id 
        })

        subtractButton.addEventListener('click', (e) => {
            if (product.quantity !== 0) {
                for (var i = 0; i < productsToBeRendered.length; i++) {
                    if (productsToBeRendered[i].id === e.target.id) {
                        tableBody.innerHTML = '';
                        productsToBeRendered[i].quantity -= 1;
                        renderCart(productsToBeRendered)
                        updateOrder(productsToBeRendered)
                    }
                }
                localStorage.setItem('product', JSON.stringify(productsToBeRendered))
            }
        })

        let addButton = document.createElement('input')
        Object.assign(addButton, {
            type: 'button',
            value: ' + ',
            id: product.name
        })

        addButton.addEventListener('click', (e) => {
            for (var i = 0; i < productsToBeRendered.length; i++) {
                if (productsToBeRendered[i].name === e.target.id) {

                    if (productsToBeRendered[i].quantity < productsToBeRendered[i].stock) {
                        tableBody.innerHTML = '';
                        productsToBeRendered[i].quantity += 1;
                        renderCart(productsToBeRendered)
                        updateOrder(productsToBeRendered)
                    } else {
                        alert('Stock limit exceded')
                    }
                }
            }
            localStorage.setItem('product', JSON.stringify(productsToBeRendered))
        })

        let removeButton = document.createElement('input')
        Object.assign(removeButton, {
            type: 'button',
            value: 'Remove',
            // id: product.name
            id: product.id
        })

        removeButton.addEventListener('click', (e) => {

            for (var i = 0; i < productsToBeRendered.length; i++) {
                if (productsToBeRendered[i].id === e.target.id) {
                    tableBody.innerHTML = '';
                    productsToBeRendered.splice(i, 1)
                    renderCart(productsToBeRendered)
                    updateOrder(productsToBeRendered)
                }
            }
            localStorage.setItem('product', JSON.stringify(productsToBeRendered))
            localStorageProducts = JSON.parse(localStorage.getItem('product'))
            displayTooltip(noProductsTooltip);
        })

        nameCell.appendChild(nameButton)
        priceCell.innerHTML = product.price + ' $';
        quantityCell.innerHTML = product.quantity;
        quantityCell.insertBefore(subtractButton, quantityCell.firstChild)
        quantityCell.appendChild(addButton)
        dueCell.innerHTML = product.price * product.quantity + ' $';
        removeCell.appendChild(removeButton)
    })

    productsCount.innerHTML = countProducts(productsToBeRendered);
    totalDue.innerHTML = calculateDue(productsToBeRendered)
}



function updateOrder(products) {
    productsCount.innerHTML = countProducts(products);
    totalDue.innerHTML = calculateDue(products);
}

function calculateDue(products) {
    let totalDue = 0;
    products.forEach((product) => {
        let due = product.price * product.quantity;
        totalDue += due;
    })
    return totalDue + ' $';
}

function countProducts(products) {
    count = 0;
    products.forEach((product) => {
        count++
    })
    return count;
}


function displayTooltip(tooltip) {
    let tableElement = document.getElementsByClassName('cart__table')

    if (localStorageProducts.length === 0) {
        tableElement[0].style.display = 'none';
        tooltip.style.display = 'flex';
    } else {
        tooltip.style.display = 'none'
    }
}
