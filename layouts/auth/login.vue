<template>
    <v-app primary>
        <nav-bar />
        <v-main>
            <v-container >
                <v-row class="justify-center">
                    <v-col md="6">
                        <Nuxt/>   
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import NavBar from "./login/Navbar.vue"

export default {
  components: { NavBar},
    name: 'login',
    
}
</script>
<style>
    
</style>