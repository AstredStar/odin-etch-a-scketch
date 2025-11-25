RANDOM = "random"
const palette = ["red","orange","yellow","green","blue","purple"];
let paintColor= RANDOM;
let colorButtons=[];
const colorSelect = document.querySelector("#colorSelect");
const gridSize = 600;
const grid = document.querySelector("#grid");
const chopButton = document.querySelector("#set");
const rechopButton = document.querySelector("#reset");
const chopInput = document.querySelector("#chopGrid>input");
let chopNum = 10;

function resetColorButtons(){
    for (const btn of colorButtons) btn.style["background-color"] = "rgba(252, 245, 237, 1)"
}

function addColorButton(color){
    let button = document.createElement("button");
    button.classList.add("colorButton");
    button.title = `${color}`;

    button.onclick= (event) => {
        paintColor = color;
        resetColorButtons();
        event.target.style["background-color"]= "rgba(255, 145, 0, 1)";
    }

    colorButtons.push(button);
    colorSelect.appendChild(button);
    button.div = document.createElement("div");
    button.appendChild(button.div); 
    return button;
}

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
    if (paintColor==RANDOM) event.target.style["background-color"]=getRandomColor();

    else {
        if (event.target.mycolor !== paintColor) {
            event.target.mycolor = paintColor;
            event.target.style["background-color"] = paintColor;
        }
        else{
            let rgb = window.getComputedStyle( event.target ).getPropertyValue( "background-color" );
            event.target.style["background-color"] = darkenrgb(rgb);
        }
    }
     
})

chopButton.onclick = (event)=>{
    chopNum=chopInput.value;
    chopGrid(parseInt(chopNum));
}
rechopButton.onclick = (event)=>{
    chopGrid(parseInt(chopNum));
}

document.documentElement.style.setProperty("--grid-size", `${gridSize}px`);

chopGrid(chopNum);

let RNBColor = 'linear-gradient(45deg';
for (color of palette){
    RNBColor+= ','+color;
}
RNBColor+=')'
const rnbowButton = addColorButton(RANDOM);
rnbowButton.div.style["background"] = RNBColor;

for (color of palette) {
    const button = addColorButton(color);
    button.div.style["background-color"] = color;
}
resetColorButtons()
rnbowButton.style["background-color"]= "rgba(255, 145, 0, 1)";