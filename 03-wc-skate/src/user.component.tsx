import { h, Component, define, props, emit } from 'skatejs'

import { Trick } from './types'
import { TrickItem } from './sfc/trick-item'

type Props = {
  name: string
  age: number
  tricks: Trick[]
}

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
      learnTrick: 'learnTrick',
      removeTrick: 'removeTrick',
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
    button {
      color: white;
      background-color: var(--main-color, var(--default-main-color));
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
  
    input, select, button {
      padding: .3em;
      border-radius: .3em;
      border: 1px solid grey;
      font-size: 1em;
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
            id="trickName"
            name="trickName"
            value={this.trickName}
            onInput={this.changeValue}
            ref={(node: HTMLInputElement) => (this.refs.input = node)}
          />
          <select id="trickDifficulty" name="trickDifficulty" value={this.trickDifficulty} onChange={this.changeValue}>
            <option value="">--chose difficulty--</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <button>Learn Trick</button>
        </form>
        <div>
          <h4>User knows following tricks:</h4>
          <ul id="trick-list">{tricks!.map(trick => <TrickItem trick={trick} onRemove={this.emitRemoveTrick} />)}</ul>
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
      'sk-user': Props
    }
  }
}

export default define(User)
