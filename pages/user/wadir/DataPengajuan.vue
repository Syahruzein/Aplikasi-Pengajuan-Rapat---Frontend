<template>
    <div>
        <h2 class="mt-2">Data Pengajuan Rapat</h2>
        <div>
            <data-pengajuan></data-pengajuan>
        </div>
        <h2 class="mt-2">Data Pengajuan Saya</h2>
        <div>
            <data-pengajuan-wadir></data-pengajuan-wadir>
        </div>
        <h2 class="mt-2">Data Pengajuan Ditolak</h2>
        <data-pengajuan-tolak></data-pengajuan-tolak>
    </div>
</template>
<script>
import DataPengajuan from './components/data/DataPengajuan.vue';
import DataPengajuanWadir from './components/data/DataPengajuanWadir.vue';
import DataPengajuanTolak from './components/data/DataPengajuanTolak.vue';

export default {
    components: {
        DataPengajuan,
        DataPengajuanWadir,
        DataPengajuanTolak
    },
    computed: {
      currentUser() {
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