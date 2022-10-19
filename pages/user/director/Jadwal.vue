<template>
    <div>
        <h2 class="mt-2">Jadwal Rapat</h2>

        <jadwal-rapat></jadwal-rapat>

        <h2 class="mt-2">Undangan Rapat</h2>

        <jadwal-rapat-invite></jadwal-rapat-invite>
        
    </div>
</template>
<script>
    import JadwalRapat from './components/jadwal/JadwalRapat.vue';
    import JadwalRapatInvite from './components/jadwal/JadwalRapatInvite.vue'

export default {
    name: 'Beranda',
    components: {
        JadwalRapat,
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
