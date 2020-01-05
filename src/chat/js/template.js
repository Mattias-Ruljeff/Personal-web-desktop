const chatTemplate = document.createElement('template')
chatTemplate.innerHTML = `
<link rel="stylesheet" href="./css/style.css">
<div class="username">
    <p>Enter your username:</p>
    <input id='usernameinput' type="text" minlength="1" maxlength="100">
    <button id='usernamebutton'>Ok</button>
</div>

<div class="mainbox">
    <div id="windowTop">
        <button class="closeWindow">X</button>
    </div>

    <div id="header">
        <h2>Chat-window</h2>
    </div>

    <div id="mainheader"></div>
    <div id="maincontent"></div>

    <input id='chatmessage' type="text" minlength="1" maxlength="100">

    <div id="button">
        <button>Skicka</button>
    </div>
</div>
<style>#imageBox {width: 100px;}</style>
`
export { chatTemplate }
