/* eslint-env mocha */
import expect from '@test/test.config.js'
import Abstract from '@src/strategies/abstract'

describe('Abstract', function () {
  describe('#initialize()', function () {
    let abstract = Abstract.initialize({
      options: {
        strategies: []
      }
    })

    it('should return all the methods of th backpack object', function () {
      expect(abstract.serialize).to.not.be(undefined)
    })

    it('should return all options passed in de paylod', function () {
      expect(abstract.options).to.not.be(undefined)
    })
  })

  describe('#firstEligibleStrategy()', function () {
    it('should return the first eligible strategy', function () {
      let strategy1 = {
        eligible ({ opts }) { return false }
      }

      let strategy2 = {
        eligible ({ opts }) { return true }
      }

      let abstract = Abstract.firstEligibleStrategy({
        options: {
          strategies: [strategy1, strategy2]
        }
      })

      expect(abstract).to.be(strategy2)
    })

    it('should throw exception if no strategy is eligible', function () {
      let strategy1 = {
        eligible ({ opts }) { return false }
      }

      let strategy2 = {
        eligible ({ opts }) { return false }
      }

      expect(function () {
        Abstract.firstEligibleStrategy({
          options: {
            strategies: [strategy1, strategy2]
          }
        })
      }).to.throwException(/Backpack requires at least one eligible strategy!/)
    })
  })

  describe('#serialize()', function () {
    it('should select the correct Strategy and execute the Strategy serialize method', function () {
      let strategy1 = {
        eligible ({ opts }) { return false },
        serialize () { return 1 }
      }

      let strategy2 = {
        eligible ({ opts }) { return true },
        serialize () { return 2 }
      }

      let abstract = Abstract.initialize({
        options: {
          strategies: [strategy1, strategy2]
        }
      })

      let response = abstract.serialize({})

      expect(response).to.be(2)
    })
  })
})
