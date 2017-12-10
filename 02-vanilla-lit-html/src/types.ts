export type Trick = {
  name: string
  difficulty: 'easy' | 'medium' | 'hard' | string
}

export type LogItem = {
  trick: Trick
  isRemoved?: boolean
  time: Date
}

export type Constructor<T = {}> = new (...args: any[]) => T
export interface CustomElement extends HTMLElement {
  connectedCallback?(): void
  disconnectedCallback?(): void
  attributeChangedCallback?(name: string, oldValue: null | string, newValue: null | string): void
  adoptedCallback?(): void
}
