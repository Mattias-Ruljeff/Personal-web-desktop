import { mainTemplate } from './maintemplate.js'
import '../memory-game/js/memory.js'

export default class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
  }

  connectedCallback () {
    this.addingEvents()
  }

  addingEvents () {
    const memory = this.shadowRoot.querySelector('#memory')
    const memoryWindow = document.querySelector('#memoryWindow')
    console.log(memory)
    console.log(memoryWindow)
    memory.addEventListener('click', () => {
      memoryWindow.appendChild(document.createElement('memory-game'))
    })
  }
}
window.customElements.define('main-window', MainWindow)
