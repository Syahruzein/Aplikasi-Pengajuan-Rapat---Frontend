<template>
    <div>
        <h2 class="mt-2">Data Pengajuan Rapat</h2>
        <div>
            <data-pengajuan-director></data-pengajuan-director>
        </div>
    </div>
</template>
<script>
    import DataPengajuanDirector from './components/data/DataPengajuanDirector.vue';
export default {
    components: {
        DataPengajuanDirector,
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