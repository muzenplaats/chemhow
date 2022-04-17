
export default class Ion {
  constructor() {
    this.name = 'ion'
  }

  toString() {}
  toJSON() {
    const { name } = this
    return { name }
  }
}
