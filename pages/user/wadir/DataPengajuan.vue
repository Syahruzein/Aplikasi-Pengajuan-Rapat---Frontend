<template>
    <div v-if="showWadir">
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
        <div v-if="!showWadir">
            <v-card class="pa-6 mt-4" outlined tile>
                <v-card elevation="3" class="pa-8">
                    <v-alert
                    type="error"
                    prominent
                    border="left"
                    >          
                    <h2>Required role wadir !!!.</h2>
                    </v-alert>
                </v-card>
            </v-card>
        </div>
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
      showWadir(){
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_WADIR')
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