Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
            cartUrl: 'cartItems.json',
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                find.quantity++;
                this.$root.cartCounter++;
            } else {
                this.$root.cartCounter++;
                const prod = Object.assign({ quantity: 1 }, product);
                this.cartItems.push(prod);
            }
        },
        deleteProduct(product) {
            if (product.quantity > 1) {
                this.$root.cartCounter--;
                product.quantity--;
            } else {
                this.$root.cartCounter--;
                this.cartItems.splice(this.cartItems.indexOf(product), 1);
            }
        },
    },
    mounted() {
        this.$parent.getJson(`${this.cartUrl}`).then(data => {
            for (let el of data) {
                this.cartItems.push(el);
            };
            for (item of this.cartItems) {
                this.$root.cartCounter += item.quantity;
            };
        })
    },
    template: `<div v-show="showCart" class="cart-hidden"> 
                    <cart-item v-for="item of cartItems" :product="item" :key="item.id_product">
                    </cart-item>
               </div>`
});

Vue.component('cart-item', {
    props: ['product'],
    template: `<div class="cart-hidden__item hidden-item">
                    <div class="hidden-item__wrap">
                    <img :src="('img/' + product.id_product + '.png')" width="100px" height="100px">
                    <div class=hidden-item__info>
                    <p class="hidden-item__name">Title: {{ product.product_name }}</p>
                    <p class="hidden-item__price">Price: {{ product.price * product.quantity }} $</p>
                    <p class="hidden-item__quantity">Quantity: {{product.quantity}}</p>
                    </div>
                    </div>
                    <button class="hidden-item__delete-btn" @click="$root.$refs.cart.deleteProduct(product)">&#215;</button>
                </div>`
})