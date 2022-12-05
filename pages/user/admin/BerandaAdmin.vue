<template>
    <div>
      <v-card
      v-if="showAdmin"
      class=" pa-1 mt-4"
      outlined
      tile
      >
        <v-row dense >
          <v-col 
            cols="6" 
            class="d-flex ">
            <v-col
              v-for="(item, i) in items"
              :key="i"
              cols="12"
            >
              <v-card
                :color="item.color"
                dark
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5"
                      v-text="item.title"
                    ></v-card-title>
                    
                    <v-card-subtitle
                    v-if="item.title === 'Pengguna'"
                    >
                    <!-- {{ totalMeet }}  -->
                    Data Pengguna
                    </v-card-subtitle>
                    <v-card-subtitle
                    v-else-if="item.title === 'Akun'"
                    >
                    Tambah Akun
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        v-if="item.title === 'Pengguna'" 
                        class="ml-2 mt-5"
                        outlined
                        rounded
                        small
                        to="user/admin/DataAuth"
                      >
                        LIHAT
                      </v-btn>

                      <v-btn
                        v-else
                        class="ml-2 mt-5"
                        outlined
                        rounded
                        small
                        to="user/admin/Register"
                      >
                        BUAT
                      </v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar
                    class="ma-3"
                    size="150"
                    tile
                  >
                    <img :src="item.src">
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-card>

      <v-row
      v-if="showAdmin"
      >
        <v-col>
          <h2 class="mt-4">Profile</h2>

          <v-card
          class=" pa-5 mt-4"
          outlined
          tile
          >
          <v-layout column>
                <v-card>
                  <v-card-text>
                    <v-list
                        three-line
                        subheader
                    >
                        <!-- <v-subheader>User Controls</v-subheader> -->
                        <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Username</v-list-item-title>
                                <v-text-field
                                    disabled
                                    v-model="currentUser.username"
                                    ></v-text-field>
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Email</v-list-item-title>
                                <v-text-field
                                    disabled
                                    v-model="currentUser.email"
                                ></v-text-field>
                        </v-list-item-content>
                        </v-list-item>                        
                        <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Roles</v-list-item-title>
                                <v-text-field
                                    disabled
                                    v-model="currentUser.roles"
                                ></v-text-field>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
            </v-layout>
        </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-card v-if="!showAdmin" class="pa-6 mt-4" outlined tile>
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
</template>
<script>
export default {
    data: () => ({
    //   totalSubmission: 0,
    //   totalMeet: 0,
      items: [
        {
          color: '#1F7087',
          src: 'https://i.ibb.co/hd6zHhj/pengajuan.png',
          title: 'Pengguna',
          // artist: 'Pengajuan rapat',
        },
        {
          color: '#952175',
          src: 'https://i.ibb.co/WK4HV4k/jadwal.png',
          title: 'Akun',
          // artist: 'Jadwal rapat',
        }
      ],
    }),
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