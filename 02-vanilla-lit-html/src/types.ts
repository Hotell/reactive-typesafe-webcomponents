export type Trick = {
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export type LogItem = {
  trick: Trick
  isRemoved?: boolean
  time: Date
}
