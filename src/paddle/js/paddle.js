import { gameTemplate } from './gameTemplate.js'

/**
 * A game of paddle. Hit the top paddle with the ball to gain pints.
 *
 * @author Mattias Ruljeff
 * @version 1.2
 * @module src/paddle
 * @customElement 'paddle-game'
 * @class Paddle
 * @extends {window.HTMLElement}
 */
export default class Paddle extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(gameTemplate.content.cloneNode(true))
    this.username = ''
    this.canvas = ''
    this.ctx = ''
    this.canvasBox = this.shadowRoot.querySelector('.canvasbox')
    this.usernameBox = this.shadowRoot.querySelector('.username')
    this.gameOverBox = this.shadowRoot.querySelector('.gameover')
    this.scoreBoard = this.shadowRoot.querySelector('#scoreboard')
    this.playerPaddleSpeed = 10
    this.score = 0
    this.ballX = 250
    this.ballY = 450
    this.ballResetValueX = 250
    this.ballResetValueY = 450
    this.ballRadius = 10
    this.ballDeltaFactor = 0.1
    this.ballSpeedX = 2
    this.ballSpeedY = -1.5
    this.playerXStart = 200
    this.playerYStart = 480
    this.computerX = 100
    this.computerY = 5
    this._computerPaddleWidth = 150
    this._computerPaddleSpeed = 1
    this._paddleHeight = 15
    this._paddleWidth = 100
    this.fps = 100
    this.updateGame = undefined
    this.highscore = {}
  }

  /**
   *Adds event listensers to the username-button and the input-field.
   *Adds event listensers to the left arrow-key and right arrow-key.
   *Adds event listensers to the reset-game button.
   *
   * @memberof Paddle
   */
  connectedCallback () {
    const inputyfield = this.shadowRoot.querySelector('#usernameinput')
    const userNameButton = this.shadowRoot.querySelector('#usernamebutton')
    inputyfield.focus()
    userNameButton.addEventListener('click', () => {
      this.startGame()
    })
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        if (this.usernameBox.classList[1] === 'hidden') {
          resetButton.click()
        } else {
          userNameButton.click()
        }
      }
    })
    window.addEventListener('keydown', e => {
      // e.preventDefault()
      if (e.code === 'ArrowLeft') {
        if (this.playerXStart === 0) {
          this.playerXStart = this.playerXStart
        } else {
          this.playerXStart += -this.playerPaddleSpeed
        }
      }
      if (e.code === 'ArrowRight') {
        if ((this.playerXStart + this._paddleWidth) === this.canvas.width) {
          this.playerXStart = this.playerXStart
        } else {
          this.playerXStart += this.playerPaddleSpeed
        }
      }
    })
    const resetButton = this.shadowRoot.querySelector('#restartgame')
    resetButton.addEventListener('click', () => {
      if (this.scoreBoard.firstElementChild) {
        this.scoreBoard.firstElementChild.remove()
      }
      this.userNameEntry()
    })
    this.userNameEntry()
    this.closeButton()
  }

  disconnectedCallBack () {
    clearInterval(this.updateGame)
  }

  /**
   * Displays the username-startpage and hides the other pages.
   * Retrieves the highscore from the local storage, if there is one.
   *
   * @memberof Paddle
   */
  userNameEntry () {
    const inputyfield = this.shadowRoot.querySelector('#usernameinput')
    inputyfield.value = ''
    this.usernameBox.classList.remove('hidden')
    this.gameOverBox.classList.add('hidden')
    this.canvasBox.classList.add('hidden')
    this.shadowRoot.querySelector('#insertname').classList.add('hidden')
    if (window.localStorage.highscore) {
      this.highscore = JSON.parse(window.localStorage.getItem('highscore'))
    }
  }

  /**
   * Inserts the username in the constructor, resets the game settings
   * and starts the updateGame interval. If no name is given, prints out
   * a text in the window to the user, to enter a username.
   *
   * @memberof Paddle
   */
  startGame () {
    const inputyfield = this.shadowRoot.querySelector('#usernameinput')

    if (inputyfield.value) {
      this.username = inputyfield.value
      this.usernameBox.classList.add('hidden')
      this.canvasBox.classList.remove('hidden')
      this.createcanvas()
      // this.keypress()
      this.resetGameSetting()
      this.updateGame = setInterval(() => {
        this.createGameScreen()
        this.moveUpdate()
      }, 1000 / this.fps)
    } else {
      this.shadowRoot.querySelector('#insertname').classList.remove('hidden')
    }
  }

  /**
   * Resets the game settings.
   *
   * @memberof Paddle
   */
  resetGameSetting () {
    this.score = 0
    this.ballX = this.ballResetValueX
    this.ballY = this.ballResetValueY
    this.ballSpeedX = 2
    this.ballSpeedY = -1.5
    this.playerXStart = 200
    this.playerYStart = 480
    this.playerPaddleSpeed = 10
    this.computerX = 100
    this._computerPaddleWidth = 150
  }

  /**
   * Stops the gameUpdate and removes the canvas.
   * Shows the game-over screen.
   * Adds the player to the local storage, if the user have
   * beaten the previous scores or has a unique name.
   *
   * @memberof Paddle
   */
  gameReset () {
    clearInterval(this.updateGame)
    this.canvasBox.firstElementChild.remove()
    this.canvasBox.classList.add('hidden')
    this.gameOverBox.classList.remove('hidden')
    if (this.score > 0) {
      if (this.highscore[this.username]) {
        if (this.score > this.highscore[this.username]) { // this.highscore[this.username] = 5
          this.highscore[this.username] = this.score
        }
      } else {
        this.highscore[this.username] = this.score
      }
    }
    this.createScoreBoard()
  }

  /**
   * Gives the top-paddle movement.
   *
   * @memberof Paddle
   */
  computerMovement () {
    this.computerX += this._computerPaddleSpeed
    if ((this.computerX + this._computerPaddleWidth) > this.canvas.width) {
      this._computerPaddleSpeed = -this._computerPaddleSpeed
    }
    if (this.computerX < 0) {
      this._computerPaddleSpeed = -this._computerPaddleSpeed
    }
  }

  /**
   * Updates the canvas with this.fps .
   * Starts the ball-movement. Changes direction of the ball if it
   * collides with both sides, the top and both paddles. When it
   * hits the bottom, game-over.
   * The ball gets different speeds from hitting the paddles, depending on
   * how far from the middle of the paddle it hits.
   *
   * @memberof Paddle
   */
  moveUpdate () {
    this.computerMovement()

    this.ballX += this.ballSpeedX
    this.ballY += this.ballSpeedY

    // Checks if the ball collides with canvas right side.
    if (this.ballX > (this.canvas.width - this.ballRadius)) {
      this.ballSpeedX = -this.ballSpeedX
    }
    // Checks if the ball collides canvas with left side.
    if (this.ballX < (0 + this.ballRadius)) {
      this.ballSpeedX = -this.ballSpeedX
    }
    // Check if ball collides with computer-paddle-bottom, changes either ball speed or top-paddle width.
    if ((this.ballY - this.ballRadius) < (this.computerY + this._paddleHeight) && this.ballX > this.computerX && this.ballX < (this.computerX + this._computerPaddleWidth)) {
      this.ballSpeedY = -this.ballSpeedY
      const deltaX = this.ballX - (this.computerX + (this._computerPaddleWidth / 2))
      this.ballSpeedX = deltaX * this.ballDeltaFactor
      this.checkBallSpeed()
      this.score++
      if (this.score % 2 === 0) {
        this.ballSpeedY += 0.5
      }
      if (this.score % 2 === 1) {
        this._computerPaddleWidth -= 5
      }
    }
    // Check if ball collides with player-paddle-top.
    if ((this.ballY + this.ballRadius) > this.playerYStart && this.ballX > this.playerXStart && this.ballX < (this.playerXStart + this._paddleWidth)) {
      this.ballSpeedY = -this.ballSpeedY
      const deltaX = this.ballX - (this.playerXStart + (this._paddleWidth / 2))
      this.ballSpeedX = deltaX * this.ballDeltaFactor
      this.checkBallSpeed()
    }
    // Checks if ball collides with the top.
    if (this.ballY < (0 + this.ballRadius)) {
      this.ballSpeedY = -this.ballSpeedY
    }
    // Checks if ball collides with bottom.
    if (this.ballY > this.canvas.height) {
      this.gameReset()
    }
  }

  /**
   * Sets the maximum speed of the ball when hitting the sides of
   * the paddles.
   *
   * @memberof Paddle
   */
  checkBallSpeed () {
    // Set ballx maxspeed
    if (this.ballSpeedX > 4) {
      this.ballSpeedX = 4
    }
    // Set ballx maxspeed
    if (this.ballSpeedX < -4) {
      this.ballSpeedX = -4
    }
  }

  /**
   * Creates the canvas with the width and height of 500.
   *
   * @memberof Paddle
   */
  createcanvas () {
    const createCanvas = document.createElement('canvas')
    createCanvas.id = 'canvas'
    createCanvas.width = '500'
    createCanvas.height = '500'
    this.canvasBox.appendChild(createCanvas)
    this.canvas = this.shadowRoot.querySelector('#canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  /**
   * Creates the game-area, the ball, both paddles, the playername-text and score-text in the canvas.
   *
   * @memberof Paddle
   */
  createGameScreen () {
    // Gamescreen
    this.createRectangle(0, 0, this.canvas.height, this.canvas.width, 'black')

    // Score-text
    this.ctx.font = '20px serif'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`Score: ${this.score}`, 220, 50, 100)
    this.ctx.fillText(`Player name: ${this.username}`, 175, 80, 150)

    // Player
    this.createRectangle(this.playerXStart, this.playerYStart, this._paddleWidth, this._paddleHeight, 'white')
    this.createRectangle(this.computerX, this.computerY, this._computerPaddleWidth, this._paddleHeight, 'white')

    // Ball
    this.createCircle(this.ballX, this.ballY, this.ballRadius, 'white')
  }

  /**
   * Creates a circle in the canvas with a fill-color.
   *
   * @param {Number} posX The circle X-center position in the canvas.
   * @param {Number} posY The circle Y-center position in the canvas.
   * @param {Number} radius The radius of the circle.
   * @param {String} color The circles fill-color.
   * @memberof Paddle
   */
  createCircle (posX, posY, radius, color) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.arc(posX, posY, radius, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  /**
   * Creates a rectangle in the canvas with a fill-color.
   *
   * @param {Number} posX The rectangles x-start position.
   * @param {Number} posY The rectangles x-start position.
   * @param {Number} width The rectangles x-start position.
   * @param {Number} height The rectangles height.
   * @param {String} color The rectangles fill-color.
   * @memberof Paddle
   */
  createRectangle (posX, posY, width, height, color) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.fillRect(posX, posY, width, height)
    this.ctx.fill()
  }

  /**
   * Creates the scoreboard of the top 5 players, sorted by top score to lowest.
   * If there is more than 5 players in this.highscore, it
   * removes the last player and score.
   *
   * @memberof Paddle
   */
  createScoreBoard () {
    const nameAndScore = this.shadowRoot.querySelector('#nameandscore')
    nameAndScore.textContent = `${this.username} got ${this.score} points!`
    const playersToScoreBoard = this.highscore
    const playerscoreboardArray = Object.keys(this.highscore)
    if (playerscoreboardArray.length >= 1) {
      const listElements = this.shadowRoot.querySelector('#scoreboard')
      listElements.appendChild(document.createElement('ol'))
      const nameArray = []
      for (const obj in playersToScoreBoard) {
        nameArray.push([playersToScoreBoard[obj], obj])
      }
      nameArray.sort(function (a, b) {
        return b[0] - a[0]
      })
      if (nameArray.length > 5) {
        nameArray.pop()
      }
      this.highscore = {}
      nameArray.forEach((element) => {
        this.highscore[element[1]] = element[0]
      })

      const olList = this.shadowRoot.querySelector('#scoreboard ol')
      for (let i = 0; i < nameArray.length; i++) {
        const li = document.createElement('li')
        li.textContent = nameArray[i][1] + ', ' + nameArray[i][0] + ' points'
        olList.appendChild(li)
      }
      window.localStorage.setItem('highscore', JSON.stringify(this.highscore))
    }
  }

  /**
   * Adds an event listener to the "close-button" on the window.
   *
   * @memberof Paddle
   */
  closeButton () {
    const closeButton = this.shadowRoot.querySelector('.closeWindow')
    closeButton.addEventListener('click', () => {
      this.remove()
    })
  }
}

window.customElements.define('paddle-game', Paddle)
