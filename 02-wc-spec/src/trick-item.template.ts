import { Trick } from './user.component'

export const CreateTrickItem = (item: Trick, onRemove?: (payload: Trick) => void) => {
  const template = document.createElement('template')
  template.innerHTML = trickItemTemplate(item, Boolean(onRemove))

  const node = template.content.cloneNode(true) as HTMLElement

  if (onRemove) {
    node.querySelector('button')!.addEventListener('click', () => {
      onRemove(item)
    })
  }

  return node
}

const trickItemTemplate = ({ name, difficulty }: Trick, removable?: boolean) =>
  `
  <li>
  <span>name: ${name}</span> 
  <span>difficulty: ${difficulty}</span>
  ${removable && '<button>X</button>'}
  </li>
  `
