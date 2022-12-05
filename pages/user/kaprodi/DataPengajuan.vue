<template>
    <div>
        <div v-if="showKaprodi">
            <h2 class="mt-2">Data Pengajuan Rapat</h2>
    
            <data-pengajuan-proses></data-pengajuan-proses>
    
            <h2 class="mt-2">Pengajuan Rapat Ditolak</h2>
    
            <data-pengajuan-tolak></data-pengajuan-tolak>
        </div>
        <div v-if="!showKaprodi">
            <v-card class="pa-6 mt-4" outlined tile>
                <v-card elevation="3" class="pa-8">
                  <v-alert
                    type="error"
                    prominent
                    border="left"
                  >          
                    <h2>Required role kaprodi !!!.</h2>
                  </v-alert>
                </v-card>
            </v-card>
        </div>
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
        showKaprodi() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_KAPRODI')
            }
            
            return false;
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
