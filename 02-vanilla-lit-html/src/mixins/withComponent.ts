import { withProps } from './withProps'
import { withRender } from './withRender'
import { withShadow } from './withShadow'
import { withEmitter } from './withEmitter'

export const withComponent = <P = {}, S = {}, E = {}>(Base = HTMLElement) =>
  withProps<P, S>(withRender(withEmitter<E>(withShadow(Base))))
