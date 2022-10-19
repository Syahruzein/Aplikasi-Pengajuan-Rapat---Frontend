<template lang="">
    <div>
         <v-card
                class="mx-auto mr-2 mb-2"
                max-width="344"
            >
                <v-img
                src="https://img.freepik.com/free-photo/smiling-african-student-pointing-with-pencil-laptop-screen-concentrated-blonde-woman-glasses-propping-chin-with-hand-while-working-with-computer-office_197531-3714.jpg?t=st=1655742914~exp=1655743514~hmac=85058e108a1611fea554a65862d9231c41921194d1e92e9f78ecc9c113028709&w=826"
                height="200px"
                ></v-img>

                <v-card-title>
                Bidang Akademik
                </v-card-title>

                <v-card-subtitle>
                <!-- Wakil Direktur -->
                </v-card-subtitle>

                <v-card-actions>
                <v-btn
                    color="primary lighten-2"
                    text
                    to="/user/users/components/jadwal/TableJadwalAkademik"
                >
                    Lihat jadwal
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click="showAkademik = !showAkademik"
                >
                    <v-icon>{{ showAkademik ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="showAkademik">
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
      showAkademik: false,
    }),
}
</script>
<style lang="">
    
</style>