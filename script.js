const palette = ["red","yellow","blue","green","orange","purple"];
let paintColor= -1;

function rgbToint(rgb){
    let colors = rgb.slice(4,-1).split(',');
    for (let i=0;i<3;i++){  
        colors[i] = parseInt(colors[i])
    }
    return colors;
}

function intTorgb (colors){
    return `rgb(${colors[0]},${colors[1]},${colors[2]})`
}

function darkenrgb (rgb){ 
    let colors = rgbToint(rgb);
    for (let i=0;i<3;i++){
        colors[i] = Math.max(colors[i]-26,0);
    }
    return intTorgb(colors);
}

const gridSize = 600;
document.documentElement.style.setProperty("--grid-size", `${gridSize}px`);

const grid = document.querySelector("#grid");

function chopGrid (n){
    if (!Number.isInteger(n)) {
        alert('Number of squares must be an integer');
        throw new Error('Number of squares must be an integer');
    }
    if (n<1||n>100) {
        alert('Number of squares must be between 1 and 100');
        throw new Error('Number of squares must be between 1 and 100');
    }

    grid.innerHTML='';
    for (let x=0;x<n;x++){
        const strip = document.createElement('div');
        strip.classList.add("strip");
        for (let y=0;y<n;y++){
            const pixel = document.createElement('div');
            pixel.classList.add("pixel");
            pixel.mycolor= 'none';
            strip.append(pixel);
        }
        grid.appendChild(strip);
    }
}

function setPaintColor (color){
    paintColor = color;
}

function getRandomColor(){
    const index = Math.floor(Math.random()*palette.length)
    return palette[index]
}

grid.addEventListener("mouseover",(event)=>{
    if (paintColor==-1) event.target.style["background-color"]=getRandomColor();

    else {
        if (event.target.mycolor !== palette[paintColor]) {
            event.target.mycolor = palette[paintColor];
            event.target.style["background-color"] = palette[paintColor];
        }
        else{
            let rgb = window.getComputedStyle( event.target ).getPropertyValue( "background-color" );
            event.target.style["background-color"] = darkenrgb(rgb);
        }
    }
     
})

const chopButton = document.querySelector("#chopGrid>button");
const chopInput = document.querySelector("#chopGrid>input");
chopButton.onclick = (event)=>{
    chopGrid(parseInt(chopInput.value));
}

chopGrid(10);
