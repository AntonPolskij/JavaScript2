new Vue ({
    el:'#app',
    data: {
        cartCounter: 0,
    },
    methods: {
        getJson(url) {
            return fetch(url)
            .then(result => result.json())
            .catch(()=>this.$refs.error.isError = true)
        },
    },
})