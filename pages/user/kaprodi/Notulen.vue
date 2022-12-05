<template>
    <div>
        <div v-if="showKaprodi">
            <h2>Notulen Rapat</h2>
            <data-notulen-vue></data-notulen-vue>
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
    import DataNotulenVue from './components/notulen/DataNotulen.vue';

export default {
    name: 'Beranda',
    components: {
        DataNotulenVue
    },
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
