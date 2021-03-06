/**
 * @author Mattias Ruljeff
 * @version 1.2
 * @module src/memory-game
 * @class ChatWindow
 * @extends {window.HTMLElement}
 */
const gameTemplate = document.createElement('template')
gameTemplate.innerHTML = `
<link rel="stylesheet" href="/paddle/css/style.css">
<div class="mainbox">
<div id="windowtop">
    <img id='logo' src="../image/paddle.bmp" alt="Chat-image">
    <button class="closeWindow">X</button>
</div>
<div class="username">
    <h1>PADDLE!</h1>
    <p>Hit the paddle in the top to score points!</p>
    <p>Enter your name:</p>
    <input id='usernameinput' type="text" minlength="1" maxlength="100">
    <div id='insertname'>Insert a name!</div>
    <button id='usernamebutton'>PLAY!</button>
    <p>Play with keyboard!</p>
    <p>Arrow left and arrow right to move paddle!</p>
</div>

<div class="canvasbox">
</div>

<div class="gameover">
    <h1>Game over!</h1>
    <h2>Scoreboard:</h2>
    <div id='scoreboard'></div>
    <div id='nameandscore'></div>
    
    <button id='restartgame'>Restart game</button>
</div>
</div>
`
export { gameTemplate }
