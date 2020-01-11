import { windowTemplate } from './appWindowtemplate.js'

export default class AppWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(windowTemplate.content.cloneNode(true))
    this.mousedown = this.mousedown.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.memoryGameWindow = this.shadowRoot.querySelector('.mainbox')
    this.prevX = undefined
    this.prevY = undefined
  }

  connectedCallback () {
    this.moveableDiv()
  }

  disconnectedCallBack () {
  }

  moveableDiv () {
    this.shadowRoot.querySelector('.windowTop').addEventListener('mousedown', this.mousedown)
  }

  mousedown (event) {
    this.addEventListener('mousemove', this.mousemove)
    this.addEventListener('mouseup', this.mouseup)

    this.prevX = event.clientX
    this.prevY = event.clientY
  }

  mousemove (event) {
    const newX = this.prevX - event.clientX
    const newY = this.prevY - event.clientY

    const rect = this.memoryGameWindow.getBoundingClientRect()

    this.memoryGameWindow.style.left = rect.left - newX + 'px'
    this.memoryGameWindow.style.top = rect.top - newY + 'px'

    this.prevX = event.clientX
    this.prevY = event.clientY
  }

  mouseup () {
    this.removeEventListener('mousemove', this.mousemove)
    this.removeEventListener('mouseup', this.mouseup)
  }
}

window.customElements.define('app-window', AppWindow)
