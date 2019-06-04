const TRANSITIONS = {
  from: {
    rtl: {opacity: 0, transform: 'translate3d(100%,0,0)'},
    ltr: {opacity: 0, transform: 'translate3d(-100%,0,0)'},
  },
  leave: {
    rtl: {opacity: 0, transform: 'translate3d(-50%,0,0)'},
    ltr: {opacity: 0, transform: 'translate3d(50%,0,0)'},
  },
}

function largeThen(newIndex, oldIndex) {
  // console.log(newIndex, oldIndex, parseInt(newIndex) - parseInt(oldIndex))
  return parseInt(newIndex) - parseInt(oldIndex) > 0
}

export default {
  fade: {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  },
  slide: ({match: oldMatch}, {match}) => ({
    from:
      TRANSITIONS.from[
        largeThen(match.params.index, oldMatch.params.index) ? 'rtl' : 'ltr'
      ],
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave:
      TRANSITIONS.leave[
        largeThen(match.params.index, oldMatch.params.index) ? 'rtl' : 'ltr'
      ],
  }),
}
