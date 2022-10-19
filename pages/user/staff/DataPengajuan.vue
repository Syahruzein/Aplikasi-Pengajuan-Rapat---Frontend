<template>
    <div>
        <h2 class="mt-2">Data Pengajuan Rapat</h2>
        <div>
            <data-pengajuan-sekretaris></data-pengajuan-sekretaris>
        </div>
    </div>
</template>
<script>
    import DataPengajuanSekretaris from './components/data/DataPengajuanSekretaris.vue'
export default {
    components: {
        DataPengajuanSekretaris,
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