class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
        // console.log(this);
    }
}
class Burger {
    constructor(size, add, topings) {
        this.size = new Param(this.select(size));
        this.add = new Param(this.select(add));
        this.topings = this.getToppings(topings);
    }
    select(name) {
        return document.querySelector(`input[name=${name}]:checked`);
    }
    selectAll(name) {
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    }
    getToppings(name) {
        let result = [];
        this.selectAll(name).forEach(element => {
            let obj = new Param(element);
            result.push(obj);
        });
        return result;
    }
    sumPrice() {
        let result = this.size.price + this.add.price;
        this.topings.forEach(el => result += el.price);
        return result;
    }
    sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.topings.forEach(el => result += el.calories);
        return result;
    }
    showSum(price, calories) {
        document.querySelector(price).innerText = this.sumPrice();
        document.querySelector(calories).innerText = this.sumCalories();
    }
}

document.querySelector('#check').addEventListener('click', () => {
    let burger = new Burger('size', 'add', 'topings');
    burger.showSum('#price', '#calories');
})