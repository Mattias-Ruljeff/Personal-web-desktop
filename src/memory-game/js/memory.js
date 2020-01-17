import { memoryTemplate2x2 } from './template.js'

/**
 * The memory-game.
 *
 * @author Mattias Ruljeff
 * @version 1.2
 * @module src/memory-game
 * @customElement 'memory-game'
 * @class MainWindow
 * @extends {window.HTMLElement}
 */
class Memorygame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(memoryTemplate2x2.content.cloneNode(true))
    this.tries = 0
    this.rows = 2
    this.cols = 2
    this.numberArr = []
    this.firstClick = undefined
    this.secondClick = undefined
    this.numberOfTries = 0
    this.turnedBricks = 0
    this.numberOfPairs = (this.rows * this.cols) / 2
    this.imageFolder = './memory-game/image/'
    this.gamewidth = ''
    this.tileSound = this.shadowRoot.querySelector('#tileSound')
  }

  /**
   * Adds event listensers to all the "choose gamesize" buttons.
   * The buttons replaces the game-layout.
   *
   * @memberof Memorygame
   */
  connectedCallback () {
    this.createBoard()
    const button = this.shadowRoot.querySelector('#button')
    const twoByTwo = this.shadowRoot.querySelectorAll('#button button')[0]
    const fourByTwo = this.shadowRoot.querySelectorAll('#button button')[1]
    const fourByFour = this.shadowRoot.querySelectorAll('#button button')[2]
    button.addEventListener('click', (buttonClick) => {
      if (buttonClick.target === twoByTwo) {
        this.clearBoard()
        this.cols = 2
        this.rows = 2
        this.numberOfPairs = (this.rows * this.cols) / 2
        this.gamewidth = '150px'
        this.createBoard()
      }
      if (buttonClick.target === fourByTwo) {
        this.clearBoard()
        this.cols = 4
        this.rows = 2
        this.numberOfPairs = (this.rows * this.cols) / 2
        this.gamewidth = '300px'
        this.createBoard()
      }
      if (buttonClick.target === fourByFour) {
        this.clearBoard()
        this.cols = 4
        this.rows = 4
        this.numberOfPairs = (this.rows * this.cols) / 2
        this.gamewidth = '300px'
        this.createBoard()
      }
    })
    this.closeButton()
  }

  disconnectedCallBack () {
  }

  /**
   * Creates an array of numbers for the pictures id.
   *
   * @memberof Memorygame
   */
  createArray () {
    for (let i = 1; i <= (this.rows * this.cols) / 2; i++) {
      this.numberArr.push(i)
      this.numberArr.push(i)
    }

    // Fisher Yates
    let currentIndex = this.numberArr.length
    let temporaryValue
    let randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = this.numberArr[currentIndex]
      this.numberArr[currentIndex] = this.numberArr[randomIndex]
      this.numberArr[randomIndex] = temporaryValue
    }
  }

  /**
   * Creates all the images in the game.
   * Gives all images an id and tabindex.
   *
   * @memberof Memorygame
   */
  createBoard () {
    this.firstClick = undefined
    this.secondClick = undefined
    this.turnedBricks = 0
    this.numberOfTries = 0
    this.numberArr = []
    this.createArray()
    const mainDiv = this.shadowRoot.querySelector('.mainbox')
    const imageBox = document.createElement('div')
    imageBox.id = 'imagebox'
    imageBox.style.width = this.gamewidth
    mainDiv.appendChild(imageBox)
    for (let i = 0; i < this.rows * this.cols; i++) {
      const a = document.createElement('a')
      const img = document.createElement('img')
      img.setAttribute('src', `${this.imageFolder}0.png`)
      img.setAttribute('tabindex', '0')
      img.id = this.numberArr[i]
      a.appendChild(img)
      imageBox.appendChild(a)
    }
    this.makeImageClickable()
  }

  /**
   * Removes all the images from the #imagebox
   *
   * @memberof Memorygame
   */
  clearBoard () {
    const imageBox = this.shadowRoot.querySelector('#imagebox')
    imageBox.remove()
  }

  /**
   * Adds event-listeners to the images.
   *
   * @memberof Memorygame
   */
  makeImageClickable () {
    const imageBox = this.shadowRoot.querySelector('#imagebox')
    imageBox.addEventListener('click', (event) => {
      this.playSound(this.tileSound)
      this.checkIfPair(event.target)
    })
    imageBox.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.checkIfPair(event.target)
      }
    })
  }

  /**
   * Checks if the images that the user clicked match.
   *
   * @param {Object} event The image that the user clicked on.
   * @memberof Memorygame
   */
  checkIfPair (event) {
    if (event.nodeName !== 'IMG' || this.secondClick) {
      return
    }
    const id = event.id
    if (!this.firstClick) {
      this.firstClick = event
      event.setAttribute('src', `${this.imageFolder}${id}.png`)
    } else if (this.firstClick !== event) {
      this.secondClick = event
      event.setAttribute('src', `${this.imageFolder}${id}.png`)
      if (this.firstClick && this.secondClick) {
        if (this.firstClick.id === this.secondClick.id) {
          setTimeout(() => {
            this.firstClick.classList.add('hide')
            this.secondClick.classList.add('hide')
            this.firstClick = undefined
            this.secondClick = undefined
          }, 500)
          this.turnedBricks++
          this.numberOfTries++
          if (this.turnedBricks === this.numberOfPairs) {
            this.winner()
          }
        } else if (this.firstClick !== this.secondClick) {
          window.setTimeout(() => {
            this.firstClick.setAttribute('src', `${this.imageFolder}0.png`)
            this.secondClick.setAttribute('src', `${this.imageFolder}0.png`)
            this.firstClick = undefined
            this.secondClick = undefined
          }, 1000)
          this.numberOfTries++
        }
      }
    }
  }

  /**
   *
   *
   * @param {Object} sound The sound targeted in HTML.
   * @memberof Memorygame
   */
  playSound (sound) {
    sound.currentTime = 0
    sound.play()
  }

  /**
   * Adds a message in the memory-window that the player has won.
   *
   * @memberof Memorygame
   */
  winner () {
    const imageBox = this.shadowRoot.querySelector('#imagebox')
    imageBox.textContent = `You won! Number of tries: ${this.numberOfTries}`
  }

  /**
   * Adds an event listener to the "close-button" on the window.
   *
   * @memberof Memorygame
   */
  closeButton () {
    const closeButton = this.shadowRoot.querySelector('.closeWindow')
    closeButton.addEventListener('click', e => {
      this.remove()
    })
  }
}

window.customElements.define('memory-game', Memorygame)
