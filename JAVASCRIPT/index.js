
var productsContainerIndex = document.getElementById('productsContainerIndex')
var searchText = document.getElementById('searchText')
searchText.placeholder = 'Cautati produse'
var searchButton = document.getElementById('searchButton')
// var serverData = []




window.onload = changeFooterDisplay(lessThan768)

function renderProducts(data) {
    // console.log(data)


    data.forEach(element => {

        if (element.name.toLowerCase().includes(searchText.value.toLowerCase())) {

            let productBox = document.createElement('div');
            productBox.setAttribute('class', 'products__box')
           

            let priceAndDetails = document.createElement('div') // Created to insert into it the product price and the details so they can be sidebyside
            priceAndDetails.setAttribute('class', 'flexCenter')

            let productImage = document.createElement('img')
            productImage.setAttribute('src', element.imageUrl)
            productImage.addEventListener('click', () => {
                location.href = 'details.html?' + element.id
            })
            let productName = document.createElement('p')
            productName.innerHTML = trimName(element.name, 22, 19)

            let productPrice = document.createElement('p')
            productPrice.innerHTML = element.price + ' $ ';
            let productDetails = document.createElement('input')
            Object.assign(productDetails, {
                type: 'button',
                value: `detalii`,
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

        }


    })

}

sendHTTPRequestGET(renderProducts)


searchButton.addEventListener('click', (e) => {
    if (!event.detail || event.detail === 1) {
        productsContainerIndex.innerHTML = '';
        sendHTTPRequestGET(renderProducts)
    }
})

searchText.addEventListener("keyup", function (event) {

    if (event.key === "Enter") {
       
        if (!event.detail || event.detail === 0) {
            productsContainerIndex.innerHTML = '';
            sendHTTPRequestGET(renderProducts)
            searchText.blur()
        }
    }
})