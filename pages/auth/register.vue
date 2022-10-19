<template>
<div>
    <v-card
      elevation="2"
      outlined
      shaped
      class="mt-10 pa-13"
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
          :counter="10"
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
          :rules="usernameRules"
          name="input-10-1" 
          label="Password" 
          hint="At least 8 characters" 
          counter @click:append="show1 = !show1"
        ></v-text-field>
        <!-- <v-select
          v-model="roles"
          :rules="rolesRules"
          :items="items"
          label="Roles"
          required
        ></v-select>         -->
        <v-checkbox
          v-model="checkbox"
          :rules="checkboxRules"
          label="Do you agree?"
          required
        ></v-checkbox>

        <p class="ml-1 mb-5 text-subtitle-1" >
         Sudah punya akun?
          <a
            href="./login"    
            style="text-decoration: none;"
          >Masuk</a>
        </p>  

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
                  <h2 v-if="success">Ok untuk login, klik dibawah ini :</h2>
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
                  @click.stop="dialog = !dialog"
                  :to="`./login`"
              >Ok</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </div>
</template>
<script>

export default {
    name: "Register",
    layout: "auth/registry",
    data: () => ({
        username: "",
        email: "",
        password: "",
        // roles: "",
        // items: [`user`, `director`, `admin`],
        checkbox: false,
        dialog: false,
        show1: false,
        show2: false,
        valid: false,
        isOperationsSuccess: false,
        usernameRules: [
          v => !!v || 'Username is required',     
          v => (v && v.length <= 60) || 'Username must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',     
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be more than 8 characters',
        ],
        rolesRules: [
          v => !!v || 'Roles is required'
        ],
        positionRules: [
          v => !!v || 'Fields is required'
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
                .post('http://localhost:8080/api/auth/signup',{
                  username : this.username,
                  email : this.email,
                  password : this.password,
                  // roles : this.roles.split(","),
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
