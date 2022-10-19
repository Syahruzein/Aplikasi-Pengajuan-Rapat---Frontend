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
            <v-btn
              color="primary ml-2"
              dark
              class="mb-2"
              to="/user/kadep/Pengajuan"
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
                                                    <b class="subheader">Saya </b> 
                                                    <br> 
                                                    kepada {{ selectedItemIndex.receiver }}
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
                                                <v-list-item-title>Kepada</v-list-item-title>
                                                    <v-select
                                                        :disabled="!isEditing"
                                                        v-model="selectedItemIndex.receiver"
                                                        :items="executive"
                                                        item-text="position"
                                                        item-value="position"
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
                                            @click="deleteItem()"
                                        >
                                            Delete
                                        </v-btn>
                                <v-btn
                                    class="white--text"
                                    color="bg-gradient-secondary"
                                    @click="close"
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
        deleteItem() {
            // this.selectedItemIndex = this.meet.indexOf(item);
            this.dialogDelete = true;
        },
        close () {
            this.dialog = false
            this.isEditing = false
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
        this.getParticipants();
        if (!this.currentUser) {
            this.$router.push('/');
        }
    },
    computed:{
        success(){
            return  this.isOperationsSuccess
        },
        currentUser() {
            return this.$store.state.authentication.user;
        },
        computedDateFormattedMomentjs () {
            return this.selectedItemIndex.tanggal ? moment(this.selectedItemIndex.tanggal).format('DD MMMM YYYY') : ''
        },
    }
}
</script>
<style>
    .subheader {
        font-size: 1.2em;
    }
</style>