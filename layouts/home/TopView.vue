<template>
  <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="0"
        class="active"
        aria-label="Slide 1"
        aria-current="true"
      ></button>
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="1"
        aria-label="Slide 2"
        class=""
      ></button>
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="2"
        aria-label="Slide 3"
        class=""
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <svg
          class="bd-placeholder-img one"
          width="100%"
          height="100vh"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect 
          width="100%" 
          height="100%" 
          fill="rgba(0,0,0,0.6)"
          ></rect>
          <!-- class="filleds" -->
        </svg>

        <div class="container">
          <div class="carousel-caption text-start">
            <img src="~/assets/img/logo/PENS.png" alt="pens.png"/>
            <h1 class="text-white">Ajukan rapat.</h1>
            <p class="text-shadow">
              Anda bisa mengagendakan rapat secara digital dengan
              APR.
            </p>
            <p>
              <v-btn
              x-large
              color="bg-gradient-info"
              dark
              @click="login"
                >
                <!-- data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" -->
                Masuk</v-btn
              >
            </p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <svg
          class="bd-placeholder-img second"
          width="100%"
          height="100vh"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)"></rect>
        </svg>

        <div class="container">
          <div class="carousel-caption">
            <img src="~/assets/img/logo/PENS.png" alt="pens.png"/>
            <h1 class="text-white">Jadwal Rapat.</h1>
            <p class="text-shadow">
              Jadwal rapat yang tepat, meningkatkan kualitas yang baik.
            </p>
            <p>
              <v-btn
              x-large
              color="bg-gradient-info"
              dark
              @click="login"
                >Masuk</v-btn
              >
            </p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <svg
          class="bd-placeholder-img third"
          width="100%"
          height="100vh"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)"></rect>
        </svg>

        <div class="container">
          <div class="carousel-caption text-end">
            <img src="~/assets/img/logo/PENS.png" alt="pens.png"/>
            <h1 class="text-white">Notulen rapat.</h1>
            <p class="text-shadow">
              Catatan singkat mengenai jalannya rapat dengan APR.
            </p>
            <p>
              <v-btn
              x-large
              color="bg-gradient-info"
              dark
              @click="login"
                >Masuk</v-btn
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "TopView",
  methods: {
    login(){
      this.$router.push('/auth/login');
    }
  }
};
</script>

<style>

.bg-gradient-info {
  background-image: linear-gradient(310deg, #2152ff 0%, #21d4fd 100%); /* Primary; */
  color: white;
  transform: scale(1.04);
  box-shadow: 0 5px 8px 0 rgba(0,0,0,0.24), 0 9px 25px 0 rgba(0,0,0,0.19);
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.text-white{
  text-shadow: 2px 2px 2px #000000;
}
.text-shadow{
  text-shadow: 1px 1px 2px #000000;
}
.one{
    background: url('../../assets/img/curved-images/curved12.png');
    background-size: cover;
    background-repeat: no-repeat;
}
.second{
    background: url('../../assets/img/curved-images/curved11.png');
    background-size: cover;
    background-repeat: no-repeat;
}
.third{
    background: url('../../assets/img/curved-images/curved15.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.rect{
  color: rgba(0,0,0,0.6);
}
</style>


