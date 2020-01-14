/**
 * @author Mattias Ruljeff
 * @version 1.0
 * @module src/chat
 * @customElement 'chat-window'
 * @class ChatWindow
 * @extends {window.HTMLElement}
 */
const mainTemplate = document.createElement('template')
mainTemplate.innerHTML = `
<link rel="stylesheet" href="css/style.css">

<div id="mainbox">

<div id="menu">

<div id="memory"></div>
<div id="chat"></div>
<div id="paddle"></div>

</div>
</div>
`

export { mainTemplate }
