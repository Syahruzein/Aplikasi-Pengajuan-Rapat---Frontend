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
          v-model="user.email"
          :rules="emailRules"
          label="Email Address"
          required
        ></v-text-field>

        <v-text-field 
          v-model="user.password" 
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="show1 ? 'text' : 'password'" 
          :rules="passwordRules"
          name="input-10-1" 
          label="Password" 
          counter @click:append="show1 = !show1"
          required
          ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="checkboxRules"
          label="Do you agree?"
          required
        ></v-checkbox>
        <!-- <div class="ml-1 mb-5 text-subtitle-1" >
          Belum punya akun? 
          <a
            href="./register"
            style="text-decoration: none;"
          >Daftar</a>
        </div>   -->

        <v-btn
          :disabled="!valid"
          class="mr-4 white--text"
          color="bg-gradient-info"
          @click="validate"
        >
          submit
        </v-btn>
        <v-btn @click="clear" color="bg-gradient-secondary" class="white--text">
          clear
        </v-btn>
      </v-form>
    </v-card>
    </div>
</template>
<script>
import User from '~/models/user'

export default {
    name: "Login",
    layout: "auth/login",
    data: () => ({
        user: new User('', ''),
        // loginData: {
        // username: "",
        // password: "",
        // },
        show1: false,
        checkbox: false,
        valid: false,
        emailRules: [
          v => !!v || 'Email is required',     
          // v => (v && v.length <= 10) || 'Username must be less than 10 characters',
          v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid. like username@pens.ac.id',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be more than 8 characters',
        ],
        checkboxRules: [
          v => !!v || 'You must agree to continue!'
        ]
    }),
    computed: {
      loggedIn() {
        return this.$store.state.authentication.status.loggedIn;
      },
      currentUser() {
        return this.$store.state.authentication.user;
      },
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/user');
      }
    },
    methods: {
        validate() {
          this.$refs.form.validate()
            if(this.$refs.form.validate()) {
              if (this.user.email && this.user.password) {
                this.$store.dispatch('authentication/login', this.user).then(
                  () => {                    
                    this.$router.push('/user');
                  },
                  error => {
                    this.loading = false;
                    this.message =
                      (error.response && error.response.data && error.response.data.message) ||
                      error.message ||
                      error.toString();
                  }
                );
              }


              // this.$auth.loginWith('local', {
              //   data: this.loginData
              //   // username : this.username,
              //   // password : this.password,
              // })
              // // this.$axios
              // // .post('http://localhost:8080/api/auth/signin',{
              // //   username : this.username,
              // //   password : this.password,
              // // })
              // .then(response => {
              //     console.log(response.data)
              //     this.$router.push('/user/Beranda')
              // })
              // .catch(e => {
              //     console.log(e)
              //     console.log(e.response.data.message)
              // })
            }
        },
        clear() {
            this.$refs.form.reset()
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
