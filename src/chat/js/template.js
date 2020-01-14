const chatTemplate = document.createElement('template')
chatTemplate.innerHTML = `
<link rel="stylesheet" href="chat/css/style.css">
<div class="mainbox">
    <div class="windowTop">
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

    <input id='chatmessage' type="text" minlength="1" maxlength="100">

    <div id="button">
        <button id='send'>Send</button>
    </div>
</div>
</div>
<style>#imageBox {width: 100px;}</style>
`
export { chatTemplate }
