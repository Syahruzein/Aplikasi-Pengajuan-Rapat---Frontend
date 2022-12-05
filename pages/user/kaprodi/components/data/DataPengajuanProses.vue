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
            <v-btn
              color="primary ml-2"
              dark
              class="mb-2"
              to="/user/kaprodi/Pengajuan"
            >
              Ajukan
            </v-btn>
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
                        max-width="50rem"
                        transition="dialog-bottom-transition"
                        >
                            <v-card>
                                <v-toolbar
                                color="primary"
                                dark
                                ><h2>Detail pengajuan rapat</h2></v-toolbar>
    
                                <v-card-text>
                                    <v-container>
                                        <v-list
                                            three-line
                                            subheader
                                        >
                                            <v-subheader class="pt-4 mb-2">
                                                <p>
                                                    Dari : <b class="subheader">{{ selectedItemIndex.maker }} </b> 
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
                                                    @click:clear="selectedItemIndex.tanggal = null"
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
                                                    :headers="headers"
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
                                                    :headers="headers"
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
                                                    :headers="headers"
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
                                                <v-list-item-title>Kepada</v-list-item-title>
                                                    <v-select
                                                        :disabled="!isEditing"
                                                        v-model="selectedItemIndex.receiver"
                                                        :items="executive"
                                                        required
                                                        item-text="position"
                                                        item-value="position"
                                                        @change="except"
                                                    ></v-select>
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
                                            @click="deleteItem()"
                                        >
                                            Delete
                                        </v-btn>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-secondary"
                                    @click="close"
                                    to="/user/kaprodi/DataPengajuan"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    :disabled="!isEditing"
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
                                    <h2 v-if="!success">
                                        <v-alert
                                        dense
                                        outlined
                                        type="error"
                                        transition="scale-transition"
                                        class="pb-6"
                                        >
                                          <h3><strong>Pemberitahuan !!!</strong></h3>
                                          <br><i>Mohon ma'af. Pengajuan rapat sudah dipesan.</i> 
                                        </v-alert>
                                        <br><strong>Anda bisa mencoba mengajukan lagi, klik dibawah ini :</strong>
                                    </h2>
                                    </div>
                                </v-card-text>
                                <v-card-actions v-if="!success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-secondary"
                                    @click="closeUpdate"
                                >Close</v-btn>
                                </v-card-actions>
                                <v-card-actions v-if="success" class="justify-end">
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-info"
                                    @click="closeUpdate"
                                    to="/user/kaprodi/DataPengajuan"
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
            isEditing: null,
            isOperationsSuccess: false,
            menu: false,
            menu2: false,
            alerts: false,
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
            headers: [
                // { text: "ID", value: "id" },
                { text: "Perihal", value: "perihal" },
                { text: "Tempat", value: "tempat" },
                { text: "Tanggal", value: "tanggal" },
                { text: "Waktu", value: "waktu" },
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
            checkboxRules: [($v) => !!$v || "You must agree to continue!"],
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
        async getMeet() {
            const getData = await this.$axios(
                `http://localhost:8080/meet/process-and-success`
            );
            this.dateCheck = getData.data;
        },
        async countPengajuan() {
            const user_id = this.$store.state.authentication.user.id;
            const getCount = await this.$axios(`http://localhost:8080/meet/count-meet-process/${user_id}`);
            this.totalMeet = getCount.data.total;
            // console.log("data", getData);
        },
        async getPengajuan() {
            const user_id = this.$store.state.authentication.user.id;
            const getData = await this.$axios(`http://localhost:8080/meet/process/${user_id}`);
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
            const username = this.$store.state.authentication.user.username;
            const getData = await this.$axios(`http://localhost:8080/api/auth/user-invite/${username}`);
            this.people = getData.data;
            this.people2 = getData.data;
        },
        except() {
            const exception = this.people2.map((item) => {
                if (item.position != this.selectedItemIndex.receiver) {
                    return item;
                }
            });
            this.people = exception;
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
            this.except(this.editedIndex);
            this.dialog = true;
        },
        deleteItem() {
            // this.selectedItemIndex = this.meet.indexOf(item);
            this.dialogDelete = true;
        },
        close () {
            this.dialog = false
            this.isEditing = false
            this.alerts = false
            this.$nextTick(() => {
                this.selectedItemIndex = Object.assign({}, this.defaultItem)
                // window.$nuxt.refresh()
                // window.location.reload(true)
            this.editedIndex = -1
            })
        },
        closeUpdate () {
            this.dialogUpdate = false;
            this.alerts = false;
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
            let finalParticipants = this.selectedItemIndex.participants;
            if(this.isSelectAll){
                finalParticipants = finalParticipants.filter(item=> item != undefined).map((item) => item.username)
            }
            if (this.editedIndex > -1) {
                    this.$axios({
                    method: 'put',
                    url: 'http://localhost:8080/meet/update-process' ,
                    data: Object.assign(this.meet[this.editedIndex], this.selectedItemIndex, this.selectedItemIndex.participants = finalParticipants), 
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
        remove (item) {
            const index = this.selectedItemIndex.participants.indexOf(item.username)
            if (index >= 0) this.selectedItemIndex.participants.splice(index, 1)
        },
    },
    mounted() {
        this.countPengajuan();
        this.getPengajuan();
        this.getReceiver();
        this.getMeet();
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