import { windowTemplate } from './appWindowtemplate.js'

export default class AppWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(windowTemplate.content.cloneNode(true))
  }

  connectedCallback () {
  }

  disconnectedCallBack () {
  }
}

window.customElements.define('app-window', AppWindow)
