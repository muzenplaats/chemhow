
export default class Radical {
  constructor() {
    this.name = 'radical'
  }

  toString() {}
  toJSON() {
    const { name } = this
    return { name }
  }
}
