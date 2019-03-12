var db = new Dexie('Cart')
db.version(1).stores({
  carts: 'id,created_at,updated_at',
  line_items: 'id,cart_id,variant_id,product_id,title,quantity,stock,image,price,metadata'
})

let item = {
  id: 123,
  cart_id: 1,
  variant_id: 1,
  product_id: 2,
  title: 'camiseta',
  quantity: 1,
  stock: 5,
  image: '',
  price: 12,
  metadata: {}
}

async function create (cart) {
  let response = await db.carts.add({
    ...cart,
    updated_at: Date.now(),
    created_at: Date.now()
  })
  return response
}

async function clear () {
  let response = await db.line_items.clear()
  return response
}

async function list (cartId) {
  let cart = await db.carts.where('id').equals(cartId).toArray()
  let response = await db.line_items.where('cart_id').equals(cart[0].id).toArray()
  return response
}

async function add (item) {
  let response = item.stock ? await db.line_items.add(item) : false
  return response
}

async function update (item) {
  let response = item.quantity <= item.stock
    ? await db.line_items.update(item.id, {quantity: item.quantity})
    : false
  return response
}

async function remove (item) {
  let response = await db.line_items.delete(item.id)
  return response
}
