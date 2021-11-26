Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
            cartUrl: 'cartItems.json',
        }
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            this.$root.cartCounter++;
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.$root.cartCounter++;
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            this.$root.cartCounter--;
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}`, product)
                    .then(data => {
                        if (data.result) {
                            this.$root.cartCounter--;
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },

    mounted() {
        this.$parent.getJson(`/api/cart`).then(data => {
            for (let el of data.contents) {
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
                    <button class="hidden-item__delete-btn" @click="$root.$refs.cart.remove(product)">&#215;</button>
                </div>`
})