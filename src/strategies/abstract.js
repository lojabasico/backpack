export default {
  initialize ({ options }) {
    return { ...this, options }
  },
  firstEligibleStrategy ({ options }) {
    let strategies
    let strategyInstance
    let lastEligibleStrategy
    strategies = options.strategies

    for (var i in strategies) {
      strategyInstance = strategies[i]
      if (strategyInstance.eligible({ options })) {
        lastEligibleStrategy = strategyInstance
        break
      }
    }

    if (lastEligibleStrategy) {
      return strategyInstance
    }

    throw new Error('Backpack requires at least one eligible strategy!')
  },
  serialize (payload) {
    return this.firstEligibleStrategy({ options: this.options }).serialize({ payload, options: this.options })
  }
}
