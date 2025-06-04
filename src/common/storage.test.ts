import storage from './storage'

test('should set and get data', () => {
  const data = {a: 1, b: 'Breadbrood'}
  storage.config = data

  // test setting data through localStorage
  const readStorage = JSON.parse(localStorage.getItem('mv-config'))
  expect(readStorage.a).toBe(1)
  expect(readStorage.b).toBe('Breadbrood')

  // test getting data
  expect(storage.config.a).toBe(1)
  expect(storage.config.b).toBe('Breadbrood')
})
