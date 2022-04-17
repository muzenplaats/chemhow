
export default class Equation {
  constructor() {
    this.name = 'equation'
  }

  toString() {}
  toJSON() {
    const { name } = this
    return { name }
  }
}
