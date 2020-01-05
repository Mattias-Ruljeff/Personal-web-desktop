import { mainTemplate } from './maintemplate.js'
import '../memory-game/js/memory.js'

export default class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
    this.prevX = undefined
    this.prevy = undefined
    this.memoryWindow = document.querySelector('#memoryWindow')
  }

  connectedCallback () {
    this.addingEvents()
  }

  addingEvents () {
    const memory = this.shadowRoot.querySelector('#memory')
    memory.addEventListener('click', () => {
      const memoryCreate = document.createElement('memory-game')
      memoryCreate.classList = 'memoryGameWindow'
      this.memoryWindow.appendChild(memoryCreate)
    })
    this.moveableDiv()
  }

  moveableDiv () {
    this.memoryWindow.addEventListener('mousedown', (event) => {
      const memoryGameWindow = event.target.shadowRoot.querySelector('#mainbox')
      window.addEventListener('mousemove', mousemove)
      window.addEventListener('mouseup', mouseup)

      let prevX = event.clientX
      let prevY = event.clientY

      function mousemove (e) {
        const newX = prevX - e.clientX
        const newY = prevY - e.clientY

        const rect = memoryGameWindow.getBoundingClientRect()

        memoryGameWindow.style.left = rect.left - newX + 'px'
        memoryGameWindow.style.top = rect.top - newY + 'px'

        prevX = e.clientX
        prevY = e.clientY
      }
      function mouseup () {
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)
      }
    })
  }

  mouseDown (event, mainBox) {
    console.log(event, 'event i mousedown')
    const test = event.getBoundingClientRect()
    console.log(test.x)
    this.prevX = test.x
    this.prevY = test.y
    console.log(this.prevX)
    console.log(this.prevY)
    window.addEventListener('mousemove', this.mouseMove(test, mainBox))
    window.addEventListener('mouseup', this.mouseUp(test, mainBox))
  }

  mouseMove (event, mainBox) {
    console.log(event.y, 'event i mousemove')
    const newX = this.prevX - event.x
    const newY = this.prevY - event.y

    const rect = mainBox.getBoundingClientRect()
    console.log(rect.top, 'rect top')
    mainBox.top = rect.top - newY + 'px'
    mainBox.left = rect.left - newX + 'px'

    this.prevX = event.x
    this.prevY = event.y
    // console.log(event, 'event i mousemove')
  }

  mouseUp () {
    window.removeEventListener('mousemove', this.mouseMove())
    window.removeEventListener('mouseup', this.mouseUp())
  }
}
window.customElements.define('main-window', MainWindow)
