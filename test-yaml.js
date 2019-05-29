// const yaml = require('js-yaml')

// const str = 'b'

// console.log(typeof yaml.safeLoad(str, 'utf8'))

const arr = [1, 2, 3]

for (let i of arr) {
  arr.splice(arr.indexOf(i), 1)
}

console.log(arr)
