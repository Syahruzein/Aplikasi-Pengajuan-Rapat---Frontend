<template>
    <div>
        <v-card
        v-if="showKaprodi"
        class=" pa-6 mt-4"
        outlined
        tile
        >
            <v-card elevation="3" class="pa-8">
                <v-card-title>
                    {{ totalMeet }} Pengajuan Rapat
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>               
                <v-data-table
                :headers="kepala"
                    :items="meet"
                    :search="search"
                    sort-by="tanggal"
                    class="elevation-1"
                >
                    <template v-slot:[getItemStatus()]="{ item }">
                        <v-chip
                            :color="getColor(item.status)"
                            dark
                        >
                            {{ item.status == 1 ? 'process' : 'rejected' }}
                        </v-chip>
                    </template>
                    <template v-slot:top>
                            
                            <v-dialog
                            v-model="dialog"
                            scrollable
                            persistent
                            max-width="70rem"
                            transition="dialog-bottom-transition"
                            >
                                <v-card height="60vh"  max-width="20rem">
                                    <v-toolbar
                                    color="primary"
                                    dark
                                    ><h2>Detail pengajuan rapat</h2></v-toolbar>
                                </v-card>
                                <v-card
                                height="60vh"
                                > 
                                    <v-card-text
                                    class="pl-6 pt-4"
                                    >
                                        <!-- <div>Word of the Day</div> -->
                                        <p class="text-h4 text--primary">
                                            Alasan
                                        </p>
                                        <p>dari {{ nameVerified[0].username }}</p>
                                        <div class="text--primary " >
                                            {{ selectedItemIndex.alasan }}
                                        </div>
                                    </v-card-text>
                                                                            
                                    <v-expand-transition>
                                        <v-card
                                            v-if="reveal"
                                            class="overflow-y-auto transition-fast-in-fast-out v-card--reveal"
                                            max-width="50rem"
                                            c
                                            
                                        >
                                            <v-card-text>
                                                <v-container>
                                                    <v-list
                                                        two-line
                                                        subheader
                                                    >
                                                        <v-subheader class="pt-4 mb-2">
                                                            <p>
                                                                Dari :<b class="subheader">{{ selectedItemIndex.maker }} </b> 
                                                                <br> 
                                                                Kepada : {{ selectedItemIndex.receiver }}
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
                                                            <v-list-item-title>Mohon kehadirannya dalam <b>{{ selectedItemIndex.perihal }} </b> pada :</v-list-item-title>
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
                                                            <v-list-item-title class="mt-4"><b><i class="red--text">Ditolak</i></b></v-list-item-title>
                                                            <v-list-item-title class="mt-4">{{ nameVerified[0].username }}</v-list-item-title>
                                                        </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                        <v-list-item-content>
                                                        </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-container>
                                            </v-card-text>
                                            
                                        </v-card>
                                    </v-expand-transition> 
                                    <v-footer class="pa-2">
                                        <v-spacer></v-spacer>
                                        <v-card-actions 
                                        v-if="reveal === true"
                                        class="pt-0">
                                            <v-btn
                                                class="white--text"
                                                color="bg-gradient-danger"
                                                @click="deleteItem()"
                                            >
                                                Delete
                                            </v-btn>
                                            <v-btn
                                            class="white--text"
                                            color="bg-gradient-secondary"
                                            @click="reveal = false"
                                            >
                                                Close
                                            </v-btn>
                                        </v-card-actions>
            
                                        <v-card-actions
                                        v-else
                                        >                                            
                                            <v-btn
                                            class="white--text"
                                            color="bg-gradient-secondary"
                                            @click="close"
                                            >
                                            close
                                            </v-btn>
                                            <v-btn
                                                class="white--text"
                                                color="bg-gradient-info"
                                                @click="reveal = true"
                                            >
                                                Detail Rapat
                                            </v-btn>
                                        </v-card-actions>
                                    </v-footer>
                                </v-card>
                            </v-dialog>
        
                            <v-dialog
                            v-model="dialogUpdate"
                            max-width="50rem"
                            transition="dialog-bottom-transition"
                            persistent
                            >
                                <v-card>
                                    <v-toolbar
                                    color="primary"
                                    dark
                                    >
                                    <h2 v-if="success">Pengajuan rapat berhasil diupdate</h2>
                                    <h2 v-if="!success">Pengajuan rapat gagal diupdate</h2>
                                    </v-toolbar>
                                    <v-card-text>
                                    <div class="text pa-12">
                                        <h2 v-if="success">Anda bisa memeriksa di Data Pengajuan, klik dibawah ini :</h2>
                                        <h2 v-if="!success">Anda bisa mencoba mengupdate lagi, klik dibawah ini :</h2>
                                        </div>
                                    </v-card-text>
                                    <v-card-actions v-if="!success" class="justify-end">
                                    <v-btn
                                        class="white--text"
                                        color="bg-gradient-secondary"
                                        @click.stop="dialogUPdate = !dialogUpdate"
                                    >Close</v-btn>
                                    </v-card-actions>
                                    <v-card-actions v-if="success" class="justify-end">
                                    <v-btn
                                        class="white--text"
                                        color="bg-gradient-info"
                                        @click.stop="dialogUpdate = !dialogUpdate"
                                    >Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
        
                            <v-dialog 
                            v-model="dialogDelete" 
                            max-width="30rem"
                            persistent
                            >
                                <v-card>
                                    <v-card-title>
                                        Yakin ingin menghapus?
                                    </v-card-title>        
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="closeDelete" class="white--text" color="bg-gradient-secondary">Cancel</v-btn>
                                        <v-btn @click="deleteItemConfirm" class="white--text" color="bg-gradient-info">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
    
                    </template>
    
                    <template v-slot:[getItemTanggal()]="{ item }">
                        <span>{{ new Date(item.tanggal).toLocaleDateString('da') }}</span>
                        <!-- da-DK -->
                    </template>
                    
                    <template v-slot:[getItemDeskripsi()]="{ item }">
                        <div style="width: 14rem;">
                            <p class="overflow-x-hidden pt-1">{{ item.deskripsi }}</p>
                        </div>
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
                                    more
                                </v-btn>
                                </div>
                         </template>
                </v-data-table> 
            </v-card>
        </v-card>
        <v-card v-if="!showKaprodi" class="pa-6 mt-4" outlined tile>
            <v-card elevation="3" class="pa-8">
                <v-alert
                type="error"
                prominent
                border="left"
                >          
                <h2>Required role kaprodi !!!.</h2>
                </v-alert>
            </v-card>
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
                dialog: false,
                dialogDelete: false,
                dialogUpdate: false,
                editedIndex: -1,
                selectedItemIndex: -1,
                totalMeet: 0,
                isOperationsSuccess: false,
                menu: false,
                menu2: false,
                reveal: false,
                tanggal: new Date().toISOString(),
                kepala: [
                    // { text: "ID", value: "id" },
                    { text: "Perihal", value: "perihal" },
                    { text: "Tempat", value: "tempat" },
                    { text: "Tanggal", value: "tanggal" },
                    { text: "Waktu", value: "waktu" },
                    { text: "Status", value: "status" },
                    // { text: "Deskripsi", value: "deskripsi" },
                    { text: "Actions", value: "actions" },
                ],
                // Pengajuan data rapat
                meet: [
                    {
                        "id": "",
                        "perihal": "",
                        "tempat": "",
                        "tanggal": "",
                        "waktu": "",
                        "Status": "",
                        "deskripsi": "",
                        "username" : "",
                    }
                ],
                executive: [
                    {
                        "position": "",
                    }
                ],
                people: [
                    {
                        "id": "1",
                        "username": "laha",
                    }
                ],
                nameVerified : [{"username": ""}],
                defaultItem : {
                    perihal: '',
                    tempat: '',
                    tanggal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    waktu: '',
                    status: '',
                    deskripsi: '',
                    receiver: '',
                    participants: '',
                },
            };
        },
        methods: {
            getColor (status) {
                if (status == '1') return 'blue'
                else return 'red'
            },
            async countPengajuan() {
                const user_id = this.$store.state.authentication.user.id;
                const getCount = await this.$axios(`http://localhost:8080/meet/count-meet-reject/${user_id}`);
                this.totalMeet = getCount.data.total;
                // console.log("data", getData);
            },
            async getPengajuan() {
                const user_id = this.$store.state.authentication.user.id;
                const getData = await this.$axios(`http://localhost:8080/meet/reject/${user_id}`);
                // if(getData.data.id == userId) {
                    this.meet = getData.data;
                // }
                // console.log("data", getData)
            },
            async getReceiver() {
                const getData = await this.$axios(`http://localhost:8080/api/auth/director-wadir`);
                this.executive = getData.data;
            },
            async getParticipants(){
                const getData = await this.$axios(`http://localhost:8080/api/auth/user`);
                this.people = getData.data;
            },
            async getAuthNameVerified() {
                const position = this.selectedItemIndex.receiver;
                const getData = await this.$axios(`http://localhost:8080/api/auth/user-by-position/${position}`)
                this.nameVerified = getData.data;
            },
            getItemStatus() {
                return "item.status";
            },
            getItemTanggal() {
                return "item.tanggal";
            },
            getItemDeskripsi() {
                return `item.deskripsi`;
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
            deleteItem() {
                // this.selectedItemIndex = this.meet.indexOf(item);
                this.dialogDelete = true;
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.selectedItemIndex = Object.assign({}, this.defaultItem)
                    // window.$nuxt.refresh()
                    // window.location.reload(true)
                this.editedIndex = -1
                })
            },
            closeDelete() {
                this.dialogDelete = false;
                this.dialog = false;
                this.$nextTick(() => {
                    this.selectedItemIndex = -1;
                });
            },
            async deleteItemConfirm() {
                const id = this.selectedItemIndex.id;
                this.$axios
                    .delete(`http://localhost:8080/meet/${id}`)
                    .then(response => {
                    this.meet.splice(this.selectedItemIndex, 1);
                    this.closeDelete();
                    console.log("Data Berhasil Dihapus", response.getData);
                })
                    .catch(e => console.log("Gagal Menghapus Data", e));
            },
            save () {
                if (this.editedIndex > -1) {
                        this.$axios({
                        method: 'put',
                        url: 'http://localhost:8080/meet/update-process' ,
                        data: Object.assign(this.meet[this.editedIndex], this.selectedItemIndex), 
                        })
                        .then(response => {
                            this.isOperationsSuccess = true
                            this.dialogUpdate = true
                            console.log(response.data)
                        })
                            .catch(e => {
                            this.isOperationsSuccess = false
                            this.dialogUpdate = true
                            console.log(e)
                        })
                } else {
                this.meet.push(this.selectedItemIndex)
                }
                this.close()
            },
            remove (item) {
                const index = this.selectedItemIndex.participants.indexOf(item.username)
                if (index >= 0) this.selectedItemIndex.participants.splice(index, 1)
            },
        },
        mounted() {
            this.countPengajuan();
            this.getPengajuan();
            this.getReceiver();
            this.getParticipants();
            if (!this.currentUser) {
                this.$router.push('/');
            }
        },
        computed:{
            success(){
                return  this.isOperationsSuccess
            },
            showKaprodi() {
                if (this.currentUser && this.currentUser.roles) {
                    return this.currentUser.roles.includes('ROLE_KAPRODI')
                }
                
                return false;
            },
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
        .subheader {
            font-size: 1.2em;
        }
        .v-card--reveal {
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
        width: 100%;
        height: 100%;
        }
        .notulens {
            font-size: 1.2em;
        }
    </style>