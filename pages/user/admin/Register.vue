<template>
  <div>
    <h2 class="mt-2">Tambah Pengguna</h2>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-card
            elevation="2"
            outlined
            shaped
            class="mt-5 pa-13"
            width="50rem"
          >
            <v-form 
              ref="form" 
              v-model="valid" 
              lazy-validation
            >
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                :counter="60"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field 
                v-model="password" 
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                :type="show1 ? 'text' : 'password'" 
                :rules="passwordRules"
                name="input-10-1" 
                label="Password" 
                hint="At least 8 characters" 
                counter @click:append="show1 = !show1"
              ></v-text-field>
              <v-autocomplete
                v-model="position"
                :rules="positionRules"
                :items="itemPosition"
                label="Jabatan"
                required
              ></v-autocomplete>
              <v-autocomplete
                v-model="roles"
                :rules="rolesRules"
                :items="items"
                label="Roles"
                required
              ></v-autocomplete>        
              <v-checkbox
                v-model="checkbox"
                :rules="checkboxRules"
                label="Do you agree?"
                required
              ></v-checkbox>
      
              <!-- <p class="ml-1 mb-5 text-subtitle-1" >
              Sudah punya akun?
                <a
                  href="./login"    
                  style="text-decoration: none;"
                >Masuk</a>
              </p>   -->
      
              <v-btn
                class="mr-4 white--text"
                color="bg-gradient-info"
                :disabled="!valid"
                @click="validate"
              >
                submit
              </v-btn>
              <v-btn @click="clear" color="bg-gradient-secondary" class="white--text">
                clear
              </v-btn>
            </v-form>
          </v-card>
      
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
                    <h2 v-if="success">Berhasil mendaftar</h2>
                    <h2 v-if="!success">Gagal mendaftar</h2>
                    </v-toolbar>
                    <v-card-text>
                    <div class="text pa-12">
                        <h2 v-if="success">Ok untuk lanjut, klik dibawah ini :</h2>
                        <h2 v-if="!success">Anda bisa mencoba mendaftar lagi, klik dibawah ini :</h2>
                        </div>
                    </v-card-text>
                    <v-card-actions v-if="!success" class="justify-end">
                    <v-btn
                        class="white--text"
                        color="bg-gradient-info"
                        @click="dialog = !dialog"
                    >Close</v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="success" class="justify-end">
                    <v-btn
                        class="white--text"
                        color="bg-gradient-info"
                        @click.stop="cleared"
                        >Ok</v-btn>
                        <!-- :to="`./login`" -->
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>
    <script>
    
    export default {
        name: "RegisterEksekutif",
        data: () => ({
            username: "",
            email: "",
            password: "",
            roles: "",
            position: "",
            items: [`kaprodi`, `kadep`, `wadir`, `director`, `staff`, `admin`],
            itemPosition: [`Direktur`, 
                        `Wakil Direktur Bidang Akademik`, 
                        `Wakil Direktur Bidang Umum dan Keuangan`,
                        `Wakil Direktur Bidang Kemahasiswaan dan Sumber Daya Manusia`,
                        `Wakil Direktur Bidang Kerjasama dan Teknologi`,
                        `Kepala Departemen Teknik Elektro`,
                        `Kepala Departemen Teknik Informatika dan Komputer`,
                        `Kepala Departemen Teknik Mekanika dan Energi`,
                        `Kepala Departemen Teknologi Multimedia Kreatif`,
                        `Ketua Program Studi S2 Teknik Elektro`,
                        `Ketua Program Studi S2 Teknik Informatika dan Komputer`,
                        `Ketua Program Studi Sarjana Terapan Teknik Elektronika`,
                        `Ketua Program Studi D3 Teknik Elektronika`,
                        `Ketua Program Studi Sarjana Terapan Teknik Telekomunikasi`,
                        `Ketua Program Studi D3 Teknik Telekomunikasi`,
                        `Ketua Program Studi Sarjana Terapan Teknik Elektro Industri`,
                        `Ketua Program Studi D3 Teknik Elektro Industri`,
                        `Ketua Program Studi Sarjana Terapan Teknologi Rekayasa Internet`,
                        `Ketua Program Studi Sarjana Terapan Teknik Informatika`,
                        `Ketua Program Studi D3 Teknik Informatika`,
                        `Ketua Program Studi Sarjana Terapan Teknik Komputer`,
                        `Ketua Program Studi Sarjana Terapan Sains Data Terapan`,
                        `Ketua Program Studi Sarjana Terapan Teknik Mekatronika`,
                        `Ketua Program Studi Sarjana Terapan Teknik Sistem Pembangkitan Energi`,
                        `Ketua Program Studi D3 Teknik Multimedia Broadcasting`,
                        `Ketua Program Studi Sarjana Terapan Teknologi Game`,
                        `Ketua Program Studi Sarjana Terapan Teknologi Rekayasa Multimedia`,
                        `Ketua Program PJJ Teknik Informatika`,
                        `Ketua Program Sarjana Terapan-PJJ Teknik Telekomunikasi`,
                        `Ketua Program Studi D3 Teknik Informatika PSDKU Lamongan`,
                        `Ketua Program Studi D3 Multimedia Broadcasting PSDKU Lamongan`,
                        `Ketua Ketua Program Studi D3 Teknik Informatika PSDKU Sumenep`,
                        `Ketua Program Studi D3 Multimedia Broadcasting PSDKU Sumenep`,
                        `Sekretaris`
                      ],
            checkbox: false,
            dialog: false,
            show1: false,
            show2: false,
            valid: false,
            isOperationsSuccess: false,
            usernameRules: [
              v => !!v || 'Username is required',     
              v => (v && v.length <= 60) || 'Username must be less than 60 characters',
            ],
            emailRules: [
              v => !!v || 'E-mail is required',     
              v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid. like username@pens.ac.id',
            ],
            passwordRules: [
              v => !!v || 'Password is required',
              v => (v && v.length >= 8) || 'Password must be more than 8 characters',
            ],
            rolesRules: [
              v => !!v || 'Roles is required'
            ],
            positionRules: [
              v => !!v || 'Position is required'
            ],
            checkboxRules: [
              v => !!v || 'You must agree to continue!'
            ]
        }),
        computed: {
            success(){
                return  this.isOperationsSuccess
            }
        },
        methods: {
            validate() {
                this.$refs.form.validate();
                if(this.$refs.form.validate()) {
                  this.$axios
                    .post('http://localhost:8080/api/auth/signupdirector',{
                      username : this.username,
                      email : this.email,
                      password : this.password,
                      position: this.position,
                      roles : this.roles.split(","),
                    })
                  .then(response => {
                      this.isOperationsSuccess = true
                      this.dialog = true
                      console.log(response.data)
                  })
                  .catch(e => {
                      this.isOperationsSuccess = false
                      this.dialog = true
                      console.log(e)
                  })
                }
            },
            clear() {
                this.$refs.form.reset();
            },
            cleared() {
                this.$refs.form.reset();
                this.dialog = false
            },
        },
    }
    </script>
    <style>
      .btn--text {
        background-image: linear-gradient(310deg, #2152ff 0%, #21d4fd 100%); /* Primary; */
        color: white;
        transform: scale(1.04);
        box-shadow: 0 5px 8px 0 rgba(0,0,0,0.24), 0 9px 25px 0 rgba(0,0,0,0.19);
        }
    </style>
    