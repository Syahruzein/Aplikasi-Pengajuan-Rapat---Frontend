<template>
    <div>
        <h2 class="mt-2">Data Pengajuan Rapat</h2>

        <data-pengajuan-proses></data-pengajuan-proses>

        <h2 class="mt-2">Pengajuan Rapat Ditolak</h2>

        <data-pengajuan-tolak></data-pengajuan-tolak>
    </div>
</template>
<script>
    import DataPengajuanProses from './components/data/DataPengajuanProses.vue';
    import DataPengajuanTolak from './components/data/DataPengajuanTolak.vue';
export default {
    name: "Beranda",
    components: { DataPengajuanProses, DataPengajuanTolak },
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
