import Vue from 'vue'

const eventBus: any = {}

eventBus.install = Vue => {
    Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)