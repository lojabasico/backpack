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
  serialize (payload) {
    console.log('Choosing Best Serializer', this.opts)
    return this.firstEligibleInstance({ opts: this.opts }).serialize({ payload, opts: this.opts })
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
backpack.serialize([[{
  action: 'add',
  data: {
    variant_id: 123,
    quantity: 1
  }
}]])
