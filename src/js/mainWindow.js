import { mainTemplate } from './maintemplate.js'

export default class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
  }

  connectedCallback () {
    console.log('hej')
  }
}
window.customElements.define('main-window', MainWindow)
