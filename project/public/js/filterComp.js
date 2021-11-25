Vue.component('filter-comp', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="search" @submit.prevent="$root.$refs.products.filter(userSearch)">
    <img src="img/search.svg" alt="search"><input type="text" name="search" id="search" v-model="userSearch">
    </form>`
});