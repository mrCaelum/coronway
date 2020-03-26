import { set, toggle } from '@/utils/vuex'

export default {
  setMenu: set('menu'),
  toggleMenu: toggle('menu'),

  setPause: set('pause'),
  togglePause: toggle('pause'),

  setSingleStep: set('singlestep'),
  toggleSingleStep: toggle('singlestep'),

  setRefresh: set('refresh'),
  toggleRefresh: toggle('refresh'),
}
