const mainTemplate = document.createElement('template')
mainTemplate.innerHTML = `
<link rel="stylesheet" href="css/style.css">
<div id="header">
<h1>Memory</h1>
</div>
<div id="mainbox">
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
<style>#imageBox {width: 200px;}</style>
`
export { mainTemplate }
