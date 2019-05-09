<template>
    <section class="container">
        <div class="d-flex justify-content-center">
            <div>
                <base-input v-model="nickname" id="username" placeholder="Укажите желаемый никнейм">Никнейм(будет отображатся как ваше имя на сайте)</base-input>
                <base-input type="password" id="password" v-model="newPassword">Новый пароль</base-input>
                <base-input type="password" id="re-password" v-model="rePassword">Повторите пароль</base-input>
                <button type="submit" class="btn btn-primary" @click="save">Сохранить</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "nuxt-property-decorator"
    import { State } from "vuex-class"
    import {User} from "../../types";
    import BaseInput from '../../components/form/BaseInput';

    @Component({
        components: {
            BaseInput
        }
    })
    export default class extends Vue {
        @State(state => state.users.me) user: User

        nicknameTmp: string = ''
        newPassword: string = ''
        rePassword: string = ''

        get nickname() {
            return this.nicknameTmp || this.user && this.user.nickname || ''
        }

        set nickname(value) {
            this.nicknameTmp = value
        }

        save() {

        }
    }
</script>