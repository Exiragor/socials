import VueDef from 'vue'
import VueRouter, { Route } from 'vue-router'

declare module '*.vue' {
  const _default: VueDef
  export default _default
}

declare module 'vue/types/vue' {
    interface Vue {
        $route: Route
        $router: VueRouter
        $bus: VueDef
    }
}