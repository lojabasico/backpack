import StrategyOffline from './strategies/offline'

export default {
  serialize (payload) {
    return StrategyOffline.serialize(payload)
  }
}
