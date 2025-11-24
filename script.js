const gridSize = 600;
document.documentElement.style.setProperty("--grid-size", `${gridSize}px`);

const grid = document.querySelector("#grid");


function chopGrid (n){
    if (!Number.isInteger(n)) throw new Error('Number of squares must be an integer');
    if (n<1||n>100) throw new Error('Number of squares must be between 1 and 100');
    
    for (let x=0;x<n;x++){
        const strip = document.createElement('div');
        strip.classList.add("strip");
        for (let y=0;y<n;y++){
            const pixel = document.createElement('div');
            pixel.classList.add("pixel");
            strip.append(pixel);
        }
        grid.appendChild(strip);
    }
}

grid.addEventListener("mouseover",(event)=>{
    event.target.style["background-color"]="black";
})


chopGrid(10);