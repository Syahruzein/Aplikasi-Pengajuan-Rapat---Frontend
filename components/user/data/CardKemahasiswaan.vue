<template lang="">
    <div>
         <v-card
                class="mx-auto mr-2 mb-2"
                max-width="344"
            >
                <v-img
                src="https://img.freepik.com/free-photo/students-looking-university-building_23-2148522176.jpg?w=900"
                height="200px"
                ></v-img>

                <v-card-title>
                Bidang Kemahasiswaan & SDM
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
                    @click="showKemahasiswaan = !showKemahasiswaan"
                >
                    <v-icon>{{ showKemahasiswaan ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="showKemahasiswaan">
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
      showKemahasiswaan: false,
    }),
}
</script>
<style lang="">
    
</style>