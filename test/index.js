/* eslint-env mocha */

import Backpack from '@src/index'
import expect from '@test/test.config'

describe('Backpack', function () {
  describe('#initialize()', function () {
    let backpack = Backpack.initialize({
      strategies: [{}]
    })

    it('should return all the methods of th backpack object', function () {
      expect(backpack.serialize).to.not.be(undefined)
    })

    it('should return all options passed in de paylod', function () {
      expect(backpack.options).to.not.be(undefined)
    })
  })

  describe('#serialize()', function () {
    it('should return serialize payload', function () {
      let strategy1 = {
        eligible ({ options }) { return false },
        serialize ({ payload }) { return false }
      }

      let strategy2 = {
        eligible ({ options }) { return true },
        serialize ({ payload }) { return payload }
      }

      let backpack = Backpack.initialize({
        strategies: [strategy1, strategy2]
      })
      expect(backpack.serialize(2)).to.be(2)
    })
  })
})
