<template>
    <div>
        <v-card
            class=" pa-6 mt-4"
            outlined
            tile
            >
            <v-data-table
                :headers="headers"
                :items="meet"
                :items-per-page="5"
                :search="search"
                sort-by="waktu"
                class="elevation-1"
            >
                <template v-slot:[getItemTanggal()]="{ item }">
                    <span>{{ new Date(item.tanggal).toLocaleDateString('da') }}</span>
                    <!-- da-DK -->
                </template>
                
                <template v-slot:top>
                        
                        <v-dialog
                        v-model="dialog"
                        scrollable
                        persistent
                        max-width="50rem"
                        transition="dialog-bottom-transition"
                        >
                            <v-card>
                                <v-toolbar
                                color="primary"
                                dark
                                ><h2>Detail rapat</h2></v-toolbar>
    
                                <v-card-text>
                                    <v-container>
                                        <v-list
                                            two-line
                                            subheader
                                        >
                                            <v-subheader class="pt-4 mb-2">
                                                <p>
                                                    Dari : <b class="subheader">{{ selectedItemIndex.maker }} </b> 
                                                    <br> 
                                                    Kepada : Saya
                                                </p>
                                            </v-subheader>
                                            <v-list-item class="mt-2">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Yth Bapak/Ibu Undangan 
                                                    <br>Semoga selalu diberikan kesehatan, Aamiin.
                                                </v-list-item-title>
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Mohon kehadirannya dalam <b> {{ selectedItemIndex.perihal }} </b> pada :</v-list-item-title>
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Hari : {{ computedDayDateFormattedMomentjs }}</v-list-item-title>
                                                    <v-list-item-title class="mt-2">Tanggal : {{ computedDateFormattedMomentjs }}</v-list-item-title>
                                                    <v-list-item-title class="mt-2">Jam : {{ selectedItemIndex.waktu }} WIB - Selesai</v-list-item-title>
                                                    <v-list-item-title class="mt-2">Tempat : {{ selectedItemIndex.tempat }}</v-list-item-title>
                                                    <v-list-item-title class="mt-2">Agenda : </v-list-item-title>
                                                    <v-textarea
                                                    readonly
                                                    v-model="selectedItemIndex.deskripsi"
                                                    ></v-textarea>
                                                    <v-list-item-title class="mt-4">Kami mohon hadir tepat waktu. Terima Kasih.</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>       
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class="mt-4">{{ selectedItemIndex.receiver }}</v-list-item-title>
                                                <v-list-item-title class="mt-4"><b><i class="green--text">Terverifikasi</i></b></v-list-item-title>
                                                <v-list-item-title class="mt-4">{{ nameVerified[0].username }}</v-list-item-title>
                                            </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-container>
                                </v-card-text>
    
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-secondary"
                                    @click="close"
                                >
                                    close
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>    
    
                    </template>

                <template v-slot:[getItemActions()]="{ item }">
                        <div>
                            <v-btn
                            small
                            rounded
                            elevation="1"
                            color="bg-gradient-info"
                            class="white--text"
                            @click="editItem(item)"
                            >
                                DETAIL
                            </v-btn>
                            </div>
                     </template>
            </v-data-table>
            </v-card>
    </div>
</template>
<script>
    import moment from 'moment'
    import 'moment/locale/id'

export default {
    data() {
        return {
            search: "",
            editedIndex: -1,
            selectedItemIndex: -1,
            dialog: false,
            isEditing: null,
            menu: false,
            menu2: false,
            headers: [
                    // { text: "ID", value: "id" },
                    // { text: "Perihal", value: "perihal" },
                    { text: "Tanggal", value: "tanggal" },
                    { text: "Waktu", value: "waktu" },
                    { text: "Tempat", value: "tempat" },
                    // { text: "Status", value: "status" },
                    // { text: "Deskripsi", value: "deskripsi" },
                    { text: "Actions", value: "actions" },
                ],
                // Pengajuan data rapat
                meet: [
                    {
                        // "id": 1,
                        "perihal": "",
                        "tempat": "",
                        "tanggal": "",
                        "waktu": "",
                        "Status": "",
                        "deskripsi": "",
                    },
                ],
                nameVerified : [{"username": ""}],
                defaultItem : {
                    perihal: '',
                    tempat: '',
                    tanggal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    waktu: '',
                    status: '',
                    deskripsi: '',
                },
        }
    },
    methods: {
        async getMeet() {
            const today = new Date();
            const year = today.getFullYear();
            const mes = today.getMonth()+1;
            const dia = today.getDate();
            const tanggal =year+"-"+mes+"-"+dia;
            const user_id = this.$store.state.authentication.user.id;
            const getData = await this.$axios(`http://localhost:8080/meet/success-date-id/${tanggal}/${user_id}`);
            // // if(getData.data.id == userId) {
                this.meet = getData.data;
            // }
            // console.log("data", getData)
        },
        async getAuthNameVerified() {
            const position = this.selectedItemIndex.receiver;
            const getData = await this.$axios(`http://localhost:8080/api/auth/user-by-position/${position}`)
            this.nameVerified = getData.data;
        },
        getItemTanggal() {
            return "item.tanggal";
        },
        getItemActions() {
            return `item.actions`
        },
        editItem(item) {
            this.editedIndex = this.meet.indexOf(item);
            this.selectedItemIndex = Object.assign({}, item);
            this.getAuthNameVerified(this.editedIndex);
            this.dialog = true;
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.selectedItemIndex = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
    },
    mounted() {
        this.getMeet();
        if (!this.currentUser) {
            this.$router.push('/');
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.authentication.user;
        },
        computedDateFormattedMomentjs () {
            return this.selectedItemIndex.tanggal ? moment(this.selectedItemIndex.tanggal).format('DD MMMM YYYY') : ''
        },
        computedDayDateFormattedMomentjs () {
            return this.selectedItemIndex.tanggal ? moment(this.selectedItemIndex.tanggal).format('dddd') : ''
        },
}
}
</script>
<style>
    
</style>