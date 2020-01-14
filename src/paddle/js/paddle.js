import { gameTemplate } from './gameTemplate.js'

export default class Game extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(gameTemplate.content.cloneNode(true))
    this.username = ''
    this.canvas = this.shadowRoot.querySelector('#canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvasBox = this.shadowRoot.querySelector('.canvasbox')
    this.usernameBox = this.shadowRoot.querySelector('.username')
    this.gameOverBox = this.shadowRoot.querySelector('.gameover')
    this._gamePaddlesStartX = 10
    this._gamePaddlesStartY = 20
    this.playerPaddleSpeed = 10
    this.score = 0
    this.ballX = 250
    this.ballY = 400
    this.ballResetValueX = 250
    this.ballResetValueY = 400
    this.ballRadius = 10
    this.ballDeltaFactor = 0.1
    this.ballSpeedX = 2
    this.ballSpeedY = -1.5
    this.playerX = 200
    this.playerY = 480
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

  connectedCallback () {
    this.userNameEntry()
    this.closeButton()
  }

  disconnectedCallBack () {

  }

  userNameEntry () {
    this.shadowRoot.querySelector('#insertname').classList.add('hidden')
    if (window.localStorage.highscore) {
      this.highscore = JSON.parse(window.localStorage.getItem('highscore'))
    }
    // console.log(this.usernameBox.classList, 'hej')
    if (this.usernameBox.classList === 'hidden') {
      this.usernameBox.classList.remove('hidden')
    }
    if (this.gameOverBox.classList !== 'hidden') {
      this.gameOverBox.classList.add('hidden')
    }
    if (this.canvasBox.classList !== 'hidden') {
      this.canvasBox.classList.add('hidden')
    }
    const inputyfield = this.shadowRoot.querySelector('#usernameinput')
    // console.log(inputyfield)
    // inputyfield.shadowroot.querySelector()textContent = ''
    const userNameButton = this.shadowRoot.querySelector('#usernamebutton')
    userNameButton.addEventListener('click', () => {
      if (inputyfield.value) {
        this.username = inputyfield.value
        this.usernameBox.classList.toggle('hidden')
        this.canvasBox.classList.toggle('hidden')
        this.keypress()
        window.localStorage.setItem('highscore', JSON.stringify(this.highscore))
        setTimeout(() => {
          this.updateGame = setInterval(() => {
            this.createGameScreen()
            this.moveUpdate()
          }, 1000 / this.fps)
        }, 500)
      } else {
        this.shadowRoot.querySelector('#insertname').classList.remove('hidden')
      }
    })

    inputyfield.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        userNameButton.click()
      }
    })
  }

  keypress () {
    window.addEventListener('keydown', e => {
      // e.preventDefault()
      if (e.code === 'ArrowLeft') {
        if (this.playerX === 0) {
          this.playerX = this.playerX
        } else {
          this.playerX += -this.playerPaddleSpeed
        }
      }

      if (e.code === 'ArrowRight') {
        if ((this.playerX + this._paddleWidth) === this.canvas.width) {
          this.playerX = this.playerX
        } else {
          this.playerX += this.playerPaddleSpeed
        }
      }
    })
  }

  gameReset () {
    clearInterval(this.updateGame)
    this.canvasBox.classList.toggle('hidden')
    this.gameOverBox.classList.toggle('hidden')
    const resetButton = this.shadowRoot.querySelector('#restartgame')
    const highscoreArray = Object.keys(this.highscore)
    console.log(this.highscore[this.username], 'value på key')
    if (this.score > 0) {
      highscoreArray.forEach((name) => { // nisse 1, ada 2, hej 5 , spelande hej 1
        if (this.username !== name) { // hej 1
          console.log('namn ej samma, lagra i')
          this.highscore[this.username] = this.score
        } else {
          if (this.score > this.highscore[this.username]) { // this.highscore[this.username] = 5
            console.log('större score än lagrat highscore')
            this.highscore[this.username] = this.score
          }
        }
      })
      window.localStorage.setItem('highscore', JSON.stringify(this.highscore))
    }

    this.createScoreBoard()

    resetButton.addEventListener('click', () => {
      setTimeout(document.location.reload(true), 1000)
    })
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        resetButton.click()
      }
    })
  }

  winGame () {
    this.ctx.fillText('Score:', 100, 50)
  }

  computerMovement () {
    this.computerX += this._computerPaddleSpeed
    if ((this.computerX + this._computerPaddleWidth) > this.canvas.width) {
      this._computerPaddleSpeed = -this._computerPaddleSpeed
    }
    if (this.computerX < 0) {
      this._computerPaddleSpeed = -this._computerPaddleSpeed
    }
  }

  moveUpdate () {
    this.computerMovement()

    this.ballX += this.ballSpeedX
    this.ballY += this.ballSpeedY

    // Checks if the ball collides with canvas right side
    if (this.ballX > (this.canvas.width - this.ballRadius)) {
      this.ballSpeedX = -this.ballSpeedX
    }
    // Checks if the ball collides canvas with left side
    if (this.ballX < (0 + this.ballRadius)) {
      this.ballSpeedX = -this.ballSpeedX
    }
    // Check if ball collides with computer-paddle-bottom
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
    // Check if ball collides with player-paddle-top
    if ((this.ballY + this.ballRadius) > this.playerY && this.ballX > this.playerX && this.ballX < (this.playerX + this._paddleWidth)) {
      this.ballSpeedY = -this.ballSpeedY
      const deltaX = this.ballX - (this.playerX + (this._paddleWidth / 2))
      this.ballSpeedX = deltaX * this.ballDeltaFactor
      this.checkBallSpeed()
    }
    // Checks if ball collides with the top
    if (this.ballY < (0 + this.ballRadius)) {
      this.ballSpeedY = -this.ballSpeedY
    }
    // Checks if ball collides with bottom
    if (this.ballY > this.canvas.height) {
      this.gameReset()
    }
  }

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

  createGameScreen () {
    // Gamescreen
    this.createRectangle(0, 0, this.canvas.height, this.canvas.width, 'black')

    // Score-text
    this.ctx.font = '20px serif'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`Score: ${this.score}`, 200, 50, 100)

    // Player
    this.createRectangle(this.playerX, this.playerY, this._paddleWidth, this._paddleHeight, 'white')
    this.createRectangle(this.computerX, this.computerY, this._computerPaddleWidth, this._paddleHeight, 'white')

    // Ball
    this.createCircle(this.ballX, this.ballY, this.ballRadius, 'white')
  }

  createScoreBoard () {
    const playersToScoreBoard = JSON.parse(window.localStorage.highscore)
    if (playersToScoreBoard.length < 1) {
    } else {
      const listElements = this.shadowRoot.querySelector('#scoreboard')
      const h2 = document.createElement('h2')
      h2.textContent = 'Best scores:'
      listElements.appendChild(h2)
      listElements.appendChild(document.createElement('ol'))
      const nameArray = []
      for (const obj in playersToScoreBoard) {
        nameArray.push([playersToScoreBoard[obj], obj])
      }
      nameArray.sort(function (a, b) {
        return b[0] - a[0]
      })

      if (nameArray.length > 5) {
        for (let i = 5; i < nameArray.length; i++) {
          window.localStorage.removeItem(nameArray[5])
        }
      }
      this.highscore = {}
      nameArray.forEach((element) => {
        this.highscore[element[1]] = element[0]
      })

      const olList = this.shadowRoot.querySelector('#scoreboard ol')
      for (let i = 0; i < nameArray.length; i++) {
        const div = document.createElement('li')
        div.textContent = nameArray[i][1] + ', ' + nameArray[i][0] + ' poäng'
        olList.appendChild(div)
      }
    }
  }

  createCircle (posX, posY, radius, color) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.arc(posX, posY, radius, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  createRectangle (posX, posY, width, height, color) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.fillRect(posX, posY, width, height)
    this.ctx.fill()
  }

  closeButton () {
    const closeButton = this.shadowRoot.querySelector('.closeWindow')
    closeButton.addEventListener('click', (button) => {
      this.remove()
    })
  }
}

window.customElements.define('paddle-game', Game)
