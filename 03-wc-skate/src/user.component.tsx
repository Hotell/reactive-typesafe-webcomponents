import { h, PreactHTMLAttributes } from 'preact'
import { define, props, emit } from 'skatejs'
import { Component } from './base'

import { Trick } from './types'
import { TrickItem } from './sfc/trick-item'

type Props = {
  name: string
  age: number
  tricks: Trick[]
}
type Events = {
  onLearnTrick(event: UserCustomEvent): void
  onRemoveTrick(event: UserCustomEvent): void
}
export type UserCustomEvent = Event & { detail: Trick }

class User extends Component<Props> {
  static readonly is = 'sk-user'
  static readonly props = {
    name: { ...props.string, attribute: true, default: 'Unknown' },
    age: { ...props.number, attribute: true, default: 0 },
    tricks: props.array,

    // private props
    trickName: props.string,
    trickDifficulty: props.string,
  }
  static get events() {
    return {
      learnTrick: 'learntrick',
      removeTrick: 'removetrick',
    }
  }

  private trickName = ''
  private trickDifficulty = ''
  private refs = {} as {
    input: HTMLInputElement
  }

  get styles() {
    return `
    * {
      font-size: 1.5rem;
    }
    :host {
      --default-main-color: #1976d2;
      --content-padding: .5rem;

      display: flex;
      flex-direction: column;
      margin: 1rem;
      padding: var(--content-padding);
      box-shadow: 0px 4px 20px 0px #9E9E9E;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5em;
      transition: background-color ease-out 250ms;
    }
    ul > li:nth-child(2n){
      background-color: #e1bee7;
    }
    ul > li:hover {
      background-color: #eceff1;
    }
    ul > li > button {
      background-color: #ff5722;
      padding: .5em;
    }
    .form-controll {
      padding: .5rem .75rem;
      font-size: 1rem;
      line-height: 1.25;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: .25rem;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    .form-controll:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
    }
    button {
      color: #fff;
      background-color: var(--main-color, var(--default-main-color));
      border: 1px solid var(--main-color, var(--default-main-color));
      padding: .5rem .75rem;
      font-size: 1rem;
      line-height: 1.25;
      border-radius: .25rem;
      transition: all .15s ease-in-out;
    }
    select {
      height: calc(2.25rem + 2px);
      background-color: white;
    }
    header {
      padding: .5em;
      margin: calc(var(--content-padding) * -1);
      margin-bottom: .5em;
      color: white;
      background-color: var(--main-color, var(--default-main-color));
    }
    form {
      padding: .5em
    }
    `
  }

  renderCallback() {
    const { name, age, tricks } = this.props

    return (
      <div>
        <style>{this.styles}</style>
        <header>
          Hello <b>{name}</b>! Let's skate!
        </header>
        <div>
          Only <b>{age}</b> years old? Time to learn new tricks!
        </div>
        <form onSubmit={this.handleNewTrickAddition}>
          <input
            class="form-controll"
            name="trickName"
            value={this.trickName}
            onInput={this.changeValue}
            ref={(node: HTMLInputElement) => (this.refs.input = node)}
          />
          <select class="form-controll" name="trickDifficulty" value={this.trickDifficulty} onChange={this.changeValue}>
            <option value="">--chose difficulty--</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <button>Learn Trick</button>
        </form>
        <div>
          <h4>User knows following tricks:</h4>
          <ul>{tricks.map(trick => <TrickItem trick={trick} onRemove={this.emitRemoveTrick} />)}</ul>
        </div>
      </div>
    )
  }

  private emitLearnTrick(trick: Trick) {
    emit(this, User.events.learnTrick, { detail: trick })
  }
  private emitRemoveTrick = (trick: Trick) => {
    emit(this, User.events.removeTrick, { detail: trick })
  }
  private handleNewTrickAddition = (event: Event) => {
    event.preventDefault()

    const newTrick = {
      name: this.trickName,
      difficulty: this.trickDifficulty,
    } as Trick

    this.emitLearnTrick(newTrick)

    this.trickName = ''
    this.trickDifficulty = ''

    this.refs.input.focus()
  }
  private changeValue = (event: Event) => {
    type EventTargets = HTMLInputElement | HTMLSelectElement
    type KnownProps = 'trickName' | 'trickDifficulty'
    const target = event.target as EventTargets
    const name = target.name as KnownProps
    const value = target.value
    this[name] = value
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sk-user': Props & Partial<Events> & PreactHTMLAttributes
    }
  }
}

export default define(User)
