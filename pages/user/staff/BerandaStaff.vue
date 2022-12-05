<template>
    <div>
      <v-card
      v-if="showStaff"
      class=" pa-1 mt-4"
      outlined
      tile
      >
        <v-row dense >
          <v-col 
            cols="4" 
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
                    v-if="item.title === 'Jadwal'"
                    >
                    {{ totalMeet }} Jadwal rapat
                    <br>{{ totalInvite }}  Undangan rapat
                    </v-card-subtitle>
                    <v-card-subtitle
                    v-else-if="item.title === 'Notulen'"
                    >
                    Notulen rapat
                    </v-card-subtitle>
                    <v-card-subtitle
                    v-else
                    >
                    {{ totalSubmission }} Pengajuan rapat
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        v-if="item.title === 'Jadwal'" 
                        class="ml-2"
                        outlined
                        rounded
                        small
                        to="/user/staff/Jadwal"
                      >
                        LIHAT
                      </v-btn>

                      <v-btn
                        v-else-if="item.title === 'Notulen'" 
                        class="ml-2 mt-5"
                        outlined
                        rounded
                        small
                        to="/user/staff/Notulen"
                      >
                        DETAIL
                      </v-btn>

                      <v-btn
                        v-else
                        class="ml-2 mt-5"
                        outlined
                        rounded
                        small
                        to="/user/staff/DataPengajuan"
                      >
                        CEK
                      </v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar
                    class="ma-3"
                    size="120"
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
      v-if="showStaff"
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
                            <v-list-item-title>Position</v-list-item-title>
                                <v-text-field
                                    disabled
                                    v-model="currentUser.position"
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
        <v-col>
          <h2 class="mt-4">Rapat Hari ini:</h2>
          <staff-jadwal-hari-ini></staff-jadwal-hari-ini>
          <h2 class="mt-4">Undangan Rapat Hari ini:</h2>
          <staff-jadwal-invite-hari-ini></staff-jadwal-invite-hari-ini>
        </v-col>
      </v-row>
      <v-card v-if="!showStaff" class="pa-6 mt-4" outlined tile>
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
</template>
<script>
  import StaffJadwalHariIni from './components/jadwal/StaffJadwalHariIni.vue';
  import StaffJadwalInviteHariIni from './components/jadwal/StaffJadwalInviteHariIni.vue';

export default {
    components: {
      StaffJadwalHariIni,
      StaffJadwalInviteHariIni,
    },
    data: () => ({
      totalSubmission: 0,
      totalMeet: 0,
      totalInvite: 0,
      items: [
        {
          color: '#1F7087',
          src: 'https://i.ibb.co/hd6zHhj/pengajuan.png',
          title: 'Pengajuan',
          // artist: 'Pengajuan rapat',
        },
        {
          color: '#952175',
          src: 'https://i.ibb.co/WK4HV4k/jadwal.png',
          title: 'Jadwal',
          // artist: 'Jadwal rapat',
        },
        {
          color: 'pink',
          src: 'https://i.ibb.co/02vXSD4/notulen.png',
          title: 'Notulen',
          // artist: 'Notulen rapat',
        },
      ],
    }),
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
    methods: {
      async countPengajuanByReceiver() {
          const receiver = this.$store.state.authentication.user.position;
          const getCount = await this.$axios(`http://localhost:8080/meet/count-meet-process-receiver/${receiver}`);
          this.totalSubmission = getCount.data.total;
          // console.log("data", getData);
      },
      async countMeet() {
        const getCount = await this.$axios("http://localhost:8080/meet/count-meet-success");
        this.totalMeet = getCount.data.total;
        // console.log("data", getData);
      },
      async countMeetByInvite() {
          const username = this.$store.state.authentication.user.username;
          const getCount = await this.$axios(`http://localhost:8080/meet/count-meet-success-username/${username}`);
          this.totalInvite = getCount.data.total;
          // console.log("data", getData);
      },
    },
    mounted() {
      this.countPengajuanByReceiver();
      this.countMeet();
      this.countMeetByInvite();
    }
}
</script>
<style>
    
</style>