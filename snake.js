
const board = document.querySelector('.game-board');
const scoreText = document.querySelector('.score');
let gridSize = 20;
let  snake = [{x:10, y:10}];
let direction = {x:0, y:0};
let food = {x:5,y:5};
let score = 0;
let dengerFood = {x:3,y:3};
//Initizlize Board;
for(let i = 0; i < gridSize*gridSize; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell)
}
function draw(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell)=>{cell.className = 'cell'});

    cells[food.y * gridSize+food.x].classList.add('food');

    cells[dengerFood.y*gridSize+dengerFood.x].classList.add('dengerfood')

    
    snake.forEach((segment)=>{
        cells[segment.y*gridSize+segment.x].classList.add('snake')
    });
}

function moveSnake(){
    const head = {...snake[0]};
    head.x+=direction.x;
    head.y+=direction.y;
    if(head.x === food.x && head.y === food.y){
        snake.unshift(head);
        score++;
        scoreText.innerHTML = `Score: ${score}`
        placefood();
    } else{snake.pop();
    snake.unshift(head);}

    if(head.x===dengerFood.x && head.y === dengerFood.y){
            score--;
            scoreText.innerHTML = `Score: ${score}`
            placeDengerFood();}

    if(head.x <0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize
        || snake.slice(1).some(segment=> segment.x === head.x && segment.y === head.y))
        {alert('GameOver');
        resetGmae();}
     

}

function placefood(){
    food={
        x: Math.floor(Math.random()*gridSize),
        y: Math.floor(Math.random()*gridSize)
    }
}
function placeDengerFood(){
   dengerFood ={
        x: Math.floor(Math.random()*gridSize),
        y: Math.floor(Math.random()*gridSize)
    }
}

function resetGmae(){
    snake=[{x:10, y:10}];
    direction = {x:0, y:0}
    score =0;
    scoreText.innerHTML = `score: ${score}`
    placefood();
}
window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
      case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
      case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
      case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
  });

  document.querySelector('.arrow-up').addEventListener('click',()=>{
    if (direction.y === 0) direction = { x: 0, y: -1 };
  });
  document.querySelector('.arrow-left').addEventListener('click',()=>{
    if (direction.x === 0) direction = { x: -1, y: 0 };
  });
  document.querySelector('.arrow-right').addEventListener('click', ()=>{
    if (direction.x === 0) direction = { x: 1, y: 0 };
  });
  document.querySelector('.arrow-down').addEventListener('click',()=>{
   if (direction.y === 0) direction = { x: 0, y: 1 };
  });

  function gameLoop(){
    moveSnake();
    draw();
  }
  setInterval(gameLoop, 150)

