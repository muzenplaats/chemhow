
export default class Molecule {
  constructor() {
    this.name = 'molecule'
  }

  toString() {}
  toJSON() {
    const { name } = this
    return { name }
  }
}
