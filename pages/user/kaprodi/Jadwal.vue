<template>
    <div>
        <h2 class="mt-2">Jadwal Rapat</h2>

        <jadwal-rapat-all-vue></jadwal-rapat-all-vue>

        <h2 class="mt-2">Undangan Rapat</h2>

        <jadwal-rapat-invite></jadwal-rapat-invite>
        
    </div>
</template>
<script>
    import JadwalRapatAllVue from './components/jadwal/JadwalRapatAll.vue';
    import JadwalRapatInvite from './components/jadwal/JadwalRapatInvite.vue'

export default {
    name: 'Beranda',
    components: {
        JadwalRapatAllVue,
        JadwalRapatInvite
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
