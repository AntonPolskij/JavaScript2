Vue.component ('filtercomp', {
    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter($parent.userSearch)">
                <input type="text" class="search" name="search" id="search" v-model="$parent.userSearch">
                <button type="submit">search</button>
            </form>`
});