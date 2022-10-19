<template>
  <v-app primary>
    <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->
    <!-- color="bg-gradient-info" -->
    <!-- dark -->
    <v-navigation-drawer
    v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      width="20rem"
      >
      <!-- class="borderRight" -->
      <div v-if="showKaprodiDrawer">
        <v-list>
          <v-list-item
            v-for="(item, i) in itemskaprodi"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="showKadepDrawer">
        <v-list>
          <v-list-item
            v-for="(item, i) in itemskadep"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="showWadirDrawer">
        <v-list>
          <v-list-item
            v-for="(item, i) in itemswadir"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="showDirectorDrawer">
        <v-list>
          <v-list-item
            v-for="(item, i) in itemsdir"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="showStaffDrawer">
        <v-list>
          <v-list-item
            v-for="(item, i) in itemsstaff"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="showAdminDrawer">
        <v-list>
          <div 
          v-for="(item, i) in itemsadmin"
          :key="i"
          >
            <v-list-item
              v-if="!item.subLinks"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              v-else
              :key="item.title"
              no-action
              :prepend-icon="item.icon"
              :value="false"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </template>
              <v-list-item
              v-for="sublink in item.subLinks"
              :to="sublink.to"
              :key="sublink.title"
              >
                <!-- <v-list-item-action>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-item-action> -->
                <v-list-item-content>
                  <v-list-item-title v-text="sublink.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <img src="~/assets/img/logo/apr.svg" 
                class="float-left pr-2" alt="..."
                />
                <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="logOut">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      class="justify-end"
    >
      <span class="text--secondary">Website Pengajuan Rapat PENS &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      itemskaprodi: [
        {
          icon: 'mdi-home',
          title: 'Beranda',
          to: '/user'
          },
          {
          icon: 'mdi-receipt-text-plus',
          title: 'Pengajuan Rapat',
          to: '/user/kaprodi/Pengajuan'
          },
          {
          icon: 'mdi-database',
          title: 'Data Pengajuan',
          to: '/user/kaprodi/DataPengajuan'
          },
          {
          icon: 'mdi-calendar-month',
          title: 'Jadwal Rapat',
          to: '/user/kaprodi/Jadwal'
          },
          {
          icon: 'mdi-note-text',
          title: 'Notulen Rapat',
          to: '/user/kaprodi/Notulen'
          },
      ],

      itemskadep: [
        {
          icon: 'mdi-home',
          title: 'Beranda',
          to: '/user'
          },
          {
          icon: 'mdi-receipt-text-plus',
          title: 'Pengajuan Rapat',
          to: '/user/kadep/Pengajuan'
          },
          {
          icon: 'mdi-database',
          title: 'Data Pengajuan',
          to: '/user/kadep/DataPengajuan'
          },
          {
          icon: 'mdi-calendar-month',
          title: 'Jadwal Rapat',
          to: '/user/kadep/Jadwal'
          },
          {
          icon: 'mdi-note-text',
          title: 'Notulen Rapat',
          to: '/user/kadep/Notulen'
          },
      ],

      itemswadir: [
        {
          icon: 'mdi-apps',
          title: 'Beranda',
          to: '/user'
        },
        {
          icon: 'mdi-receipt-text-plus',
          title: 'Pengajuan Rapat',
          to: '/user/wadir/Pengajuan'
          },
        {
          icon: 'mdi-database',
          title: 'Data Pengajuan',
          to: '/user/wadir/DataPengajuan'
        },
        {
          icon: 'mdi-receipt-text-plus',
          title: 'Buat Rapat',
          to: '/user/wadir/BuatRapat'
        },
        {
          icon: 'mdi-calendar-month',
          title: 'Jadwal Rapat',
          to: '/user/wadir/Jadwal'
        },
        {
          icon: 'mdi-note-text',
          title: 'Notulen Rapat',
          to: '/user/wadir/Notulen'
        },
      ],

      itemsdir: [
        {
          icon: 'mdi-apps',
          title: 'Beranda',
          to: '/user'
        },
        {
          icon: 'mdi-database',
          title: 'Data Pengajuan',
          to: '/user/director/DataPengajuan'
        },
        {
          icon: 'mdi-receipt-text-plus',
          title: 'Buat Rapat',
          to: '/user/director/BuatRapat'
        },
        {
          icon: 'mdi-calendar-month',
          title: 'Jadwal Rapat',
          to: '/user/director/Jadwal'
        },
        {
          icon: 'mdi-note-text',
          title: 'Notulen Rapat',
          to: '/user/director/Notulen'
        },
      ],

      itemsstaff: [
        {
          icon: 'mdi-apps',
          title: 'Beranda',
          to: '/user'
        },
        {
          icon: 'mdi-database',
          title: 'Data Pengajuan',
          to: '/user/staff/DataPengajuan'
        },
        {
          icon: 'mdi-receipt-text-plus',
          title: 'Buat Rapat',
          to: '/user/staff/BuatRapat'
        },
        {
          icon: 'mdi-calendar-month',
          title: 'Jadwal Rapat',
          to: '/user/staff/Jadwal'
        },
        {
          icon: 'mdi-note-text',
          title: 'Notulen Rapat',
          to: '/user/staff/Notulen'
        },
      ],

      itemsadmin: [
        {
          icon: 'mdi-home',
          title: 'Beranda',
          to: '/user'
        },
        {
          icon: 'mdi-clipboard-account',
          title: 'Data Pengguna',
          to: '/user/admin/DataAuth'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Tambah Pengguna',
          to: '/user/admin/Register'
        },
      ],
      miniVariant: false,
      title: 'Aplikasi Pengajuan Rapat'
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.authentication.user;
    },
    showKaprodiDrawer() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_KAPRODI')
      }

      return false;
    },
    showKadepDrawer() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_KADEP')
      }

      return false;
    },
    showWadirDrawer() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_WADIR');
      }

      return false;
    },
    showDirectorDrawer() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_DIRECTOR');
      }

      return false;
    },
    showStaffDrawer() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_STAFF');
      }

      return false;
    },
    showAdminDrawer() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('authentication/logout');
      this.$router.push('/');
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  },
  // watch: {
  //           $route() {
  //               location.reload();
  //           },
  //       }
}
</script>
