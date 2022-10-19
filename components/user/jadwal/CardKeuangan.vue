<template lang="">
    <div>
         <v-card
                class="mx-auto mr-2 mb-2"
                max-width="344"
            >
                <v-img
                src="https://img.freepik.com/free-photo/businesswoman-using-tablet-analysis-graph-company-finance-strategy-statistics-success-concept-planning-future-office-room_74952-1410.jpg?t=st=1655743030~exp=1655743630~hmac=6900013e5524491e9684caae70f099eebb8efdd0b451bd11fc6f53bba04216f7&w=900"
                height="200px"
                ></v-img>

                <v-card-title>
                Bidang Keuangan & Sarpas
                </v-card-title>

                <v-card-subtitle>
                <!-- Wakil Direktur -->
                </v-card-subtitle>

                <v-card-actions>
                <v-btn
                    color="primary lighten-2"
                    text
                >
                Lihat jadwal
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click="showKeuangan = !showKeuangan"
                >
                    <v-icon>{{ showKeuangan ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="showKeuangan">
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
      showKeuangan: false,
    }),
}
</script>
<style lang="">
    
</style>