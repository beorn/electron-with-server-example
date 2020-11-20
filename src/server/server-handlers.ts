const handlers = {
  _history: [],

  "make-factorial": async ({ num }) => {
    handlers._history.push(num)

    function fact(n) {
      if (n === 1) {
        return 1
      }
      return n * fact(n - 1)
    }

    console.log("making factorial")
    return fact(num)
  },

  "ring-ring": async () => {
    console.log("picking up the phone")
    return "hello!"
  },
}

export default handlers
