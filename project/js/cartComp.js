Vue.component ('cart',{
    props: ['visibility','img','cartItems'],
    template: `<div class="cart" v-show="visibility">
                    <cart-item v-for="item of cartItems" :key="item.id_product" :product="item" :img="img"></cart-item>
                </div>`
});

Vue.component ('cart-item', {
    props: ['product','img'],
    template: `<div class="cart-item">
                    <div class="cart-item__info">
                        <img :src="img" alt="Someimg" width="50px">
                        <h3>{{ product.product_name }}</h3>
                        <p class="price-for-one">Price: {{ product.price }} $</p>
                        <p class="quantity">Quantity: {{ product.quantity }}</p>
                    </div>
                    <div>
                        <p class="price">{{ product.price * product.quantity }} $</p><button class="del-btn"
                            @click="$root.removeProduct(product)">&times;</button>
                    </div>
                </div>`
});