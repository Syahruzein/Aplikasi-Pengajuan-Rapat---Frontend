<template>
    <div>
        <div v-if="showStaff">
            <h2 class="mt-2">Data Pengajuan Rapat</h2>
            <div>
                <data-pengajuan-sekretaris></data-pengajuan-sekretaris>
            </div>
        </div>
        <div v-if="!showStaff">
            <v-card class="pa-6 mt-4" outlined tile>
                <v-card elevation="3" class="pa-8">
                  <v-alert
                    type="error"
                    prominent
                    border="left"
                  >          
                    <h2>Required role staff !!!.</h2>
                  </v-alert>
                </v-card>
              </v-card>
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
      showStaff(){
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_STAFF')
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