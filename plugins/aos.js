import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css' // If you need load compiled AOS css here in plugin

class AosPlugin {
  config = {
    // Your AOS config here
  }

  install(Vue) {
    AOS.init(this.config)

    Vue.mixin({
      updated() {
        this.$nextTick(function () {
          AOS.refreshHard() // This is needed to avoid the un-animate aos effect
        })
      }
    })
  }
}

Vue.use(new AosPlugin())