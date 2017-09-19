import { trickItemTemplate } from './trick-item.template.js'
type Attrs = 'name' | 'age'
type Props = {
  name: string
  age: number
  tricks: Array<Trick>
}
export type Events = keyof typeof User.events
export type Trick = {
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface HTMLElementTagNameMap {
  'sk-user': User
}

const template = document.createElement('template')
template.innerHTML = `
  <style>
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
    flex-direction: column;
    padding: .5em;
  }
  input, select, button {
    padding: .3em;
    border-radius: .3em;
    border: 1px solid grey;
    font-size: 1em;
  }
  heading {
    padding: .5em;
    margin: calc(var(--content-padding) * -1);
    margin-bottom: .5em;
    color: white;
    background-color: var(--main-color, var(--default-main-color));
  }
  form {
    padding: .5em
  }
  </style>
  <heading>
    Hello <b id="name"></b>!
  </heading>
  <div>
    Only <b id="age"></b> years old? Time to learn new tricks!
  </div>
  <form>
    <input id="trickName" name="trickName">
    <select id="trickDifficulty" name="trickDifficulty">
      <option value="">--chose difficulty--</option>
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
    </select>
    <button>Learn Trick</button>
  </form>
  <ul id="trick-list"></ul>
`

export class User extends HTMLElement implements Props {
  static readonly is = 'sk-user'
  static get events() {
    return {
      learnTrick: 'learnTrick',
    }
  }
  static get observedAttributes(): Array<Attrs> {
    return ['name', 'age']
  }

  set name(value: string) {
    this.setAttribute('name', value)
  }
  get name() {
    return this.getAttribute('name') || 'Unknown'
  }

  set age(value: number) {
    this.setAttribute('name', String(value))
  }
  get age() {
    return Number(this.getAttribute('age')) || 0
  }

  private _tricks: Array<Trick> = []
  set tricks(value: Array<Trick>) {
    this._tricks = value
    this.render()
  }
  get tricks() {
    return this._tricks
  }

  private view: {
    form: HTMLFormElement
    trickList: HTMLUListElement
    age: HTMLElement
    name: HTMLElement
  }

  private handleNewTrickAddition = (event: Event) => {
    event.preventDefault()
    const target = event.target as EventTarget & { elements: [HTMLInputElement, HTMLSelectElement] }
    const [input, select] = target.elements

    const newTrick = {
      name: input.value,
      difficulty: select.value,
    } as Trick

    this.emitLearnTrick(newTrick)

    // mutation muhahaha ! bleh! eak!
    input.value = ''
    select.value = ''

    input.focus()
  }

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.view = {
      form: shadowRoot.querySelector('form') as HTMLFormElement,
      trickList: shadowRoot.querySelector('#trick-list') as HTMLUListElement,
      age: shadowRoot.querySelector('#age') as HTMLElement,
      name: shadowRoot.querySelector('#name') as HTMLElement,
    }

    this.view.form.addEventListener('submit', this.handleNewTrickAddition)
  }

  attributeChangedCallback(name: Attrs, oldValue: string | null, newValue: string | null) {
    this.render()
  }

  connectedCallback() {
    console.log('component mounted!')
    this.render()
  }

  disconnectedCallback() {
    console.log('goodbye!')
  }

  render() {
    console.log({
      props: {
        name: this.name,
        age: this.age,
        tricks: this.tricks,
      },
    })

    this.view.name.textContent = this.name
    this.view.age.textContent = String(this.age)
    this.view.trickList.innerHTML = this.tricks.map(trick => trickItemTemplate(trick)).join('')
  }

  private emitLearnTrick(trick: Trick) {
    const eventConfig = { bubble: true, composed: true, detail: trick }
    const event = new CustomEvent(User.events.learnTrick, eventConfig)
    this.shadowRoot!.dispatchEvent(event)
  }
}

export default window.customElements.define('sk-user', User)

// window.customElements.get('sk-user') // User
