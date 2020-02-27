module.exports = {
  beforeCreate(user, options) {
    user.name = user.name.toLowerCase()
  },
  afterFind(user, options) {
    if (user.length > 0) {
      let addedTotal = []
      user.forEach(product => {
        total = product.price * product.stock
        product.dataValues.total = total
        addedTotal.push(product)
      })
      user = addedTotal
    }
  }
}