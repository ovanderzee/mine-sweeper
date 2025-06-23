import { RANGES } from './constants'

test('The RANGES members can not be changed', () => {
    const updateSizeMin = () => {RANGES.SIZE.min = 0}
    // @ts-expect-error
    const deleteSizeMin = () => {delete RANGES.SIZE.min} // error TS2790: The operand of a 'delete' operator must be optional.
    const overwriteSize = () => {RANGES.SIZE = {'min': 10, 'max': 23}}
    const deleteSize = () => {delete RANGES.SIZE}

    expect(updateSizeMin).toThrow(/Cannot assign to read only property 'min'/)
    expect(deleteSizeMin).toThrow(/Cannot delete property 'min'/)
    expect(overwriteSize).toThrow(/Cannot assign to read only property 'SIZE'/)
    expect(deleteSize).toThrow(/Cannot delete property 'SIZE'/)
})
