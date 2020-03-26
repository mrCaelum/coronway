<template>
  <v-footer
    id="core-footer"
    absolute
    color="primary"
    height="80"
  >
  <v-layout row wrap align-center justify-center>
    <div xs12 v-for="(item, index) in actions" :key="index">
      <v-btn fab :color="item.color" :disabled="getDisabled(item.action)" @click="getAction(item.action)" class="ml-2 mr-2">
        <v-icon color="white">{{ getIcon(item.action, item.icon) }}</v-icon>
      </v-btn>
    </div>
  </v-layout>
  </v-footer>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
export default {
  data: () => ({
    actions: [
      {
        icon: 'mdi-arrow-up-drop-circle',
        color: 'green',
        action: 'menu'
      },
      {
        icon: 'mdi-play',
        color: 'blue',
        action: 'play'
      },
      {
        icon: 'mdi-play-pause',
        color: 'orange',
        action: 'singlestep'
      },
      {
        icon: 'mdi-reload',
        color: 'purple',
        action: 'refresh'
      }
    ]
  }),

  methods: {
    ...mapMutations('app', ['toggleMenu', 'togglePause', 'toggleSingleStep', 'toggleRefresh']),

    getAction (action) {
      this[action]()
    },

    getIcon (action, icon) {
        if (action === 'play') {
            return this.pause ? 'mdi-play' : 'mdi-pause'
        }
        return icon
    },

    getDisabled (action) {
      if (action === 'singlestep' && !this.pause) return true
      return false
    },

    menu () {
      console.log('Menu')
      this.toggleMenu()
    },

    play () {
        console.log('Pause')
        this.togglePause()
    },

    refresh () {
      console.log('Refresh')
      this.toggleRefresh()
    },

    singlestep () {
      this.toggleSingleStep()
      console.log('Singlestep')
    }
  },

  computed: {
    ...mapState('app', ['pause'])
  }
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
