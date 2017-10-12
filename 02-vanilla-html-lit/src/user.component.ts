import { render, html } from 'lit-html/lib/lit-extended'

import { Trick } from './types'
import { CreateTrickItem } from './sfc/create-trick-item'

type Attrs = 'name' | 'age'
type Props = {
  name: string
  age: number
  tricks: Array<Trick>
}

const css = html`
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
  </style>
`

export class User extends HTMLElement implements Props {
  static readonly is = 'sk-user'
  static get events() {
    return {
      learnTrick: 'learnTrick',
      removeTrick: 'removeTrick',
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
    if (value !== this._tricks) {
      this._tricks = value || []
      this.render()
    }
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
    const { name, age, tricks } = this
    console.log({
      props: {
        name,
        age,
        tricks,
      },
    })

    const button = html`
      <button on-click=${(e: Event) => {
        console.log(e)
      }}>Learn Trick</button>
    `

    const Form = ({ children }: any) => html`
      <form autocomplete="off" on-submit=${this.handleNewTrickAddition}>
        ${children}
      </form>
    `

    const template = html`
      ${css}
      <header>
        Hello <b id="name">${name}</b>! Let's skate!
      </header>
      <div>
        Only <b id="age">${age}</b> years old? Time to learn new tricks!
      </div>
        ${Form({
          children: html`
            <input id="trickName" class="form-controll" name="trickName">
            <select id="trickDifficulty" class="form-controll" name="trickDifficulty">
              <option value="">--chose difficulty--</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
            ${button}
          `,
        })}
      <div>
        <h4>User knows following tricks:</h4>
        <ul id="trick-list">
          ${tricks.map(trick => CreateTrickItem({ trick, onRemove: this.emitRemoveTrick }))}
        </ul>
      </div>
    `

    render(template, this.shadowRoot!)
  }

  private emitLearnTrick(trick: Trick) {
    const eventConfig = { bubble: true, composed: true, detail: trick }
    const event = new CustomEvent(User.events.learnTrick, eventConfig)
    this.shadowRoot!.dispatchEvent(event)
  }
  private emitRemoveTrick = (trick: Trick) => {
    const eventConfig = { bubble: true, composed: true, detail: trick }
    const event = new CustomEvent(User.events.removeTrick, eventConfig)
    this.shadowRoot!.dispatchEvent(event)
  }
}

declare global {
  type GlobalElementName = typeof User.is
  interface HTMLElementTagNameMap {
    'sk-user': User
  }

  interface HTMLElementEventMap {
    learnTrick: CustomEvent & { detail: Trick }
    removeTrick: CustomEvent & { detail: Trick }
  }
}
export default window.customElements.define(User.is, User)
