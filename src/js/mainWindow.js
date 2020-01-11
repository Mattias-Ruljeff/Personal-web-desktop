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
    this.elementArr = []
  }

  connectedCallback () {
    this.addingEvents()
  }

  updateZIndex () {
    for (let i = 0; i < this.zIndex.length; i++) {
      this.zIndex[i].style.zIndex = i
    }
  }

  closeButton () {
    this.elementArr.forEach(i => {
      const closeButton = i.shadowRoot.querySelector('.closeWindow')
      closeButton.addEventListener('click', e => {
        i.remove()
        this.elementArr.pop()
      })
    })
  }

  addingEvents () {
    const memory = this.shadowRoot.querySelector('#memory')
    memory.addEventListener('click', (e) => {
      const appWindow = document.createElement('app-window')
      const appWindowMainbox = appWindow.shadowRoot.querySelector('.appbox')
      const memoryCreate = document.createElement('memory-game')
      memoryCreate.classList = 'memoryGameWindow'
      memoryCreate.id = this.indexNumber
      const mainBox = memoryCreate.shadowRoot.querySelector('.mainbox')
      mainBox.style.zIndex = `${this.indexNumber}`
      appWindowMainbox.appendChild(memoryCreate)
      this.zIndex.push(mainBox)
      this.updateZIndex()
      this.indexNumber++
      this.elementArr.push(appWindow)
      this.appWindow.appendChild(appWindow)
      this.closeButton()
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

  // ///////  flytta!=)(/¤)(/Q)¤(/Q)¤(/Q)¤(/)

  // moveableDiv () {
  // this.appWindow.addEventListener('mousedown', (event) => {
  //   const memoryGameWindow = event.target.shadowRoot.querySelector('.mainbox')
  //   const tempIndex = memoryGameWindow.style.zIndex
  //   this.zIndex.splice(tempIndex, 1)
  //   this.zIndex.push(memoryGameWindow)
  //   this.updateZIndex()
}
window.customElements.define('main-window', MainWindow)
