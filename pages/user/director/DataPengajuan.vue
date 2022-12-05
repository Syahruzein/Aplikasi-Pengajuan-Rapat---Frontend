<template>
    <div>
        <div v-if="showDirector">
            <h2 class="mt-2">Data Pengajuan Rapat</h2>
            <div>
                <data-pengajuan-director></data-pengajuan-director>
            </div>
        </div>
        <div v-if="!showDirector">
            <v-card class="pa-6 mt-4" outlined tile>
                <v-card elevation="3" class="pa-8">
                    <v-alert
                    type="error"
                    prominent
                    border="left"
                    >          
                    <h2>Required role director !!!.</h2>
                    </v-alert>
                </v-card>
            </v-card>
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
      showDirector() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_DIRECTOR');
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