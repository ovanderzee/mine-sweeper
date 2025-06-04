
/*
  Interface for data storage.
  Getting config should be storage.config as an object literal
  Setting config should be storage.config = data as object literal
*/

const storage = {
  get config() {
      const stringified = localStorage.getItem('mv-config')
      const data = JSON.parse(stringified)
      return data
  },
  set config(data) {
      const stringified = JSON.stringify(data)
      localStorage.setItem('mv-config', stringified)
  }
}

export default storage
