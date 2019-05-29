const TRANSITIONS = {
  from: {
    rtl: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    ltr: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
  },
  leave: {
    rtl: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    ltr: { opacity: 0, transform: 'translate3d(50%,0,0)' },
  },
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
  slide: ({ match: oldMatch }, { match }) => ({
    from:
      TRANSITIONS.from[
        match.params.index > oldMatch.params.index ? 'rtl' : 'ltr'
      ],
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave:
      TRANSITIONS.leave[
        match.params.index > oldMatch.params.index ? 'rtl' : 'ltr'
      ],
  }),
}
