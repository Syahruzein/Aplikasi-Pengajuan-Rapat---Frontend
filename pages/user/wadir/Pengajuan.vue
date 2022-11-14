<template>
    <div>
        <v-card
        class=" pa-6 mt-4"
        outlined
        tile
        >
            <v-card elevation="3" class="pa-8">
                <v-form ref="form" v-model="valid"  lazy-validation>

                    <v-text-field
                    outlined
                    v-model="perihal"
                    :rules="perihalRules"
                    prefix="Rapat - "
                    label="Perihal"
                    required
                    ></v-text-field>

                    <v-text-field
                    outlined
                    v-model="tempat"
                    :rules="tempatRules"
                    label="Tempat"
                    required
                    ></v-text-field>                    
                    
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                                <v-dialog
                                    ref="dialog1"
                                    v-model="modal"
                                    :return-value.sync="tanggal"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="tanggal"
                                            outlined
                                            label="Tanggal"
                                            prepend-icon="mdi-calendar"
                                            :rules="tanggalRules"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="tanggal"
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="modal = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.dialog1.save(tanggal)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <v-dialog
                                ref="dialog2"
                                v-model="modal2"
                                :return-value.sync="waktu"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="waktu"
                                        outlined
                                        label="Waktu"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        :rules="waktuRules"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="modal2"
                                    v-model="waktu"
                                    full-width
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="modal2 = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.dialog2.save(waktu)"
                                    >
                                        OK
                                    </v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>

                    <v-select
                    v-model="receiver"
                    :rules="receiverRules"
                    :items="executive"
                    label="Kepada"
                    item-text="position"
                    item-value="position"
                    outlined
                    required
                    @change="except"
                    >
                        <template v-slot:selection="data">
                            {{ data.item.position }}
                        </template>
                    </v-select>

                    <v-row class="mt-0 mb-0 pl-3 pr-3">
                    <v-checkbox
                    v-model="enabled"
                    hide-details
                    ></v-checkbox>
                    
                    <v-autocomplete
                        v-model="participants"
                        :disabled="!enabled"
                        :items="people"
                        outlined
                        chips
                        color="blue-grey lighten-2"
                        label="Peserta"
                        item-text="username"
                        item-value="username"
                        multiple
                        clearable
                        deletable-chips
                        single-line
                        required
                        >
                        <template v-slot:prepend-item>
                            <v-list-item
                            ripple
                            @mousedown.prevent
                            @click="toggle"
                            >
                                <v-list-item-action>
                                   <v-icon :color="participants.length > 0 ? 'indigo darken-4' : ''">
                                        {{ icon }}
                                   </v-icon> 
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Select All
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-autocomplete>
                    </v-row>
                    
                    <v-textarea
                    outlined
                    name="input-7-4"
                    v-model="deskripsi"
                    label="Agenda"
                    :rules="deskripsiRules"
                    required
                    ></v-textarea>

                    <v-checkbox
                    v-model="checkbox"
                    :rules="checkboxRules"
                    label="Do you agree?"
                    required
                    ></v-checkbox>


                    <v-dialog
                    v-model="dialog"
                    max-width="50rem"
                    transition="dialog-bottom-transition"
                    persistent
                    >
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >
                            <h2 v-if="success">Pengajuan rapat berhasil disimpan</h2>
                            <h2 v-if="!success">Pengajuan rapat gagal tersimpan</h2>
                            </v-toolbar>
                            <v-card-text>
                            <div class="text pa-12">
                                <h2 v-if="success">Anda bisa memeriksa di Data Pengajuan, klik dibawah ini :</h2>
                                <h2 v-if="!success">Anda bisa mencoba mengajukan lagi, klik dibawah ini :</h2>
                                </div>
                            </v-card-text>
                            <v-card-actions v-if="!success" class="justify-end">
                            <v-btn
                                class="white--text"
                                color="bg-gradient-secondary"
                                @click="dialog = !dialog"
                            >Close</v-btn>
                            </v-card-actions>
                            <v-card-actions v-if="success" class="justify-end">
                            <v-btn
                                class="white--text"
                                color="bg-gradient-secondary"
                                @click="closeDialog"
                            >Close</v-btn>
                            <v-btn
                                class="white--text"
                                color="bg-gradient-info"
                                @click.stop="closeDialog"
                                :to="`/user/wadir/DataPengajuan`"
                            >Lihat</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn
                    :disabled="!valid"
                    class="white--text mr-4 mt-4"
                    color="bg-gradient-info"
                    @click="validate"
                    >
                    submit
                    </v-btn>
                    <v-btn 
                    class="white--text mt-4"
                    color="bg-gradient-secondary"
                    @click="clear"
                    >
                    clear
                    </v-btn>
                </v-form>
            </v-card>
        </v-card>
    </div>
</template>
<script>

    export default {
        data: () => ({     
            modal: false,
            modal2: false,
            dialog: false,
            checkbox: false,
            enabled: false,
            // editItem : {},
                perihal: '',
                tempat: '',
                tanggal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                waktu: '',
                status: '1',
                receiver: '',
                participants: [],
                deskripsi: '',
                executive: [
                    {
                        "position": "",
                    }
                ],
                selectedItemIndex: -1,
                people: [
                    // { header: 'Tambah peserta rapat' },
                    { 
                        
                        "id": "4" ,
                        "username": "Sandra Adams" 
                    },
                ],

                people2: [{}],
            
            isOperationsSuccess: false,
            valid: false,

            perihalRules : [
                v => !!v || 'Perihal is required',
                v => (v && v.length <= 30) || 'Perihal must be less than 30 characters',
                v => (v && v.length >= 4) || 'Perihal must be more than 4 characters',
            ],
            tempatRules : [
                v => !!v || 'Tempat is required',
                v => (v && v.length >= 4) || 'Tempat must be more than 4 characters',
            ],
            tanggalRules : [
                v => !!v || 'Tanggal is required',
            ],
            waktuRules : [
                v => !!v || 'Waktu is required',
            ],
            receiverRules : [
                v => !!v || 'Penerima is required',
            ],
            participantsRules : [
                v => !!v || 'Peserta is required',
                v => (v && v.length > 0 ) || 'Peserta required'
            ],
            deskripsiRules : [
                v => !!v || 'Deskripsi is required',
                v => (v && v.length <= 250) || 'Deskripsi must be less than 250 characters',
                v => (v && v.length >= 4) || 'Deskripsi must be more than 4 characters',
            ],
            checkboxRules : [
                $v => !!$v || 'You must agree to continue!'
            ]
        }),
        computed: {
            currentUser(){
                return this.$store.state.authentication.user;
            },
            // ...mapState({
            //     user: state => state.authentication
            // }),
            success(){
                return  this.isOperationsSuccess
            },
            likeAllParticipants () {
                return this.participants.length === this.people.length
            },
            likeSomeParticipants () {
                return this.participants.length > 0 && !this.likeAllParticipants
            },
            icon () {
                if (this.likeAllParticipants) return 'mdi-close-box'
                if (this.likeSomeParticipants) return 'mdi-minus-box'
                return 'mdi-checkbox-blank-outline'
            }
        },        
        methods: {
            async validate () {
                this.$refs.form.validate()
                if(this.$refs.form.validate()){
                    // const data = this.editItem;
                    const nameUser = this.$store.state.authentication.user.username;                    
                    await this.$axios({
                        // withCredentials:true,
                        method: 'post',
                        url: 'http://localhost:8080/meet/submission',
                        data: {
                            perihal: 'Rapat ' + this.perihal,
                            tempat: this.tempat,
                            tanggal: this.tanggal,
                            waktu: this.waktu,
                            status: this.status,
                            receiver: this.receiver,
                            participants: this.participants,
                            deskripsi: this.deskripsi,
                            user_id: JSON.stringify(this.$store.state.authentication.user.id),
                            maker: nameUser,
                        }
                    }).then(response => {
                        this.isOperationsSuccess = true
                        this.dialog = true
                        console.log(response.data)
                    })
                    .catch(e => {
                        this.isOperationsSuccess = false
                        this.dialog = true
                        console.log(e, 'error')
                        console.log(e.response.data.message)
                    })
                }
            },
            async getParticipants (){
                const username  = this.$store.state.authentication.user.username;
                // const position = this.receiver;
                // console.log(username);
                // console.log(position);
                const getData = await this.$axios(`http://localhost:8080/api/auth/user-invite/${username}`);
                this.people = getData.data;
                this.people2 = getData.data;
            },
            async getReceiver () {
                const getData = await this.$axios(`http://localhost:8080/api/auth/director`);
                this.executive = getData.data;
            },  
            except() {
                const exception = this.people2.map(item => {
                    if(item.position != this.receiver){
                        return item;
                    }
                })
                this.people = exception
            },
            clear () {
                this.$refs.form.reset()
            },
            remove (item) {
                const index = this.participants.indexOf(item.username)
                if (index >= 0) this.participants.splice(index, 1)
            },
            closeDialog () {
                this.$refs.form.reset()
                this.dialog = false
            },
            toggle () {
                this.$nextTick(() => {
                    if (this.likeAllParticipants) {
                        this.participants = []
                    } else {
                        this.participants = this.people.slice()
                    }
                })
            }
        },
        mounted() {
            this.getParticipants();
            this.getReceiver();
            if (!this.currentUser) {
            this.$router.push('/');
            }
        },
    }
</script>
<style>
    .text__cursor input{
        cursor: pointer;
    }
</style>