const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
class Item {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price
        this.id_product = product.id_product;
    }
    render() {
        return `<div class="product-item" data-id=${this.id_product}>
                <img width=200px height=150px>
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
            </div>`
    }
}

class GoodsItem extends Item { }

class GoodsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.fetchGoods()
            .then(data => {
                this.goods = data;
                this.render();
                this.goodsSum();
            });
    }
    fetchGoods() {
        return fetch(`${API}catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }
    render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const goodItem = new GoodsItem(good);
            block.insertAdjacentHTML('beforeend', goodItem.render())
        };
    }
    goodsSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });
        console.log(sum);
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.goods = [];
        this.clickCart();
        this.fetchItems().then(data => {
            this.goods = data.contents;
            this.render();
        });
    }
    // addGoods() { };
    fetchItems() {
        return fetch(`${API}getBasket.json`).then(result => result.json()).catch(error => console.log(error));
    }
    clickCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => document.querySelector('.cart').classList.toggle('cart_none'));
    }
    render() {
        let cart = document.querySelector('.cart');
        this.goods.forEach(good => {
            const cartItem = new CartItem(good);
            cart.insertAdjacentHTML('beforeend', cartItem.render());
        });
    };
    // changeCountGoods() { };
    // removeGoods() { };
    // clearCart() { };
}
class CartItem extends Item {
    constructor(product) {
        super(product);
        this.count = product.quantity;
    }
    render() {
        return `<div class="cart-item">
                <div class="cart-item__info">
                <img width=50px height=50px>
                <h3>${this.title}</h3>
                <p>Price:${this.price}&#8381;</p>
                <p>Quantity:${this.count}<p>
                </div>
                <div><p>${this.price * this.count}&#8381;</p><button class="del-btn" data-id="${this.id_product}">&times;</button></div>
            </div>`
    };
}

const goodsList = new GoodsList();
const cartList = new Cart();