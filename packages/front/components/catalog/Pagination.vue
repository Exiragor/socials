<template>
    <nav v-if="lastPage">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{disabled: currentPage <= 1}">
                <a class="page-link" href="#" @click="changePage(currentPage - 1)">Previous</a>
            </li>
            <li class="page-item" v-if="currentPage - 1 > 1">
                <a class="page-link" href="#" @click="changePage(1)">1</a>
            </li>
            <li class="page-item disabled" v-if="currentPage - 2 > 1">
                <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item" v-for="(page, index) in pages" :key="index" :class="{active: page === currentPage }">
                <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item disabled" v-if="currentPage + 2 < lastPage">
                <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item" v-if="currentPage + 1 < lastPage">
                <a class="page-link" href="#" @click="changePage(lastPage)">{{ lastPage }}</a>
            </li>
            <li class="page-item" :class="{disabled: currentPage >= lastPage}">
                <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";

@Component({})
export default class Pagination extends Vue {
    @Prop() lastPage: number;
    @Prop() currentPage: number;

    get pages(): number[] {
        let page: number = this.currentPage === 1 ? this.currentPage + 1 : this.currentPage;
        page = page === this.lastPage ? page > 2 ? page -1 : page : page;
        let pages: number[] = [];
        for (let i: number = page - 1; i <= page + 1; i++) {
            if (i > this.lastPage)
                break;
            pages.push(i)
        }
        return pages || []
    }

    changePage(page: number) {
        if (page > 0 && page <= this.lastPage)
            this.$emit('input', page)
    }
}
</script>
