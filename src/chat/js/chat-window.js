import { chatTemplate } from './template.js'

export default class ChatWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(chatTemplate.content.cloneNode(true))
    this.chatSocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.message = {
      type: 'message',
      data: '',
      username: '',
      channel: 'channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
  }

  connectedCallback () {
    this.checkForUsername()
    this.sendOwnMessage()
    this.closeButton()
  }

  disconnectedCallBack () {
    this.chatSocket.close()
    this.removeEventListener('click', this.shadowRoot.querySelector('#usernamebutton'))
    this.removeEventListener(this.userNameEntry)
  }

  checkForUsername () {
    if (!window.localStorage.username) {
      this.userNameEntry()
    } else {
      const userNameDiv = this.shadowRoot.querySelector('.username')
      const chatWindow = this.shadowRoot.querySelector('.chatbox')
      userNameDiv.classList.add('hidden')
      chatWindow.classList.remove('hidden')
      this.message.username = JSON.parse(window.localStorage.username)
      this.printUsernameInDiv()
      this.createWebSocket()
    }
  }

  userNameEntry () {
    const userNameDiv = this.shadowRoot.querySelector('.username')
    const chatWindow = this.shadowRoot.querySelector('.chatbox')
    const inputyfield = this.shadowRoot.querySelector('#usernameinput')
    const userNameButton = this.shadowRoot.querySelector('#usernamebutton')
    console.log(inputyfield.value)
    inputyfield.value = ''
    chatWindow.classList.add('hidden')
    userNameButton.addEventListener('click', () => {
      this.message.username = inputyfield.value
      window.localStorage.setItem('username', JSON.stringify(this.message.username))
      userNameDiv.classList.toggle('hidden')
      chatWindow.classList.toggle('hidden')
      this.printUsernameInDiv()
      this.createWebSocket()
    })
    inputyfield.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        userNameButton.click()
      }
    })
  }

  printUsernameInDiv () {
    const usernameDiv = this.shadowRoot.querySelector('#yourUserName')
    usernameDiv.textContent = `Your username: ${this.message.username}`
    const changeUsername = this.shadowRoot.querySelector('.chatbox #changeUsername')

    changeUsername.addEventListener('click', () => {
      const userNameDiv = this.shadowRoot.querySelector('.username')
      const chatWindow = this.shadowRoot.querySelector('.chatbox')
      userNameDiv.classList.remove('hidden')
      chatWindow.classList.add('hidden')
      this.userNameEntry()
    })
  }

  closeButton () {
    const closeButton = this.shadowRoot.querySelector('.closeWindow')
    closeButton.addEventListener('click', (button) => {
      this.remove()
    })
  }

  sendOwnMessage () {
    const inputyfield = this.shadowRoot.querySelector('#chatmessage')
    const button = this.shadowRoot.querySelector('#button')
    button.addEventListener('click', () => {
      this.message.data = inputyfield.value
      inputyfield.value = ''
      this.chatSocket.send(JSON.stringify(this.message))
    })
    inputyfield.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        button.click()
      }
    })
  }

  createWebSocket () {
    this.chatSocket.addEventListener('open', () => {
      const message = JSON.stringify(this.message)
      this.chatSocket.send(message)
    })
    this.chatSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data)
      this.addmessage(messageData)
    }
  }

  addmessage (message) {
    const messageBox = this.shadowRoot.querySelector('#maincontent')
    const p = document.createElement('p')
    if (message.type === 'notification') {
    } else if (message.data) {
      p.textContent = `${message.username}: ${message.data}`
      messageBox.appendChild(p)
    }
    const textMessagesCount = this.shadowRoot.querySelectorAll('#maincontent p')
    if (textMessagesCount.length > 8) {
      textMessagesCount[0].remove()
    }
  }
}

window.customElements.define('chat-window', ChatWindow)
