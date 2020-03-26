<template>
    <v-bottom-sheet v-model="menu">
      <v-sheet class="text-center" height="300px">
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="setMenu(false)"
        >close</v-btn>

        <v-container class="mt-4">
            <v-layout row wrap class="mt-4">
                <v-flex xs4>
                <v-slider
                    v-model="infected"
                    min="0"
                    :max="popsize"
                    thumb-label="always"
                    label="Nombres d'infectés"
                ></v-slider>
                </v-flex>
            </v-layout>
        </v-container>

      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
export default {
    name: 'Menu',

    data: () => ({
    }),

    methods: {
        ...mapMutations('app', ['setMenu', 'toggleMenu']),
        ...mapMutations('settings', ['setInfected']),
    },

    computed: {
        ...mapState('app', ['menu']),
        ...mapState('settings', ['popsize']),

        infected: {
            set (value) {
                this.setInfected(value)
            },
            get () {
                return this.$store.state.settings.infected
            }
        }
    }

}
</script>

<style>
</style>
