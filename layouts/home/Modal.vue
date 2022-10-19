<template>
  <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fs-3 fw-bolder " id="staticBackdropLabel">Masuk Sebagai</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body ">
                        <div class="col-lg-12">
                            <div class="d-grid gap-2">
                            
                            <a  @click="loginDosen" class="button btn-lg fs-5 fw-bolder text-center " data-bs-dismiss="modal" type="button" >
                                <div class="col text-center mb-3  ">
                                    <i class="fas fa-user-graduate fas-round shadow"></i>
                                </div>
                                User Biasa
                            </a>
                            </div>
                        </div>
                <hr>
                        <div class="col-lg-12">
                            <div class="d-grid gap-2">
                                
                            <a  @click="loginDirektur" class="button btn-lg fs-5 fw-bolder text-center " data-bs-dismiss="modal" type="button" >
                            <div class="col text-center mb-3  ">
                                <i class="fas fa-user-tie fas-round shadow"></i>
                            </div>
                            Direktur | Wakil direktur
                            </a>
                            </div>
                        </div>
                <hr>
                        <div class="col-lg-12">
                            <div class="d-grid gap-2">
                                
                            <a @click="loginSekretaris" class="button btn-lg fs-5 fw-bolder text-center " data-bs-dismiss="modal" type="button" >
                            <div class="col text-center mb-3  ">
                                <i class="fas fa-user-cog fas-round shadow"></i> 
                            </div>
                            Sekretaris Terbaik
                            </a>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Kembali</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
.button {
  transition-duration: 0.4s;
  border: 2px solid #55acee;
  color: #55acee;
  text-decoration: none;
}

.button:hover {
  background-image: linear-gradient(310deg, #2152ff 0%, #21d4fd 100%); /* Primary; */
  color: white;
  transform: scale(1.04);
  box-shadow: 0 5px 8px 0 rgba(0,0,0,0.24), 0 9px 25px 0 rgba(0,0,0,0.19);
}
    i.fas-round {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100px;
        box-shadow: 0px 0px 2px #888;
        padding: 10px 10px;
        align-self: center;
    }
    
</style>

<script>

  export default {
    name: 'Modal',
    methods:{
    loginDosen(){
         this.$router.push('/auth/login/Login'); 
        },
    loginDirektur(){
        this.$router.push('/auth/login/LoginDirektur'); 
    },
    loginSekretaris(){
        this.$router.push('/auth/login/Sekretaris'); 
    }
  }
  }
</script>
