const windowTemplate = document.createElement('template')
windowTemplate.innerHTML = `
<div class="mainbox">
    <button class="closeWindow">
    <div id="windowTop">
        </div>
    </button>
        
</div>
<style>
.mainbox {display:flex; flex-direction: column; width: 100%; height: auto; background-color: red; position: absolute;}
#windowTop {width: 500; height: 60px; background-color: blue;}
button {float: right;}

</style>
`

export { windowTemplate }
