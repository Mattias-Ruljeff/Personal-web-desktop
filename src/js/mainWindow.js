import { mainTemplate } from './maintemplate.js'
import '../memory-game/js/memory.js'

export default class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
    this.prevX = undefined
    this.prevy = undefined
  }

  connectedCallback () {
    this.addingEvents()
    this.moveableDiv()
  }

  addingEvents () {
    const memory = this.shadowRoot.querySelector('#memory')
    const memoryWindow = document.querySelector('#memoryWindow')
    memory.addEventListener('click', () => {
      const memoryCreate = document.createElement('memory-game')
      memoryCreate.classList = 'memoryGameWindow'
      memoryWindow.appendChild(memoryCreate)
    })
  }

  moveableDiv () {
    const memoryWindow = document.querySelector('#memoryWindow')
    memoryWindow.addEventListener('mousedown', (event) => {
      const windowTop = event.target.shadowRoot.querySelector('#windowTop')
      this.mouseDown(event, windowTop, memoryWindow)
    })
  }

  mouseDown (targetWindow, windowTop, memoryWindow) {
    window.addEventListener('mousemove', this.mouseMove(targetWindow, windowTop, memoryWindow))
    window.addEventListener('mouseup', this.mouseUp(targetWindow))
    this.prevX = targetWindow.clientX
    this.prevY = targetWindow.clientY
  }

  mouseMove (targetWindow, windowTop, memoryWindow) {
    console.log(windowTop)
    const test = memoryWindow.querySelector('.memoryGameWindow').shadowRoot.querySelector('#mainbox')
    const newX = this.prevX - targetWindow.clientX
    const newY = this.prevY - targetWindow.clientX

    const rect = windowTop.getBoundingClientRect()
    test.style.top = rect.top - newY + 'px'
    test.style.left = rect.left - newX + 'px'

    this.prevX = targetWindow.clientX
    this.prevY = targetWindow.clientY
  }

  mouseUp () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }
}
window.customElements.define('main-window', MainWindow)
