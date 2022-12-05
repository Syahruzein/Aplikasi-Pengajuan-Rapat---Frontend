<template>
    <div>
        <div v-if="showKadep">
            <h2 class="mt-2">Pengajuan Rapat</h2>
    
            <form-kadep></form-kadep>
        </div>

        <div v-if="!showKadep">
            <v-card class="pa-6 mt-4" outlined tile>
                <v-card elevation="3" class="pa-8">
                  <v-alert
                    type="error"
                    prominent
                    border="left"
                  >          
                    <h2>Required role kadep !!!.</h2>
                  </v-alert>
                </v-card>
            </v-card>
        </div>
    </div>
</template>
<script>
    import FormKadep from './components/pengajuan/Form.vue';
export default {
    name: "Beranda",
    components: {
        FormKadep
    },
    computed: {
        currentUser(){
            return this.$store.state.authentication.user;
        },
        showKadep() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_KADEP')
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
