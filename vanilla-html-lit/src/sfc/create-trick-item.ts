import { html } from 'lit-html/lib/lit-extended'
import { Trick } from '../types'

type Props = {
  trick: Trick
  onRemove?(payload: Trick): void
}

export const CreateTrickItem = ({ trick, onRemove }: Props) => {
  return html`
    <li>
      <span>name: ${trick.name}</span>
      <span>difficulty: ${trick.difficulty}</span>
      ${Button({ onRemove: () => onRemove!(trick) })}
    </li>
  `
}

const Button = ({ onRemove }: { onRemove(payload: Trick): void }) => html`
  <button on-click=${onRemove}>X</button>
`
