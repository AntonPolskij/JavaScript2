Vue.component ('error', {
    data() {
        return {
            isError: false,
        }
    },
    template: `<div class="error" v-show="isError"><h1>Ошибка загрузки данных</h1></div>`
})