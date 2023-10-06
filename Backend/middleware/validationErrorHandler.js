function errorHandler(errors) {
    // console.log(errors)
    if (!errors.isEmpty()) {
      // console.log(errors)
      const errMessages = []
      errors.array().map(err => {
        const errMsg = {}
        errMsg[err.path] = err.msg
        errMessages.push(errMsg)
      })
      // console.log(errMessages)
      return errMessages
    }
  }
  
  export default errorHandler