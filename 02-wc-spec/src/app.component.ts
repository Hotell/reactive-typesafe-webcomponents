import { trickItemTemplate } from './trick-item.template.js'
import { Trick, User, Events as UserCustomEvents } from './user.component'
import './user.component.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
     // --main-color: #7cb342;
    }
    #newTricksList > li { 
      font-size: 1.2rem;
      text-shadow: 1px 1px 1px #EF6C00;
    }
    small {
      color: grey;
      font-size: .7em;
      font-style: italic;
    }
  </style>
  <h1>Sk8 tricks learning App <small>vanilla WC</small></h1>
  <div>
    <h4>new tricks learned today:</h4>
    <ul id="newTricksList">
    </ul>
  </div>
  <hr>
  <sk-user name="Martin" age="30"><sk-user>
`

class App extends HTMLElement {
  static readonly is = 'sk-app'

  private _tricks: Array<Trick> = []
  get tricks() {
    return this._tricks
  }
  set tricks(value: Array<Trick>) {
    this._tricks = value
    this.render()
  }

  private view: {
    newTricksList: HTMLUListElement
    user: User
  }

  private handleNewTrick = (event: CustomEvent) => {
    const payload = event.detail as Trick
    const newTricks = [...this.tricks, payload]
    this.tricks = newTricks
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.view = {
      newTricksList: shadowRoot.querySelector('#newTricksList') as HTMLUListElement,
      user: shadowRoot.querySelector('sk-user') as User,
    }

    this.view.user.addEventListener('learnTrick', this.handleNewTrick)
  }

  render() {
    this.view.newTricksList.innerHTML = this.tricks.map(trickItemTemplate).join('')
  }
}

export default window.customElements.define(App.is, App)
