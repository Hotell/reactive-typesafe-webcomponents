import { Trick } from './user.component'

export const trickItemTemplate = ({ name, difficulty }: Trick) =>
  `
  <li>
  <span>name: ${name}</span> 
  <span>difficulty: ${difficulty}</span>
  </li>
`
