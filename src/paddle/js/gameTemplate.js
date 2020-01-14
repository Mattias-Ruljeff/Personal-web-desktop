const gameTemplate = document.createElement('template')
gameTemplate.innerHTML = `
<link rel="stylesheet" href="/paddle/css/style.css">
<div class="mainbox">
<div id="windowTop">
    <button class="closeWindow">X</button>
</div>
<div class="username">
    <p>Enter your name:</p>
    <input id='usernameinput' type="text" minlength="1" maxlength="100">
    <div id='insertname'>Insert a name!</div>
    <button id='usernamebutton'>PLAY!</button>
    <p>Play with keyboard! Arrow left and arrow right to move paddle!</p>
</div>

<div class="canvasbox">
    <canvas id='canvas' width='500' height='500'></canvas>
</div>

<div class="gameover">
    <h1>Game over!</h1>
    <div id='scoreboard'></div>
    
    <button id='restartgame'>Restart game</button>
</div>
</div>
`
export { gameTemplate }
