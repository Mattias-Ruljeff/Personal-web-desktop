import { chatTemplate } from './template.js'

/**
 * A chatmodule that uses Web-Sockets
 *
 * @author Mattias Ruljeff
 * @version 1.1
 * @module src/chat
 * @customElement 'chat-window'
 * @class ChatWindow
 * @extends {window.HTMLElement}
 */
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

  /**
   * Triggers the chat to check if there is a username, otherwise
   * asks the user to enter one.
   *
   * @memberof ChatWindow
   */
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

  /**
  * Checks if there is a username stored in local storage.
  * If not, triggers the userNameEntry()
  *
  * @memberof ChatWindow
  */
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
      this.sendAndRetrieveMessages()
    }
  }

  /**
   * Shows the "enter a username" window.
   * Adds an event listener to the username-button.
   *
   * @memberof ChatWindow
   */
  userNameEntry () {
    const userNameDiv = this.shadowRoot.querySelector('.username')
    const chatWindow = this.shadowRoot.querySelector('.chatbox')
    const inputyfield = this.shadowRoot.querySelector('#usernameinput')
    const userNameButton = this.shadowRoot.querySelector('#usernamebutton')
    inputyfield.value = ''
    chatWindow.classList.add('hidden')
    userNameButton.addEventListener('click', () => {
      this.message.username = inputyfield.value
      window.localStorage.setItem('username', JSON.stringify(this.message.username))
      userNameDiv.classList.toggle('hidden')
      chatWindow.classList.toggle('hidden')
      this.printUsernameInDiv()
      this.sendAndRetrieveMessages()
    })
    inputyfield.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        userNameButton.click()
      }
    })
  }

  /**
   *Prints out the users name in the top of the chat-window.
   *
   * @memberof ChatWindow
   */
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

  /**
   * Sends the users written message to the chat-server.
   *
   * @memberof ChatWindow
   */
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

  /**
   * Sends the users messages and listens for messages from the
   * chat-server.
   *
   * @memberof ChatWindow
   */
  sendAndRetrieveMessages () {
    this.chatSocket.addEventListener('open', () => {
      const message = JSON.stringify(this.message)
      this.chatSocket.send(message)
    })
    this.chatSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data)
      this.addmessage(messageData)
    }
  }

  /**
   *
   *
   * @param {Object} message The object to send to the chat-server or the
   * object retrieved from the chat-server.
   * @memberof ChatWindow
   */
  addmessage (message) {
    const messageBox = this.shadowRoot.querySelector('#maincontent')
    const p = document.createElement('p')
    if (message.type === 'notification') {
    } else if (message.data && message.username === this.message.username) {
      p.textContent = `You: ${message.data}`
      p.style.backgroundColor = '#E4D6A7'
      messageBox.appendChild(p)
    } else if (message.data && message.username !== this.message.username) {
      p.textContent = `${message.username}: ${message.data}`
      p.style.backgroundColor = '#E9B44C'
      messageBox.appendChild(p)
    }
    const textMessagesCount = this.shadowRoot.querySelectorAll('#maincontent p')
    if (textMessagesCount.length > 20) {
      textMessagesCount[0].remove()
    }

    messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight
  }

  /**
   *Adds an event listener to the "close-button" on the window.
   *
   * @memberof ChatWindow
   */
  closeButton () {
    const closeButton = this.shadowRoot.querySelector('.closeWindow')
    closeButton.addEventListener('click', (button) => {
      this.chatSocket.close()
      this.remove()
    })
  }
}

window.customElements.define('chat-window', ChatWindow)
