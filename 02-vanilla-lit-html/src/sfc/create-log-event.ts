import { html } from 'lit-html/lib/lit-extended'
import { Trick } from '../types'

type Props = {
  trick: Trick
  time: Date
  isRemoved?: boolean
}

export const CreateLogEvent = ({ trick, time, isRemoved = false }: Props) => {
  const dateOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const logTypeMessage = isRemoved ? 'forgot' : 'learned'
  const cxName = isRemoved ? 'removed' : 'added'

  return html`
    <li className="${cxName}">
      ${time.toLocaleDateString('en-US', dateOptions)} - ${logTypeMessage} trick ->
      <span>name: ${trick.name}</span>
      <span>difficulty: ${trick.difficulty}</span>
    </li>
  `
}
