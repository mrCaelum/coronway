<template>
  <div class="home">

    <vue-p5
      @setup="setup"
      @draw="draw">
    </vue-p5>

    <custom-menu />

  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import {
  mapMutations,
  mapState
} from 'vuex'

import Grid from '@/p5/Grid.js'

export default {
  name: 'Home',
  data: () => ({
    cellsize: 50,
    grid: null
  }),

  methods: {
    ...mapMutations('app', ['setSingleStep', 'setRefresh']),
    ...mapMutations('settings', ['setPopSize']),

    setup (sketch) {
      sketch.frameRate(60);
      sketch.createCanvas(window.innerWidth, window.innerHeight - 80)

      this.setPopSize(this.cols * this.rows)
      this.grid = new Grid(sketch, this.cols, this.rows, window.innerWidth, (window.innerHeight - 144), this.params);
    },
    draw (sketch) {
      if (this.refresh) {
        sketch.clear()
        this.setRefresh(false)
        this.grid = new Grid(sketch, this.cols, this.rows, window.innerWidth, (window.innerHeight - 144), this.params);
      }
      if (this.pause && !this.singlestep) return

      sketch.background(0)

      this.grid.run(sketch, this.infected)
      this.setSingleStep(false)
    }
  },

  computed: {
    ...mapState('app', ['pause', 'singlestep', 'refresh']),
    ...mapState('settings', ['infected', 'timeBeforeDeath', 'contagiosity', 'mortality']),

    cols () {
      return Math.round(window.innerWidth / this.cellsize)
    },
    rows () {
      return Math.round((window.innerHeight - 144) / this.cellsize)
    },
    params () {
      return {
        infected: this.infected,
        timeBeforeDeath: this.timeBeforeDeath,
        contagiosity: this.contagiosity,
        mortality: this.mortality
      }
    }
  },

  components: {
    "vue-p5": VueP5
  }
}
</script>

<style>
html {
  overflow-y: auto;
}
</style>
