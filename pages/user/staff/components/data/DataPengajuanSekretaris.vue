<template>
    <div>
        <v-card
        v-if="showStaff"
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
                                                    Dari : <b class="subheader">  {{ selectedItemIndex.maker }} </b> 
                                                    <br> 
                                                    Kepada : {{ selectedItemIndex.receiver }}
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
                                                <v-dialog
                                                ref="menu"
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :return-value.sync="selectedItemIndex.tanggal"
                                                transition="scale-transition"
                                                offset-y
                                                persistent
                                                max-width="290px"
                                                min-width="290px"
                                                >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                    :disabled="!isEditing"
                                                    :value="computedDateFormattedMomentjs"
                                                    clearable
                                                    prepend-icon="mdi-calendar"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="selectedItemIndex.tanggal"
                                                    no-title
                                                    scrollable
                                                    @change="triple"
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
                                                        @click="$refs.menu.save(selectedItemIndex.tanggal); alerts = true;"
                                                    >
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                                </v-dialog>
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Waktu</v-list-item-title>
                                                <v-dialog
                                                ref="menu2"
                                                v-model="menu2"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="selectedItemIndex.waktu"
                                                transition="scale-transition"
                                                offset-y
                                                persistent
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
                                                @change="timedi"
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
                                            </v-dialog>
                                            </v-list-item-content>
                                            </v-list-item>

                                            <v-alert
                                                :value="alerts"
                                                outlined
                                                color="cyan"
                                                border="left"
                                                type="info"
                                                transition="scale-transition"
                                                >
                                                <v-row>

                                                    <v-col
                                                    v-if="(fixDateCheck.length === 0)"
                                                    >
                                                        <p class="black--text">
                                                        Belum ada yang mengajukan hari yang dipilih. Anda bisa mengajukan rapat!!.
                                                        </p>
                                                        <v-data-table
                                                        :headers="headers2"
                                                        :items="fixDateCheck"
                                                        sort-by="waktu"
                                                        class="elevation-1"
                                                        >
                                                        <template v-slot:[getItemTanggal()]="{ item }">
                                                            <span>{{ new Date(item.tanggal).toLocaleDateString('da') }}</span>
                                                            <!-- da-DK -->
                                                        </template>
                                                        </v-data-table>
                                                        <p class="red--text pt-6">
                                                        <i>
                                                            Catatans : Rapat maksimal dalam 1 hari adalah 3 kali dan Jika ada waktu yang sudah dipesan. Anda tidak akan bisa memilih waktu dengan jangkauan 2 jam sebelumnya dan 2 jam setelahnya !!!. Terima kasih.
                                                        </i>
                                                        </p>
                                                    </v-col>

                                                    <v-col
                                                    v-if="(fixDateCheck.length >= 3)"
                                                    >
                                                        <p class="red--text">
                                                        Hari yang dipilih sudah penuh. Mohon ma'af, tidak bisa mengajukan rapat!!.
                                                        <br>Berikut detail rapat yang sudah ada :
                                                        </p>
                                                        <v-data-table
                                                        :headers="headers2"
                                                        :items="fixDateCheck"
                                                        sort-by="waktu"
                                                        class="elevation-1"
                                                        >
                                                        <template v-slot:[getItemTanggal()]="{ item }">
                                                            <span>{{ new Date(item.tanggal).toLocaleDateString('da') }}</span>
                                                            <!-- da-DK -->
                                                        </template>
                                                        </v-data-table>
                                                        <p class="red--text pt-6">
                                                        <i>
                                                            Catatans : Rapat maksimal dalam 1 hari adalah 3 kali dan Jika ada waktu yang sudah dipesan. Anda tidak akan bisa memilih waktu dengan jangkauan 2 jam sebelumnya dan 2 jam setelahnya !!!. Terima kasih.
                                                        </i>
                                                        </p>
                                                    </v-col>
                                                    
                                                    <v-col
                                                    v-if="(fixDateCheck.length >= 1 && fixDateCheck.length < 3)"
                                                    >
                                                        <p class="black--text">
                                                        Masih bisa mengajukan hari yang dipilih. Anda bisa mengajukan rapat!!.
                                                        <br>Berikut detail rapat yang sudah ada :
                                                        </p>
                                                        <v-data-table
                                                        :headers="headers2"
                                                        :items="fixDateCheck"
                                                        sort-by="waktu"
                                                        class="elevation-1"
                                                        >
                                                        <template v-slot:[getItemTanggal()]="{ item }">
                                                            <span>{{ new Date(item.tanggal).toLocaleDateString('da') }}</span>
                                                            <!-- da-DK -->
                                                        </template>
                                                        </v-data-table>
                                                        
                                                        <p class="red--text pt-6">
                                                        <i>
                                                            Catatans : Rapat maksimal dalam 1 hari adalah 3 kali dan Jika ada waktu yang sudah dipesan. Anda tidak akan bisa memilih waktu dengan jangkauan 2 jam sebelumnya dan 2 jam setelahnya !!!. Terima kasih.
                                                        </i>
                                                        </p>
                                                    </v-col>

                                                    <v-divider vertical></v-divider>
                                                    <v-btn
                                                    color="red"
                                                    icon
                                                    dark
                                                    @click="alerts = false"
                                                    >
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-alert>

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
                                                clearable
                                                single-line
                                                required
                                                >
                                                    <template v-slot:prepend-item>
                                                        <v-list-item ripple @mousedown.prevent @click="toggle">
                                                        <v-list-item-action>
                                                            <v-icon
                                                            :color="selectedItemIndex.participants.length > 0 ? 'indigo darken-4' : ''"
                                                            >
                                                            {{ icon }}
                                                            </v-icon>
                                                        </v-list-item-action>
                                                        <v-list-item-content>
                                                            <v-list-item-title> Select All </v-list-item-title>
                                                        </v-list-item-content>
                                                        </v-list-item>
                                                        <v-divider class="mt-2"></v-divider>
                                                    </template>
                                                    <template v-slot:selection="data">
                                                        <v-chip
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"
                                                        color="yellow"
                                                        @click="data.select"
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
                                    :redirect="`/user/staff/DataPengajuan`"
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
                                    <h2 v-if="!success">
                                        <v-alert
                                        dense
                                        outlined
                                        type="error"
                                        transition="scale-transition"
                                        class="pb-6"
                                        >
                                          <h3><strong>Pemberitahuan !!!</strong></h3>
                                          <br><i>Mohon ma'af. Rapat yang dikonfirmasi sudah dipesan.</i> 
                                        </v-alert>
                                        <br><strong>Anda bisa mencoba mengkonfirmasi lagi, klik dibawah ini :</strong>
                                    </h2>
                                    </div>
                                </v-card-text>
                                <v-card-actions v-if="!success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
                                    @click="closeDialogUpdate"
                                    :redirect="`/user/staff/DataPengajuan`"
                                >Close</v-btn>
                                </v-card-actions>
                                <v-card-actions v-if="success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
                                    @click="closeDialogUpdate"
                                    :to="`/user/staff/Jadwal`"
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
                                    to="/user/staff/DataPengajuan"
                                >Close</v-btn>
                                </v-card-actions>
                                <v-card-actions v-if="success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
                                    @click.stop="closeDialogReject"
                                    :redirect="`/user/staff/DataPengajuan`"
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
                alerts: false,
                tanggal: new Date().toISOString(),
                alasan: "",
                headers: [
                    { text: "Dari", value: "maker" },
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
                headers2: [
                    // { text: "ID", value: "id" },
                    { text: "Perihal", value: "perihal" },
                    { text: "Tempat", value: "tempat" },
                    { text: "Tanggal", value: "tanggal" },
                    { text: "Waktu", value: "waktu" },
                ],
                people: [
                    {
                        "id": "1",
                        "username": "laha",
                    }
                ],
                people2: [{}],
      
                dateCheck: [{}],

                fixDateCheck: [{}],

                fixTimeCheck: [{}],
                valid: false,

                perihalRules: [
                (v) => !!v || "Perihal is required",
                (v) => (v && v.length <= 30) || "Perihal must be less than 30 characters",
                (v) => (v && v.length >= 4) || "Perihal must be more than 4 characters",
                ],
                tempatRules: [
                (v) => !!v || "Tempat is required",
                (v) => (v && v.length >= 4) || "Tempat must be more than 4 characters",
                ],
                tanggalRules: [(v) => !!v || "Tanggal is required"],
                waktuRules: [(v) => !!v || "Waktu is required"],
                receiverRules: [(v) => !!v || "Penerima is required"],
                participantsRules: [
                (v) => !!v || "Peserta is required",
                (v) => (v && v.length > 0) || "Peserta required",
                ],
                deskripsiRules: [
                (v) => !!v || "Deskripsi is required",
                (v) =>
                    (v && v.length <= 250) || "Deskripsi must be less than 250 characters",
                (v) => (v && v.length >= 4) || "Deskripsi must be more than 4 characters",
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
                    participants: [],
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
            async getMeet() {
                const getData = await this.$axios(
                    `http://localhost:8080/meet/process-and-success`
                );
                this.dateCheck = getData.data;
            },
            async getPengajuan() {
                // const userId = this.$store.state.authentication.user.id;
                const getData = await this.$axios(`http://localhost:8080/meet/process-all`);
                // if(getData.data.id == userId) {
                    this.meet = getData.data;
                // }
                // console.log("data", getData)
            },
            async getParticipants(){
                const username  = this.$store.state.authentication.user.username;
                const getData = await this.$axios(`http://localhost:8080/api/auth/user-invite/${username}`);
                this.people = getData.data;
                this.people2 = getData.data;
            },
            triple() {
                const triplying = this.dateCheck.filter((item) => {
                    return moment(item.tanggal).isSame(new Date(this.selectedItemIndex.tanggal), "day")
                })
                if(triplying.length >= 3) {
                    console.log("error")
                } else {
                    console.log('betul')
                }
                this.fixDateCheck = triplying;
                console.log(this.fixDateCheck);
            },
            timedi() {
                const timede = this.dateCheck.filter((item) => {
                    return moment(item.tanggal).isSame(new Date(this.selectedItemIndex.tanggal), "day")
                }).filter((item)=> {
                    var format = 'HH:mm'
                    const time = moment(this.selectedItemIndex.waktu, format);
                    const beforeTime = moment(item.waktu, format).add(-2, 'hours');
                    const afterTime = moment(item.waktu, format).add(2, 'hours');
                    // console.log(time, beforeTime, afterTime)
                    if(time.isBetween(beforeTime, afterTime)) {
                        console.log('tidak boleh')
                    }
                })
                this.fixTimeCheck = timede;
            },
            toggle() {
                this.$nextTick(() => {
                    this.selectedItemIndex.participants = this.people;
                    this.isSelectAll = true;
                });
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
                this.alerts = false
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
            closeDialogUpdate() {
                this.dialogUpdate = false;
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
                let finalParticipants = this.selectedItemIndex.participants;
                if(this.isSelectAll){
                    finalParticipants = finalParticipants.filter(item=> item != undefined).map((item) => item.username)
                }
                if (this.editedIndex > -1) {
                        this.$axios({
                        method: 'put',
                        url: 'http://localhost:8080/meet/update-success' ,
                        data: Object.assign(this.meet[this.editedIndex], this.selectedItemIndex, this.selectedItemIndex.status = '2', this.selectedItemIndex.participants = finalParticipants)
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
            this.getMeet();
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
            showStaff(){
                if (this.currentUser && this.currentUser.roles) {
                    return this.currentUser.roles.includes('ROLE_STAFF')
                }

                return false;
            },
            computedDateFormattedMomentjs () {
                return this.selectedItemIndex.tanggal ? moment(this.selectedItemIndex.tanggal).format('dddd, DD MMMM YYYY') : ''
            },
            likeAllParticipants() {
                return this.selectedItemIndex.participants.length === this.people.length;
            },
            likeSomeParticipants() {
                return this.selectedItemIndex.participants.length > 0 && !this.likeAllParticipants;
            },
            icon() {
                if (this.likeAllParticipants) return "mdi-close-box";
                if (this.likeSomeParticipants) return "mdi-minus-box";
                return "mdi-checkbox-blank-outline";
            },
        }
    }
    </script>
    <style>
        .subheader {
            font-size: 1.2em;
        }
    </style>