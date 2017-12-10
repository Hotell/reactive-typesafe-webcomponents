import { withProps } from './withProps'
import { withRender } from './withRender'
import { withShadow } from './withShadow'

export const withComponent = <P = {}, S = {}>(Base = HTMLElement) => withProps<P, S>(withRender(withShadow(Base)))
