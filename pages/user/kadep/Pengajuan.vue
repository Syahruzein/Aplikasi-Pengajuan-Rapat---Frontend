<template>
    <div>
        <h2 class="mt-2">Pengajuan Rapat</h2>

        <form-kadep></form-kadep>
    </div>
</template>
<script>
    import FormKadep from './components/pengajuan/Form.vue';
export default {
    name: "Beranda",
    components: {
        FormKadep
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
