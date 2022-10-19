<template>
    <v-card class="overflow-hidden justify-center" >
      <v-app-bar
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
      >       
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon @click="backHome">
          <v-icon>mdi-home </v-icon>
        </v-app-bar-nav-icon>

        <v-container >
          <v-row
            no-gutters
            style="height: 10rem;"
          >
          <v-col></v-col>
          <v-col
            v-for="align in alignments"
            :key="align"
            :align-self="align"
          >
          <v-col>
          <img src="~/assets/img/logo/apr.svg" 
                class="float-left pr-2" alt="..."
                />
            <h2>
                | Register
            </h2>
          </v-col>
          </v-col>
          <v-col></v-col>
          </v-row>
        </v-container>
        
        <template v-slot:extension >
          <!-- <v-tabs centered >
            <v-tab to="/auth/registry/Register">Users</v-tab>
            <v-tab to="/auth/registry/RegisterDirektur">Direktur | Wakil Direktur</v-tab>
            <v-tab to="/auth/registry/RegisterSekretaris">Sekretaris</v-tab>
          </v-tabs> -->
        </template>

        <v-btn icon>
          <v-icon >mdi-register</v-icon>
        </v-btn>
      </v-app-bar>

    </v-card>
</template>
<script>

export default {
    name: "nav-bar",
    props: [
        "titleAuth"
    ],
    data: () => ({
        alignments: [
            "center",
        ],
    }),
    methods: {
        backHome() {
            this.$router.push("/");
        },
    },
}
</script>
<style>
    
</style>