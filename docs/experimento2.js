let OnlineSerializer = function (opts) {
  let serialize = (payload) => { console.log('Online serialize', opts) }
  let eligible = () => false
  return { serialize, eligible }
}

let OfflineSerializer = function (opts) {
  let serialize = (payload) => { console.log('Offline serialize', opts) }
  let eligible = () => true
  return { serialize, eligible }
}

let AbstractSerializer = function (opts) {
  let _firstEligibleInstance = function () {
    let strategies, strategyInstance
    strategies = opts.strategies

    for (var i in strategies) {
      strategyInstance = strategies[i](opts)
      if (strategyInstance.eligible()) { break }
    }

    return strategyInstance
  }

  let serialize = function (payload) {
    console.log('Choosing best serializer', payload, opts)
    return _firstEligibleInstance().serialize(payload)
  }

  return { serialize }
}

let Backpack = {
  init (opts) {
    return AbstractSerializer(opts)
  }
}

let backpack = Backpack.init({
  strategies: [OnlineSerializer, OfflineSerializer]
})
backpack.serialize([{
  action: 'add',
  data: {
    variant_id: 123,
    quantity: 1
  }
}])
