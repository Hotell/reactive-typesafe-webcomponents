import { withProps } from './withProps'
import { withRender } from './withRender'
import { withShadow } from './withShadow'

export const withComponent = <P = {}>(Base = HTMLElement) => withProps<P>(withRender(withShadow(Base)))
