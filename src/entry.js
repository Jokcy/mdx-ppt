if (ENV === 'LOCAL') {
  require('../client/app.jsx')
} else {
  require('../lib/app.js')
}
