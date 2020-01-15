/**
 * @author Mattias Ruljeff
 * @version 1.1
 * @module src/memory-game
 * @class ChatWindow
 * @extends {window.HTMLElement}
 */
const memoryTemplate2x2 = document.createElement('template')
memoryTemplate2x2.innerHTML = `
<div class="mainbox">
    <div id="windowTop">
        <img id='logo' src="../image/memory.bmp" alt="Chat-image">
        <button class="closeWindow">X</button>
    </div>
    <div id="header">
        <h1>Memory</h1>
    </div>
    <div id="mainheader">
        <h2>Välj storlek på spelet</h2>
        <div id="maincontent">
            </div>
        </div>
        <div id="button">
            <button id='gamesize'>2x2</button>
            <button id='gamesize'>4x2</button>
            <button id='gamesize'>4x4</button>
        </div>
    </div>
    <audio id="tileSound" src="../sounds/imageclick.mp3"></audio>
</div>
<link rel="stylesheet" href="/memory-game/css/style.css">
`
export { memoryTemplate2x2 }
