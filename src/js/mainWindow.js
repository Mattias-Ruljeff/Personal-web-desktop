import { mainTemplate } from './maintemplate.js'
import '../memory-game/js/app.js'
import '../chat/js/app.js'
import '../app-window/app.js'

export default class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
    this.prevX = undefined
    this.prevy = undefined
    this.appWindow = document.querySelector('#memoryWindow')
    this.indexNumber = 0
    this.tempIndex = 0
    this.zIndex = []
    // this.chatWindow = document.querySelector('#chatWindow')
  }

  connectedCallback () {
    this.addingEvents()
  }

  updateZIndex () {
    for (let i = 0; i < this.zIndex.length; i++) {
      this.zIndex[i].style.zIndex = i
    }
  }

  addingEvents () {
    const memory = this.shadowRoot.querySelector('#memory')
    memory.addEventListener('click', () => {
      const appWindow = document.createElement('app-window')
      const appWindowMainbox = appWindow.shadowRoot.querySelector('.mainbox')
      console.log(appWindowMainbox)
      const memoryCreate = document.createElement('memory-game')
      memoryCreate.classList = 'memoryGameWindow'
      memoryCreate.id = this.indexNumber
      const mainBox = memoryCreate.shadowRoot.querySelector('.mainbox')
      mainBox.style.zIndex = `${this.indexNumber}`
      appWindowMainbox.appendChild(memoryCreate)
      this.zIndex.push(mainBox)
      this.updateZIndex()
      this.indexNumber++
      console.log(appWindow)
      this.appWindow.appendChild(appWindow)
    })
    const chat = this.shadowRoot.querySelector('#chat')
    chat.addEventListener('click', () => {
      const chatCreate = document.createElement('chat-window')
      chatCreate.classList = 'chatWindow'
      const mainBox = chatCreate.shadowRoot.querySelector('.mainbox')
      mainBox.style.zIndex = `${this.indexNumber}`
      this.zIndex.push(mainBox)
      this.updateZIndex()
      this.indexNumber++
      this.appWindow.appendChild(chatCreate)
    })
    this.moveableDiv()
  }

  moveableDiv () {
    this.appWindow.addEventListener('mousedown', (event) => {
      const memoryGameWindow = event.target.shadowRoot.querySelector('.mainbox')
      const tempIndex = memoryGameWindow.style.zIndex
      this.zIndex.splice(tempIndex, 1)
      this.zIndex.push(memoryGameWindow)
      this.updateZIndex()

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
}
window.customElements.define('main-window', MainWindow)
