<template>
    <div>
        <div v-if="showWadir">
            <h2 class="mt-2">Jadwal Rapat</h2>
    
            <jadwal-rapat></jadwal-rapat>
    
            <h2 class="mt-2">Undangan Rapat</h2>
    
            <jadwal-rapat-invite></jadwal-rapat-invite>
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
    import JadwalRapat from './components/jadwal/JadwalRapat.vue';
    import JadwalRapatInvite from './components/jadwal/JadwalRapatInvite.vue'

export default {
    name: 'Beranda',
    components: {
        JadwalRapat,
        JadwalRapatInvite
    },
    computed: {
        currentUser(){
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
