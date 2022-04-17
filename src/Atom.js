
export default class Atom {
  constructor() {
    this.name = 'atom'
  }

  toString() {}
  toJSON() {
    const { name } = this
    return { name }
  }
}
