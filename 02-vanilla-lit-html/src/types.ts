export type Trick = {
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export type LogItem = {
  trick: Trick
  isRemoved?: boolean
  time: Date
}

export type Constructor<T = {}> = new (...args: any[]) => T
export interface CustomElement extends HTMLElement {
  connectedCallback?(): void
}
