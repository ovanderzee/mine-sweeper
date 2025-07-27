import LZString from 'lz-string'


const square7 = '000019112211111aa21102322910a2122202a119101111110'
const sq10lvl10 = 'a31292a3a1c6ddf5c78c613bb13ahg74b5b342d52hdhh4d1f3e07g80f52hae6633457da41a4c2gf1615baaa0af3b3cb7h6ba'
const sq10lvl6 = "1122322aa1193bca2221223b421011b32122223bbb101aa2bb221012222200011112210001912bc20001112b4a0000001121"
// length of compressed string depends on the height of the eightteen-digit values

const methods = [
  ['compress', 'decompress'],
  ['compressToBase64', 'decompressFromBase64'],
  ['compressToUTF16', 'decompressFromUTF16'],
  ['compressToEncodedURIComponent', 'decompressFromEncodedURIComponent'],
]

describe('test methods', () => {
  methods.forEach((meth, idx) => {
    const todo = meth[0] + ' and ' + meth[1]
    it(todo + ' 7', () => {
      console.log(todo, '7')
      const compr7 = LZString[meth[0]](square7)
      console.log( square7, '->', compr7, compr7.length )
      const decom7 = LZString[meth[1]](compr7)
      console.log( compr7, '->', decom7, decom7.length )  // 34 / 49
      expect(decom7).toBe(square7)
    })

    it(todo + ' 10 lvl6', () => {
      console.log(todo, '10 lvl6')
      const compr10 = LZString[meth[0]](sq10lvl6)
      console.log( sq10lvl6, '->', compr10, compr10.length )
      const decom10 = LZString[meth[1]](compr10)
      console.log( compr10, '->', decom10, decom10.length )  // 68 / 100
      expect(decom10).toBe(sq10lvl6)
    })

    it(todo + ' 10 super lvl10', () => {
      console.log(todo, '10 lvl10')
      const compr10 = LZString[meth[0]](sq10lvl10)
      console.log( sq10lvl10, '->', compr10, compr10.length )
      const decom10 = LZString[meth[1]](compr10)
      console.log( compr10, '->', decom10, decom10.length )  // 117 / 100
      expect(decom10).toBe(sq10lvl10)
    })
  })
})
