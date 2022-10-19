<template lang="">
    <div>
        <NavBar />
        <TopView />
        <Modal />
        <MiddleView :key="$route.fullPath"/>
        <FooterView />
    </div>
</template>

<style >
    @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
    @import '~/assets/css/app.css';
     .modal-open {
      padding-right: 0 !important;
    }
    html {
        overflow-y: scroll !important;
    }
</style>

<script>
import FooterView from './home/FooterView.vue'
import MiddleView from './home/MiddleView.vue'
import NavBar from './home/NavBar.vue'
import TopView from './home/TopView.vue'
import Modal from './home/Modal.vue'

// import aos from '~/plugins/aos'
// import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
    name: 'home',
    // mixins:[aos],
    components: {
        NavBar,
        TopView,
        MiddleView,
        FooterView,
        Modal
        // Home,
    },
    head () {
        return {
        title: 'APR',
        link: [
            { rel: 'stylesheet', href: '/bootstrap/css/bootstrap.min.css' }
        ],
        script: [
            { src: "/bootstrap/js/bootstrap.min.js", type: "text/javascript"},
            { src: "/bootstrap/umd/popper.min.js", type: "text/javascript"},
        ]

        }
    },
    // created ( ) {
    //     AOS.init()
    //     AOS.refresh()
    // },
    async mounted() {
    const AOS = await import('aos');
    AOS.init();
    }
    // created() { setTimeout(function () { document.querySelectorAll('.aos-animate').forEach(item => { item.classList.remove("aos-animate"); setTimeout( function (){ window.scrollTo(0, 2); },600) }) },50,this) }, beforeRouteLeave (to, from, next) { next(); window.scrollTo(0, 0); document.querySelectorAll('.aos-animate').forEach(item => { item.classList.remove("aos-animate"); }) }, beforeRouteEnter (to, from, next) { next(); window.scrollTo(0, 0); } 
}
</script>
