/* eslint-env mocha */
import '@babel/polyfill'
import Backpack from '../src/index'
import assert from 'assert'

describe('Backpack', function () {
  describe('#init()', function () {
    it('', function () {


      let backpack = new Backpack({
        strategies: [StrategyOffline, StrategyOnline]
      })

      backpack.serialize([{
        action: 'add',
        data: {
          variant_id: 123,
          quantity: 1
        }
      }])

      ====

      Backpack.serialize([{
        action: 'add',
        data: {
          variant_id: 123,
          quantity: 1
        }
      }], {
        strategies: [StrategyOffline]
      })


      ====


      backpack = Backpack.init({
        strategies: [StrategyOffline, StrategyOnline]
      })
      backpack.serialize([{
        action: 'add',
        data: {
          variant_id: 123,
          quantity: 1
        }
      }])


      ====


      Backpack.init({
        strategies: [StrategyOffline]
      })
      Backpack.serialize([{
        action: 'add',
        data: {
          variant_id: 123,
          quantity: 1
        }
      }])



    })
  })

  describe('#serialize()', function () {
    it('should return 1 for the item added', async function () {
      let bag = await Backpack.serialize([{
        action: 'add',
        data: {
          variant_id: 123,
          quantity: 1
        }
      }])

      assert.equal(bag.items.length, 1)
    })
  })
})
