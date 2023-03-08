function generateRandomColor() {
  let color = Math.floor(Math.random() * 16777215).toString(16);
  let lightcolor = Math.floor(Math.random() * 16777215).toString(16);
  return { color, lightcolor };
}

function Grid(element, initaliSize,_timeLeft, callback) {
  let score = 0;
  let initialGridSize = initaliSize;
  let cellSize = 100;
  let timeLeft = _timeLeft;


  function generateGrid(size) {
    const { color, lightcolor } = generateRandomColor();
    let tilesSize = Math.pow(size, 2);
    let lightTile = Math.floor(Math.random() * tilesSize);
    const gridFragment = document.createDocumentFragment();
    const grid = document.getElementById(element);
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < tilesSize; i++) {
      let tile = document.createElement("DIV");
      tile.style.width = `${cellSize}px`;
      tile.style.height = `${cellSize}px`;
      if (lightTile === i) {
        tile.setAttribute("data-type-tile", "ODD");
        tile.style.backgroundColor = "#" + color;
      } else {
        tile.setAttribute("data-type-tile", "EVEN");
        tile.style.backgroundColor = "#" + lightcolor;
      }
      tile.addEventListener('click',validateInput)
      gridFragment.appendChild(tile);
    }
    grid.append(gridFragment);
  }


  function validateInput(event){
    let type = event.target.getAttribute('data-type-tile');

    if(type ==='ODD'){
        increaseLevel();
        timeFunc(timeleft, 'reset')
   
    }
    else{
        score = 0;
        callback(score);
        resetGrid(false);
        initialGridSize = initaliSize;
        generateGrid(initialGridSize);
    }

  }

  function resetGrid(){
    const grid = document.getElementById(element);
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
  }
  function increaseLevel(){
    score++;
    initialGridSize++;
    resetGrid(true);
    generateGrid(initialGridSize);
    callback(score);

  }


  function timeFunc(timeleft){
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("counter").innerHTML = "Finished";
        resetGrid(false);
        initialGridSize = initaliSize;
        generateGrid(initialGridSize);
  
      } else {
        document.getElementById("counter").innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);
 
   
  }
  function initfunc() {
    callback(0);
    generateGrid(initialGridSize);
  }

  initfunc();
  timeFunc(timeLeft);
}
