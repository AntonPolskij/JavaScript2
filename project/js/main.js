class GoodsItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
    }
    render() {
        return `<div class="product-item">
                <img width=200px height=150px>
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class GoodsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
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
    constructor(count) {
        this.countGoods = count;
        this.goods = [];
    }
    addGoods() { };
    render() { };
    changeCountGoods() { };
    removeGoods() { };
    clearCart() { };
}
class CartItem {
    constructor(title, price, count) {
        this.title = title;
        this.price = price;
        this.count = count;
    }
    render() { };
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
goodsList.goodsSum();