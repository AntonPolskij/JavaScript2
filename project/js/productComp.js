Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products">
                    <product-item v-for="item of products" :key="item.id_product" :product="item" :img="img"></product-item>
            </div>`,
});

Vue.component('product-item', {
    props: ['product', 'img'],
    template: `<div class="products-item"> 
                    <img :src="img" alt="Someimg">
                    <div class="decs">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }} $</p>
                        <button class="buy-btn" @click="$parent.$emit('product-add',product)">Купить</button>
                    </div>
               </div>`,
});