/**
 * @author Mattias Ruljeff
 * @version 1.1
 * @module src/chat
 * @customElement 'chat-window'
 * @class ChatWindow
 * @extends {window.HTMLElement}
 */
const chatTemplate = document.createElement('template')
chatTemplate.innerHTML = `
<link rel="stylesheet" href="chat/css/style.css">
<div class="mainbox">
    <div class="windowtop">
    <img id='logo' src="../image/chat.bmp" alt="Chat-image">
        <button class="closeWindow">X</button>
    </div>
<div class="username">
    <p>Enter your username:</p>
    <input id='usernameinput' type="text" minlength="1" maxlength="100">
    <button id='usernamebutton'>Ok</button>
</div>

<div class="chatbox">
    <button id='changeUsername'>Change username</button>
    <div id='yourUserName'>
    </div>
    <div id="header">
        <h2>Chat-window</h2>
    </div>

    <div id="mainheader"></div>
    <div id="maincontent"></div>
    
    <div id="chatwindow">
        <input id='chatmessage' type="text" minlength="1" maxlength="100">
    </div>
    
   <div id="emojidiv">    </div>
        

    <div id="button">
        <button id='send'>Send</button>
    </div>
</div>

</div>
</div>
`
export { chatTemplate }
