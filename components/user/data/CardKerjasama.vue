<template lang="">
    <div>
         <v-card
                class="mx-auto mr-2 mb-2"
                max-width="344"
            >
                <v-img
                src="https://img.freepik.com/free-photo/crop-people-shaking-hands-conference_1098-20070.jpg?t=st=1655743307~exp=1655743907~hmac=e80458e01ced4ca3d32523b565725a8e501bb045f88596d6ff860925739d9080&w=826"
                height="200px"
                ></v-img>
                
                <v-card-title>
                Bidang Kerjasama & Teknologi
                </v-card-title>

                <v-card-subtitle>
                <!-- Wakil Direktur -->
                </v-card-subtitle>

                <v-card-actions>
                <v-btn
                    color="primary lighten-2"
                    text
                >
                    Lihat
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click="showKerjasama = !showKerjasama"
                >
                    <v-icon>{{ showKerjasama ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="showKerjasama">
                    <v-divider></v-divider>

                    <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                </div>
                </v-expand-transition>
            </v-card>
    </div>
</template>
<script>
export default {
    data: () => ({
      showKerjasama: false,
    }),
}
</script>
<style lang="">
    
</style>