import { h } from 'preact'
import { Trick } from '../types'

type Props = {
  trick: Trick
  onRemove?(payload: Trick): void
}

export const TrickItem = ({ trick, onRemove }: Props) => (
  <li>
    <span>name: {trick.name}</span>
    <span>difficulty: {trick.difficulty}</span>
    {onRemove && <button onClick={() => onRemove(trick)}>X</button>}
  </li>
)
