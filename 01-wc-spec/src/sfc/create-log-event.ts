import { Trick } from '../types'

type Props = {
  trick: Trick
  isRemoved?: boolean
}

export const CreateLogEvent = ({ trick, isRemoved = false }: Props) => {
  const logTime = new Date()
  const dateOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const logTypeMessage = isRemoved ? 'forgot' : 'learned'
  const className = isRemoved ? 'added' : 'removed'

  const template = document.createElement('template')
  template.innerHTML = `
  <li class="${className}">${logTime.toLocaleDateString('en-US', dateOptions)} - ${logTypeMessage} trick -> 
    <span>name: ${trick.name}</span> 
    <span>difficulty: ${trick.difficulty}</span>
  </li>`

  const node = template.content.cloneNode(true)

  return node
}
