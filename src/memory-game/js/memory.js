import { memoryTemplate2x2 } from './template.js'

export default class Memorygame extends window.HTMLElement {
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
  }

  connectedCallback () {
    this.createBoard()
    const button = this.shadowRoot.querySelector('#button')
    const twoByTwo = this.shadowRoot.querySelectorAll('#button button')[0]
    const fourByTwo = this.shadowRoot.querySelectorAll('#button button')[1]
    const fourByFour = this.shadowRoot.querySelectorAll('#button button')[2]
    button.addEventListener('click', (buttonClick) => {
      if (buttonClick.target === twoByTwo) {
        this.clearBoard()
        this.firstClick = undefined
        this.secondClick = undefined
        this.numberOfTries = 0
        this.turnedBricks = 0
        this.cols = 2
        this.rows = 2
        this.numberOfPairs = (this.rows * this.cols) / 2
        this.gamewidth = '150px'
        this.createBoard()
      }
      if (buttonClick.target === fourByTwo) {
        this.clearBoard()
        this.firstClick = undefined
        this.secondClick = undefined
        this.numberOfTries = 0
        this.turnedBricks = 0
        this.cols = 4
        this.rows = 2
        this.numberOfPairs = (this.rows * this.cols) / 2
        this.gamewidth = '300px'
        this.createBoard()
      }
      if (buttonClick.target === fourByFour) {
        this.clearBoard()
        this.firstClick = undefined
        this.secondClick = undefined
        this.numberOfTries = 0
        this.turnedBricks = 0
        this.cols = 4
        this.rows = 4
        this.numberOfPairs = (this.rows * this.cols) / 2
        this.gamewidth = '300px'
        this.createBoard()
      }
    })
    const closeButton = this.shadowRoot.querySelector('.closeWindow')
    closeButton.addEventListener('click', () => {
      this.remove()
    })
  }

  disconnectedCallBack () {
    const imageBox = this.shadowRoot.querySelector('#imageBox')
    imageBox.removeEventListener('click', () => {})
  }

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

  createBoard () {
    this.numberArr = []
    this.turnedBricks = 0
    this.numberOfTries = 0
    // if (this.cols === 2) {
    //   this.shadowRoot.appendChild(memoryTemplate2x2.content.cloneNode(true))
    //   this.numberOfPairs = (this.rows * this.cols) / 2
    // } else {
    //   this.shadowRoot.appendChild(memoryTemplate4x4.content.cloneNode(true))
    //   this.numberOfPairs = (this.rows * this.cols) / 2
    // }
    this.createArray()
    const output = this.shadowRoot.querySelector('.mainbox')
    const imageBox = document.createElement('div')
    imageBox.id = 'imageBox'
    imageBox.style.width = this.gamewidth
    output.appendChild(imageBox)
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

  clearBoard () {
    const imageBox = this.shadowRoot.querySelector('#imageBox')
    imageBox.remove()
  }

  makeImageClickable () {
    const imageBox = this.shadowRoot.querySelector('#imageBox')
    imageBox.addEventListener('click', (event) => {
      this.checkIfPair(event.target)
    })
    imageBox.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.checkIfPair(event.target)
      }
    })
  }

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

  winner () {
    const imageBox = this.shadowRoot.querySelector('#imageBox')
    const h2 = document.createElement('h2')
    h2.id = 'duVann'
    h2.textContent = `Du vann! Antal drag: ${this.numberOfTries}`
    imageBox.appendChild(h2)
  }
}

window.customElements.define('memory-game', Memorygame)
