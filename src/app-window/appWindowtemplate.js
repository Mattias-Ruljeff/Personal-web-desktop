const windowTemplate = document.createElement('template')
windowTemplate.innerHTML = `
<div class="mainbox">
    <div class="windowTop">
        <button class="closeWindow">X</button>
    </div>
    <div class="appbox"></div>    
</div>
<style>
.mainbox {display:flex; flex-direction: column; width: 400px; height: auto; background-color: red; position: absolute;}
#windowTop { width: 400px; height: 30px; background-color: blue;}
button {float: right;}

</style>
`

export { windowTemplate }
