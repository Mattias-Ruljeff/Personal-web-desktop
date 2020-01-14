const memoryTemplate2x2 = document.createElement('template')
memoryTemplate2x2.innerHTML = `
<link rel="stylesheet" href="/memory-game/css/style.css">
<div class="mainbox">
<div id="windowTop">
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
<button>2x2</button>
<button>4x2</button>
<button>4x4</button>
</div>
</div>
</div>
`
export { memoryTemplate2x2 }
