import { mainTemplate } from './maintemplate.js'

/**
 * The main window for the personal web desktop.
 *
 * @author Mattias Ruljeff
 * @version 1.1
 * @module src/mainWindow
 * @customElement 'main-window'
 * @class MainWindow
 * @extends {window.HTMLElement}
 */
class MainWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
    this.appWindow = document.querySelector('#appWindow')
    this.memoryGameWindow = this.shadowRoot.querySelector('.mainbox')
    this.prevX = undefined
    this.prevY = undefined
    this.indexNumber = 0
    this.zIndex = []
    this.elementArr = []
  }

  /**
   * Triggers the start of the screen.
   *
   * @memberof MainWindow
   */
  connectedCallback () {
    this.addingEvents()
  }

  /**
   * Updates all the open app-windows Z-index.
   *
   * @memberof MainWindow
   */
  updateZIndex () {
    for (let i = 0; i < this.zIndex.length; i++) {
      this.zIndex[i].style.zIndex = i
    }
  }

  /**
   * Adds the event listerners for all the app-ikons in the
   * main-window.
   *
   * @memberof MainWindow
   */
  addingEvents () {
    const memory = this.shadowRoot.querySelector('#memory')

    memory.addEventListener('click', (e) => {
      const memoryCreate = document.createElement('memory-game')
      this.elementArr.push(memoryCreate)
      this.appWindow.appendChild(memoryCreate)
      // memoryCreate.classList = 'memoryGameWindow'
      // memoryCreate.id = this.indexNumber
      // const mainBox = memoryCreate.shadowRoot.querySelector('.mainbox')
      // mainBox.style.zIndex = `${this.indexNumber}`
      // this.zIndex.push(mainBox)
      // this.updateZIndex()
      // this.indexNumber++
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
    const paddle = this.shadowRoot.querySelector('#paddle')
    paddle.addEventListener('click', () => {
      const paddleCreate = document.createElement('paddle-game')
      paddleCreate.classList = 'paddleGame'
      const mainBox = paddleCreate.shadowRoot.querySelector('.mainbox')
      mainBox.style.zIndex = `${this.indexNumber}`
      this.zIndex.push(mainBox)
      this.updateZIndex()
      this.indexNumber++
      this.appWindow.appendChild(paddleCreate)
    })
    this.moveableDiv()
  }

  /**
   *Makes all the app-windows movable and changes the Z-index of the
   * targeted app-window.
   *
   * @memberof MainWindow
   */
  moveableDiv () {
    this.appWindow.addEventListener('mousedown', event => {
      const appWindow = event.target.shadowRoot.querySelector('.mainbox')
      const tempIndex = appWindow.style.zIndex
      this.zIndex.splice(tempIndex, 1)
      this.zIndex.push(appWindow)
      this.updateZIndex()
      window.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseUp)
      let prevX = event.clientX
      let prevY = event.clientY
      function mouseMove (event) {
        const newX = prevX - event.clientX
        const newY = prevY - event.clientY
        const rect = appWindow.getBoundingClientRect()
        appWindow.style.left = rect.left - newX + 'px'
        appWindow.style.top = rect.top - newY + 'px'
        prevX = event.clientX
        prevY = event.clientY
      }
      function mouseUp () {
        window.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseUp)
      }
    })
  }
}
window.customElements.define('main-window', MainWindow)
