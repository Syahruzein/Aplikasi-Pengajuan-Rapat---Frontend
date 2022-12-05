<template>
    <div>
        <div v-if="showStaff">
            <h2 class="mt-2">Jadwal Rapat</h2>
    
            <staff-jadwal-rapat-all></staff-jadwal-rapat-all>
            <h2 class="mt-2">Undangan Rapat</h2>
    
            <staff-jadwal-invite-rapat></staff-jadwal-invite-rapat>
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
    import StaffJadwalRapatAll from './components/jadwal/StaffJadwalRapatAll.vue'
    import StaffJadwalInviteRapat from './components/jadwal/StaffJadwalInviteRapat.vue'
export default {
    name: 'Beranda',
    components: {
        StaffJadwalRapatAll,
        StaffJadwalInviteRapat
    },
    computed: {
        currentUser(){
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
