<template>
    <div>
        <div v-if="showAdmin">
            <h2 class="mt-2">Data Pengguna</h2>
            <data-akun></data-akun>
        </div>
        <div v-if="!showAdmin">
            <v-card class="pa-6 mt-4" outlined tile>
                <v-card elevation="3" class="pa-8">
                    <v-alert
                    type="error"
                    prominent
                    border="left"
                    >          
                    <h2>Required role admin !!!.</h2>
                    </v-alert>
                </v-card>
            </v-card>
        </div>
    </div>
</template>
<script>
import DataAkun from './components/data/DataAkun.vue'
export default {
    components:{
        DataAkun
    },
    computed: {
        currentUser() {
            return this.$store.state.authentication.user;
        },
        showAdmin() {
            if (this.currentUser && this.currentUser.roles) {
            return this.currentUser.roles.includes('ROLE_ADMIN');
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