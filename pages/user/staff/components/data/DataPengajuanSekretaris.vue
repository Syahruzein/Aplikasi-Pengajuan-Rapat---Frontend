<template>
    <div>
        <v-card
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
                    :headers="headers"
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
                            <div v-if="item.status === '1'">
                                process
                            </div>
                            <div v-else-if="item.status === '2'">
                                verified
                            </div>
                            <div v-else-if="item.status === '3'">
                                finished
                            </div>
                            <div v-else>
                                rejected
                            </div>
                        </v-chip>
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
                                ><h2>Konfirmasi pengajuan rapat</h2></v-toolbar>
    
                                <v-card-text>
                                    <v-container>
                                        <v-list
                                            three-line
                                            subheader
                                        >
                                        <v-subheader class="pt-4 mb-2">
                                                <p>
                                                    <b class="subheader">  {{ selectedItemIndex.maker }} </b> 
                                                    <br> 
                                                    Kepada {{ selectedItemIndex.receiver }}
                                                </p>
                                            </v-subheader>
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Perihal</v-list-item-title>
                                                    <v-text-field
                                                        :disabled="!isEditing"
                                                        v-model="selectedItemIndex.perihal"
                                                    ></v-text-field>
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Tempat</v-list-item-title>
                                                    <v-text-field
                                                        :disabled="!isEditing"
                                                        v-model="selectedItemIndex.tempat"
                                                    ></v-text-field>
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Tanggal</v-list-item-title>
                                                <v-menu
                                                ref="menu"
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :return-value.sync="selectedItemIndex.tanggal"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                                >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                    :disabled="!isEditing"
                                                    :value="computedDateFormattedMomentjs"
                                                    clearable
                                                    prepend-icon="mdi-calendar"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    @click:clear="selectedItemIndex.tanggal = null"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="selectedItemIndex.tanggal"
                                                    no-title
                                                    scrollable
                                                >
                                                <v-spacer></v-spacer>
                                                    <v-btn
                                                        text
                                                        color="primary"
                                                        @click="menu = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        text
                                                        color="primary"
                                                        @click="$refs.menu.save(selectedItemIndex.tanggal)"
                                                    >
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                                </v-menu>
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Waktu</v-list-item-title>
                                                <v-menu
                                                ref="menu2"
                                                v-model="menu2"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="selectedItemIndex.waktu"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    :disabled="!isEditing"
                                                    v-model="selectedItemIndex.waktu"
                                                    prepend-icon="mdi-clock-time-four-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                                </template>
                                                <v-time-picker
                                                v-model="selectedItemIndex.waktu"
                                                no-title
                                                scrollable
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="menu2 = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="$refs.menu2.save(selectedItemIndex.waktu)"
                                                >
                                                    OK
                                                </v-btn>
                                                </v-time-picker>
                                            </v-menu>
                                            </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Peserta</v-list-item-title>
                                                <v-autocomplete
                                                v-model="selectedItemIndex.participants"
                                                :disabled="!isEditing"
                                                :items="people" 
                                                chips
                                                item-text="username"
                                                item-value="username"
                                                multiple
                                                >
                                                    <template v-slot:selection="data">
                                                        <v-chip
                                                        :disabled="!isEditing"
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"
                                                        close
                                                        @click="data.select"
                                                        @click:close="remove(data.item)"
                                                        >
                                                            {{ data.item.username }}
                                                        </v-chip>
                                                    </template>
                                                </v-autocomplete>
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Agenda</v-list-item-title>
                                                <v-textarea
                                                        :disabled="!isEditing"
                                                        v-model="selectedItemIndex.deskripsi"
                                                    ></v-textarea>
                                            </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-container>
                                </v-card-text>
    
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-warning"
                                    @click="isEditing = !isEditing"
                                >
                                    <v-icon v-if="isEditing">
                                        mdi-close
                                    </v-icon>
                                    <div v-else>
                                        change
                                    </div>               
                                </v-btn>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-danger"
                                    @click="dialogReject = true"
                                    >
                                    Reject
                                </v-btn>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-secondary"
                                    @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-success"
                                    @click="save"
                                >
                                    Accept
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog
                            scrollable
                            persistent
                            v-model="dialogReject"
                            max-width="40rem"
                            height="60vh"
                        >
                            <v-card>
                                <v-toolbar
                                color="primary"
                                dark
                                >
                                    <v-card-title>
                                        <h2>Alasan menolak rapat</h2>
                                    </v-card-title>
                                </v-toolbar>                                    
                                <v-card class="pa-8">
                                    <v-form ref="form" v-model="reject"  lazy-validation>
                                        <v-textarea
                                        outlined
                                        name="input-7-4"
                                        v-model="alasan"
                                        label="Alasan"
                                        :rules="alasanRules"
                                        required
                                        height="20rem"
                                        ></v-textarea>

                                        <v-checkbox
                                        v-model="checkbox"
                                        :rules="checkboxRules"
                                        class="mt-1 mb-2"
                                        label="Do you agree?"
                                        required
                                        ></v-checkbox>

                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="bg-gradient-secondary"
                                            class="white--text"
                                            @click="closeDialog"
                                            >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            :disabled="!reject"
                                            color="bg-gradient-info"
                                            class="white--text"
                                            @click="validate"
                                            >
                                            Save
                                        </v-btn>
                                    </v-form>
                                </v-card>
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
                                <h2 v-if="success">Konfirmasi pengajuan rapat berhasil</h2>
                                <h2 v-if="!success">Konfirmasi rapat gagal</h2>
                                </v-toolbar>
                                <v-card-text>
                                <div class="text pa-12">
                                    <h2 v-if="success">Anda bisa memeriksa di Data Rapat, klik dibawah ini :</h2>
                                    <h2 v-if="!success">Anda bisa mencoba Konfirmasi lagi, klik dibawah ini :</h2>
                                    </div>
                                </v-card-text>
                                <v-card-actions v-if="!success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
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
                        v-model="dialogUpdateReject"
                        max-width="50rem"
                        transition="dialog-bottom-transition"
                        persistent
                        >
                            <v-card>
                                <v-toolbar
                                color="primary"
                                dark
                                >
                                <h2 v-if="success">Menolak pengajuan rapat berhasil</h2>
                                <h2 v-if="!success">Menolak rapat gagal</h2>
                                </v-toolbar>
                                <v-card-text>
                                <div class="text pa-12">
                                    <h2 v-if="success">Kembali ke halaman, klik dibawah ini :</h2>
                                    <h2 v-if="!success">Anda bisa mencoba Menolak lagi, klik dibawah ini :</h2>
                                    </div>
                                </v-card-text>
                                <v-card-actions v-if="!success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
                                    @click.stop="closeDialogReject"
                                >Close</v-btn>
                                </v-card-actions>
                                <v-card-actions v-if="success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
                                    @click.stop="closeDialogReject"
                                    :redirect="`user/staff/DataPengajuan`"
                                >Ok</v-btn>
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
                                confirm
                            </v-btn>
                            </div>
                     </template>
                </v-data-table> 
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
                dialogReject: false,
                dialogUpdateReject: false,
                editedIndex: -1,
                selectedItemIndex: -1,
                totalMeet: 0,
                isEditing: null,
                isOperationsSuccess: false,
                reject: false,
                checkbox: false,
                menu: false,
                menu2: false,
                tanggal: new Date().toISOString(),
                alasan: "",
                headers: [
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
                        // "id": 1,
                        "perihal": "",
                        "tempat": "",
                        "tanggal": "",
                        "waktu": "",
                        "Status": "",
                        "deskripsi": "",
                    },
                ],
                people: [
                    {
                        "id": "1",
                        "username": "laha",
                    }
                ],
                alasanRules : [
                    v => !!v || 'Alasan is required',
                    v => (v && v.length <= 250) || 'Alasan must be less than 250 characters',
                    v => (v && v.length >= 4) || 'Alasan must be more than 4 characters',
                ],
                checkboxRules : [
                    $v => !!$v || 'You must agree to continue!'
                ],
                defaultItem : {
                    perihal: '',
                    tempat: '',
                    tanggal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    waktu: '',
                    status: '',
                    deskripsi: '',
                },
            };
        },
        methods: {
            getColor (status) {
            if (status == '1') return 'blue'
            if (status == '2') return 'light-green accent-4'
            else return 'red'
            },
            async countPengajuan() {
                const getCount = await this.$axios("http://localhost:8080/meet/count-meet-process-all");
                this.totalMeet = getCount.data.total;
                // console.log("data", getData);
            },
            // async getPengajuanPosition(){
            //     const receiver = this.$store.state.authentication.user.position;
            //     const getData = await this.$axios(`http://localhost:8080/meet/process-receiver/${receiver}`);
            //     this.meet = getData.data;
            // },
            async getPengajuan() {
                // const userId = this.$store.state.authentication.user.id;
                const getData = await this.$axios(`http://localhost:8080/meet/process-all`);
                // if(getData.data.id == userId) {
                    this.meet = getData.data;
                // }
                // console.log("data", getData)
            },
            async getParticipants(){
                // const username  = this.$store.state.authentication.user.username;
                const getData = await this.$axios(`http://localhost:8080/api/auth/user`);
                this.people = getData.data;
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
                this.dialog = true;
            },
            deleteItem(item) {
                this.selectedItemIndex = this.meet.indexOf(item);
                this.dialogDelete = true;
            },
            close () {
                this.dialog = false
                this.isEditing = false
                this.$nextTick(() => {
                    this.selectedItemIndex = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },
            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.selectedItemIndex = -1;
                });
            },
            closeDialog (){
                this.$refs.form.reset()
                this.dialogReject = false
            },
            closeDialogReject (){
                this.dialog = false
                this.dialogReject = false
                this.dialogUpdateReject = false
            },
            async deleteItemConfirm() {
                const deleteMeet = this.meet[this.selectedItemIndex];
                this.$axios
                    .delete(`http://localhost:8080/meet/${deleteMeet.id}`)
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
                        url: 'http://localhost:8080/meet/update-success' ,
                        data: Object.assign(this.meet[this.editedIndex], this.selectedItemIndex, this.selectedItemIndex.status = '2')
                        })
                        .then(response => {
                            this.isOperationsSuccess = true
                            this.dialogUpdate = true
                            this.isEditing = false
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
            async validate () {
                this.$refs.form.validate()
                if(this.$refs.form.validate()){
                    const id = this.selectedItemIndex.id;
                    const status = '4';
                    // const data = {alasan : this.alasan, status, id}
                    // console.log(data)
                    this.$axios({
                        method: 'put',
                        url: 'http://localhost:8080/meet/update-reject',
                        data : {
                            alasan: this.alasan, 
                            status, 
                            id
                        }
                    }).then(response => {
                        this.isOperationsSuccess = true,
                        this.dialogUpdateReject = true,
                        console.log(response.data)
                    }).catch(e => {
                        this.isOperationsSuccess = false
                        this.dialogUpdateReject = true
                        console.log(e, 'error')
                        console.log(e.response.data.message)
                    })
                }
            },
            remove (item) {
                const index = this.participants.indexOf(item.username)
                if (index >= 0) this.participants.splice(index, 1)
            },
        },
        mounted() {
            this.countPengajuan();
            // this.getPengajuanPosition();
            this.getPengajuan();
            this.getParticipants();
            if (!this.currentUser) {
                this.$router.push('/');
            }
        },
        computed:{
            success(){
                return  this.isOperationsSuccess;
            },
            currentUser() {
                return this.$store.state.authentication.user;
            },
            computedDateFormattedMomentjs () {
                return this.selectedItemIndex.tanggal ? moment(this.selectedItemIndex.tanggal).format('dddd, DD MMMM YYYY') : ''
            },
        }
    }
    </script>
    <style>
        .subheader {
            font-size: 1.2em;
        }
    </style>