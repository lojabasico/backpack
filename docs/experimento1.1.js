let OnlineSerializer = {
  serialize ({ payload, opts }) { console.log('Online serialize', opts) },
  eligible ({ opts }) { return false }
}

let OfflineSerializer = {
  serialize ({ payload, opts }) { console.log('Offline serialize', opts) },
  eligible ({ opts }) { return true }
}

let AbstractSerializer = {
  initialize ({ opts }) {
    return { ...this, opts }
  },
  firstEligibleInstance ({ opts }) {
    let strategies, strategyInstance
    strategies = opts.strategies

    for (var i in strategies) {
      strategyInstance = strategies[i]
      if (strategyInstance.eligible({ opts })) { break }
    }

    return strategyInstance
  },
  serialize ({ payload, opts }) {
    console.log('Choosing Best Serializer', opts)
    return this.firstEligibleInstance({ opts }).serialize({ payload, opts })
  }
}

let Backpack = {
  init (opts) {
    return AbstractSerializer.initialize({ opts })
  }
}

let backpack = Backpack.init({
  strategies: [OnlineSerializer, OfflineSerializer]
})
console.log(backpack)
backpack.serialize({
  payload: [
    {
      action: 'add',
      data: {
        variant_id: 123,
        quantity: 1
      }
    }
  ],
  opts: backpack.opts
})
