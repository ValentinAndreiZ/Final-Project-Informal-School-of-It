
var productsContainerIndex = document.getElementById('productsContainerIndex')

// var serverData = []

window.onload = changeFooterDisplay(lessThan768)

function renderProducts(data) {
    // console.log(data)
    data.forEach(element => {
        let productBox = document.createElement('div');
        productBox.setAttribute('class', 'products__box')
        productBox.addEventListener('click', ()=> {
            location.href = 'details.html?' + element.id
        })

        let priceAndDetails = document.createElement('div') // Created to insert into it the product price and the details so they can be sidebyside
        priceAndDetails.setAttribute('class', 'flexCenter')

        let productImage = document.createElement('img')
        productImage.setAttribute('src', element.imageUrl)
        let productName = document.createElement('p')
        productName.innerHTML = trimName(element.name, 22, 19)
      
        let productPrice = document.createElement('p')
        productPrice.innerHTML = element.price + ' $ ';
        let productDetails = document.createElement('input')
        Object.assign(productDetails, {
            type: 'button',
            value: 'detalii',
        })
        productDetails.addEventListener('click', () => {
            location.href = 'details.html?' + element.id
        })

        priceAndDetails.appendChild(productPrice)
        priceAndDetails.appendChild(productDetails)

        productBox.appendChild(productImage)
        productBox.appendChild(productName)
        productBox.appendChild(priceAndDetails)

        productsContainerIndex.appendChild(productBox)
    })

}

sendHTTPRequestGET(renderProducts)