import { mainTemplate } from './maintemplate.js'
import '../memory-game/js/app.js'
import '../chat/js/app.js'

export default class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
    this.prevX = undefined
    this.prevy = undefined
    this.appWindow = document.querySelector('#memoryWindow')
    this.indexNumber = 1
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
      const memoryCreate = document.createElement('memory-game')
      memoryCreate.classList = 'memoryGameWindow'
      memoryCreate.id = this.indexNumber
      const mainBox = memoryCreate.shadowRoot.querySelector('.mainbox')
      mainBox.style.zIndex = `${this.indexNumber}`
      // console.log(memoryCreate)
      this.zIndex.push(mainBox)
      this.updateZIndex()
      // console.log(this.zIndex)
      this.indexNumber++
      this.appWindow.appendChild(memoryCreate)
      // this.removeAppWindow()
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
      // this.removeAppWindow()
    })
    this.moveableDiv()
  }

  moveableDiv () {
    this.appWindow.addEventListener('mousedown', (event) => {
      const memoryGameWindow = event.target.shadowRoot.querySelector('.mainbox')
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

  removeAppWindow (appWindow) {
    console.log(appWindow.shadowRoot)
  }
}
window.customElements.define('main-window', MainWindow)
