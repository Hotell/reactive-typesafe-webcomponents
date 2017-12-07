import { Constructor, CustomElement } from '../types'

export const withShadow = <TBase extends Constructor<CustomElement>>(Base: TBase) =>
  class WithShadow extends Base {
    constructor(...args: Array<any>) {
      super(...args)
      this.attachShadow({ mode: 'open' })
    }
  }
