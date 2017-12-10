import { Constructor, CustomElement } from '../types'

interface PropDefinition {
  type?: object
  value?: any
  reflectToAttribute?: boolean
}

export const withProps = <P = {}, S = {}, T extends Constructor<CustomElement> = Constructor<CustomElement>>(
  Base: T
) => {
  class WithProps extends Base {
    static get observedAttributes() {
      return this._observedAttributes
    }
    static set observedAttributes(attrs: Array<string>) {
      this._observedAttributes = (this.observedAttributes || []).concat(attrs)
    }

    private static _properties: { [key: string]: PropDefinition }
    static get properties() {
      return this._properties || {}
    }
    static set properties(props: { [key: string]: PropDefinition }) {
      this.setupProps(props)
      this._properties = props
    }
    private static _observedAttributes: Array<string>

    attributeChangedCallback(this: any, name: string, oldValue: string | null, newValue: string | null) {
      super.attributeChangedCallback && super.attributeChangedCallback(name, oldValue, newValue)
      this[name] = _deserializeValue(newValue, this.constructor.properties[name].type)
      // @TODO handle camelCase deserialization
      // syncAttributeToProperty(this, name, newValue);
    }

    connectedCallback() {
      super.connectedCallback && super.connectedCallback()
      this.scheduleRender && this.scheduleRender()
    }

    scheduleRender?: () => void

    get props(this: any): P {
      const ctor = this.constructor as typeof WithProps

      return Object.keys(ctor.properties).reduce((prev: any, curr) => {
        prev[curr] = this[curr]
        return prev
      }, {})
    }

    private _defaultStateHasBeenSet = false
    private _state: S

    get state() {
      return this._state
    }
    set state(defaultState: Partial<S>) {
      if (this._defaultStateHasBeenSet) {
        throw new Error('for updating state use setState()')
      }
      this._defaultStateHasBeenSet = true
      this._state = defaultState as S
    }
    setState(newState: Partial<S>): void
    setState(newState = {}) {
      const state = { ...(this._state as {}), ...(newState as {}) } as S
      this._state = state
      this.scheduleRender && this.scheduleRender()
    }

    private static setupProps(properties: { [key: string]: PropDefinition }) {
      const ctor = this
      const propNames = Object.keys(properties)

      propNames.forEach(name => {
        const definition = properties[name]
        const _value = Symbol(name)
        const defaultValue = _deserializeValue(definition.value, definition.type)

        if (_shouldSetObservedAttributes(definition.type)) {
          ctor.observedAttributes = [name]
        }

        Object.defineProperty(ctor.prototype, name, {
          configurable: true,
          set(this: any, val: any) {
            this[_value] = _deserializeValue(val, definition.type)
            this.scheduleRender && this.scheduleRender()
          },
          get(this: any) {
            const val = this[_value]
            return val == null ? defaultValue : val
          },
        })
      })
    }
  }
  return WithProps
}

function _shouldSetObservedAttributes(type?: object) {
  switch (type) {
    case Number:
    case Boolean:
    case String:
      return true
    default:
      return false
  }
}

function _deserializeValue(value: any, type?: object) {
  let outValue
  switch (type) {
    case Number:
      outValue = Number(value)
      break
    case Boolean:
      outValue = value !== null
      break
    case Object:
      try {
        outValue = typeof value === 'string' ? JSON.parse(/** @type {string} */ (value)) : (outValue = value)
      } catch (x) {
        // allow non-JSON literals like Strings and Numbers
      }
      break
    case Array:
      try {
        outValue = typeof value === 'string' ? JSON.parse(/** @type {string} */ (value)) : (outValue = value)
      } catch (x) {
        outValue = null
        console.warn(`Attributes: couldn't decode Array as JSON: ${value}`)
      }
      break
    case Date:
      value = isNaN(value) ? String(value) : Number(value)
      outValue = new Date(value)
      break
    case String:
    default:
      outValue = value
      break
  }
  return outValue
}
