const mainTemplate = document.createElement('template')
mainTemplate.innerHTML = `
<link rel="stylesheet" href="css/style.css">

<div id="mainbox">

<div id="menu">

<div id="memory"></div>
<div id="chat"></div>
<div id="otherapp"></div>

</div>
</div>
`

const appWindowTemplate = document.createElement('template')
appWindowTemplate.innerHTML = `
<link rel="stylesheet" href="css/style.css">

<div id="appWindow">
    <div class="windowTop"></div>
    <button class="closeWindow">X</button>
</div>
`

export { mainTemplate, appWindowTemplate }
