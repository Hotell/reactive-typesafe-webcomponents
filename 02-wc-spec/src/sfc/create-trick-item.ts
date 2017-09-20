import { Trick } from '../types'


type Props = {
  trick: Trick
  onRemove?(payload: Trick): void
}

export const CreateTrickItem = ({ trick, onRemove }: Props) => {
  const isRemovable = Boolean(onRemove)

  const template = document.createElement('template')
  template.innerHTML = `
  <li>
  <span>name: ${trick.name}</span>
  <span>difficulty: ${trick.difficulty}</span>
  ${isRemovable && '<button>X</button>'}
  </li>
  `

  const node = template.content.cloneNode(true) as HTMLElement

  if (onRemove) {
    node.querySelector('button')!.addEventListener('click', () => {
      onRemove(trick)
    })
  }

  return node
}
