const memoryTemplate2x2 = document.createElement('template')
memoryTemplate2x2.innerHTML = `
<link rel="stylesheet" href="/memory-game/css/style.css">
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

const memoryTemplate4x4 = document.createElement('template')
memoryTemplate4x4.innerHTML = `
<link rel="stylesheet" href="/memory-game/css/style.css">
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
<style>#imageBox {width: 400px;}</style>
`

export { memoryTemplate2x2, memoryTemplate4x4 }
