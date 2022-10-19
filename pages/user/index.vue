<template>
  <div>
    <h2 class="mt-2">Menu</h2>
    <div v-if="showKaprodi">
      <beranda-kaprodi></beranda-kaprodi>
    </div>
    <div v-if="showKadep">
      <beranda-kadep></beranda-kadep>
    </div>
    <div v-if="showWadir">
      <beranda-wadir></beranda-wadir>
    </div>
    <div v-if="showDirector">
      <beranda-director-vue></beranda-director-vue>
    </div>
    <div v-if="showStaff">
      <beranda-staff></beranda-staff>
    </div>
    <div v-if="showAdmin">
      <beranda-admin></beranda-admin>
    </div>
  </div>
</template>

<script>
  import BerandaKaprodi from './kaprodi/BerandaKaprodi.vue';
  import BerandaKadep from './kadep/BerandaKadep.vue';
  import BerandaWadir from './wadir/BerandaWadir.vue';
  import BerandaDirectorVue from './director/BerandaDirector.vue';
  import BerandaStaff from './staff/BerandaStaff.vue';
  import BerandaAdmin from './admin/BerandaAdmin.vue';

export default {
  name: 'index',
  components: {
    BerandaKaprodi,
    BerandaKadep,
    BerandaWadir,
    BerandaDirectorVue,
    BerandaStaff,
    BerandaAdmin,
  },
  computed: {
    currentUser() {
      return this.$store.state.authentication.user;
    },
    showKaprodi() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_KAPRODI')
      }
      
      return false;
    },
    showKadep() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_KADEP')
      }

      return false;
    },
    showWadir(){
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_WADIR')
      }

      return false;
    },
    showDirector() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_DIRECTOR');
      }

      return false;
    },
    showStaff(){
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_STAFF')
      }

      return false;
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
  }
};
</script>