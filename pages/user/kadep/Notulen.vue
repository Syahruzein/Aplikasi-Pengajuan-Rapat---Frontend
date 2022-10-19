<template>
    <div>
        <h2>Notulen Rapat</h2>
        <data-notulen-vue></data-notulen-vue>
    </div>
</template>
<script>
    import DataNotulenVue from './components/notulen/DataNotulen.vue';

export default {
    name: 'Beranda',
    components: {
        DataNotulenVue
    },
    computed: {
        currentUser(){
            return this.$store.state.authentication.user;
        },
    },
    mounted() {
        if (!this.currentUser) {
        this.$router.push('/');
        }
    },
}
</script>
<style>
    
</style>
