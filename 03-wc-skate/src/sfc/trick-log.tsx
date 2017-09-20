import { h } from 'preact'
import { Trick } from 'src/types'

type Props = {
  trick: Trick
  isRemoved: boolean
  timestamp: number
}

export const TrickLog = ({ trick, isRemoved, timestamp }: Props) => {
  const logTime = new Date(timestamp)
  const dateOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const logTypeMessage = isRemoved ? 'forgot' : 'learned'
  const className = isRemoved ? 'added' : 'removed'

  return (
    <li class={className}>
      {logTime.toLocaleDateString('en-US', dateOptions)} - {logTypeMessage} trick ->
      <span>name: {trick.name}</span>
      <span>difficulty: {trick.difficulty}</span>
    </li>
  )
}
