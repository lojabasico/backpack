import Dexie from 'dexie'
export default {
  serialize (payload) {
    return {
      items: []
    }
  },

  instaceDataBase () {
    var db = new Dexie('Cart')
    db.version(1).stores({
      carts: 'id,created_at,updated_at',
      line_items: 'id,cart_id,variant_id,product_id,title,quantity,stock,image,price,metadata'
    })

    return db
  },

  async create (cart) {
    let db = this.instaceDataBase()
    let response = await db.carts.add({
      ...cart,
      updated_at: Date.now(),
      created_at: Date.now()
    })
    return response
  },

  async clear () {
    let db = this.instaceDataBase()
    let response = await db.line_items.clear()
    return response
  },

  async list (cartId) {
    let db = this.instaceDataBase()
    let cart = await db.carts.where('id').equals(cartId).toArray()
    let response = await db.line_items.where('cart_id').equals(cart[0].id).toArray()
    return response
  },

  async add (item) {
    let db = this.instaceDataBase()
    let response = item.stock ? await db.line_items.add(item) : false
    return response
  },

  async update (item) {
    let db = this.instaceDataBase()
    let response = item.quantity <= item.stock
      ? await db.line_items.update(item.id, {quantity: item.quantity})
      : false
    return response
  },

  async remove (item) {
    let db = this.instaceDataBase()
    let response = await db.line_items.delete(item.id)
    return response
  }
}
