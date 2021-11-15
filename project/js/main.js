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
                    data-name="${this.title}"
                    data-price="${this.price}">Купить</button>
            </div>`
    }
}
class List {
    constructor(url, container, list = list2) {
        this.url = url;
        this.list = list;
        this.container = container;
        this.goods = [];
        this.allProducts = [];
    }
    fetchGoods(url) {
        return fetch(url ? url : `${API + this.url}`).then(result => result.json()).catch(error => console.log(error));
    }
    handleData(data) {
        this.goods = data;
        this.render;
    }
    render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const goodItem = new this.list[this.constructor.name](good);
            this.allProducts.push(goodItem);
            block.insertAdjacentHTML('beforeend', goodItem.render());
        }
    }
    goodsSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });
        console.log(sum);
    }
    click() { }
}

class GoodsItem extends Item { }

class GoodsList extends List {
    constructor(cart, url = "catalogData.json", container = '.products') {
        super(url, container);
        this.cart = cart;
        this.fetchGoods().then(data => {
            this.goods = data;
            this.render();
        });
        this.click();
    }
    click() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
    }
}

class Cart extends List {
    constructor(url = 'getBasket.json', container = '.cart') {
        super(url, container);
        this.fetchGoods().then(data => {
            this.goods = data.contents;
            this.render();
        });
        this.click();
    }
    addProduct(el) {
        this.fetchGoods(`${API}addToBasket.json`).then(data => {
            if (data.result === 1) {
                let productId = +el.dataset['id'];
                let find = this.allProducts.find(product => product.id_product == productId);
                if (find) {
                    find.count++;
                    this.updateCart(find);
                } else {
                    let product = {
                        id_product: productId,
                        price: +el.dataset['price'],
                        product_name: el.dataset['name'],
                        quantity: 1
                    };
                    this.goods = [product];
                    this.render();
                }
            } else {
                alert('Error');
            }
        })
    };
    removeProduct(el) {
        this.fetchGoods(`${API}addToBasket.json`).then(data => {
            if (data.result === 1) {
                let productId = +el.dataset['id'];
                let find = this.allProducts.find(product => product.id_product == productId);
                if (find.count > 1) {
                    find.count--;
                    this.updateCart(find);
                } else {
                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                }
            } else {
                alert('Error');
            }
        })
    }
    updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.quantity').textContent = `Quantity: ${product.count}`;
        block.querySelector('.price').textContent = `Price: ${product.count * product.price}`;
    }
    click() {
        document.querySelector('.btn-cart').addEventListener('click', () => document.querySelector('.cart').classList.toggle('cart_none'));
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    };
}

class CartItem extends Item {
    constructor(product) {
        super(product);
        this.count = product.quantity;
    }
    render() {
        return `<div class="cart-item" data-id=${this.id_product}>
                <div class="cart-item__info">
                <img width=50px height=50px>
                <h3>${this.title}</h3>
                <p class = "price-for-one">Price:${this.price}&#8381;</p>
                <p class = "quantity" >Quantity:${this.count}<p>
                </div>
                <div><p class = "price">${this.price * this.count}&#8381;</p><button class="del-btn" data-id="${this.id_product}">&times;</button></div>
            </div>`
    };
}

const list2 = {
    GoodsList: GoodsItem,
    Cart: CartItem,
}
const cartList = new Cart();
const goodsList = new GoodsList(cartList);