<template>
    <div>
        <h2 class="mt-2">Jadwal Rapat</h2>

        <staff-jadwal-rapat-all></staff-jadwal-rapat-all>
        <h2 class="mt-2">Undangan Rapat</h2>

        <staff-jadwal-invite-rapat></staff-jadwal-invite-rapat>
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
