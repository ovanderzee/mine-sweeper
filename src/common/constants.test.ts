import { RANGES, SCORE_RADIX } from './constants'

it('The RANGES members can not be changed', () => {
    const updateSizeMin = () => {RANGES.SIZE.min = 0}
    // @ts-expect-error  // Test error TS2790: The operand of a 'delete' operator must be optional.
    const deleteSizeMin = () => {delete RANGES.SIZE.min}
    const overwriteSize = () => {RANGES.SIZE = {'min': 10, 'max': 23}}
    const deleteSize = () => {delete RANGES.SIZE}

    expect(updateSizeMin).toThrow(/Cannot assign to read only property 'min'/)
    expect(deleteSizeMin).toThrow(/Cannot delete property 'min'/)
    expect(overwriteSize).toThrow(/Cannot assign to read only property 'SIZE'/)
    expect(deleteSize).toThrow(/Cannot delete property 'SIZE'/)
})

describe('SCORE_RADIX must be well chosen', () => {

  it('SCORE_RADIX may not exceed 36', () => {
    // max radix for parseInt and Number.toString is 36
    expect(SCORE_RADIX).toBeLessThanOrEqual(36)
  })

  it('SCORE_RADIX may not be less than maximum BOARD_SIZE', () => {
    expect(SCORE_RADIX).toBeGreaterThanOrEqual(RANGES.SIZE.max)
  })
})
