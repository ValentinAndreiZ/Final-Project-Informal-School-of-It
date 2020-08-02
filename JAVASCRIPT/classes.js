class postForm {
    constructor(imageUrl, name, description, price, quantity) { //quant

        this.imageUrl = imageUrl,
            this.name = name,
            this.description = description,
            this.price = price,
            this.quantity = quantity // quant
    }
}


class ProductToBeRendered {
    constructor(name, price, quantity, id, stock, imageUrl, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.description = description;
    }
}