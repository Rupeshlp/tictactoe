console.log('Hello World!');

let audioTurn = new Audio("turn.mp3");
let gameOverAudio = new Audio("gameover.mp3");

let gameOver = false;
let turn = 'X';

let playerXName;
let player0Name;
let win;
let turnfor;
let inputName;
let count = 0;

// change turn for X and 0
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
}

// check win 
const checkWin = () => {

  let boxTexts = document.getElementsByClassName('box-text');

  // console.log(boxTexts.innerHTML);

  let wins = [
    [0, 1, 2, 0, -30, 0, 250, 0, -10.5, 0],
    [3, 4, 5, 0, 0, 0, 250, 0, 0, 0],
    [6, 7, 8, 0, 29, 0, 250, 0, 10.5, 0],
    [0, 3, 6, -29, 0, 90, 250, -10.5, 0, 90],
    [1, 4, 7, 0, 0, 90, 250, 0, 0, 90],
    [2, 5, 8, 29, 0, 90, 250, 10.5, 0, 90],
    [0, 4, 8, 0, 0, 45, 300, 0, 0, 45],
    [2, 4, 6, 0, 0, -45, 300, 0, 0, -45],
    ];

  wins.forEach(e => {


    if ((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[2]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[0]].innerText !== '')) {


      const myFunction = (x) => {

        if (x.matches) { // If media query matches

          document.getElementById('underLine').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

        } else {
          document.getElementById('underLine').style.transform = `translate(${e[7]}vw, ${e[8]}vw) rotate(${e[9]}deg)`;
        }
      }

      let x = window.matchMedia("(max-width: 700px)")
      myFunction(x) // Call listener function at run time
      x.addListener(myFunction)

      document.getElementById('underLine').style.width = `${e[6]}px`;

      win = boxTexts[e[0]].innerText;

      let winX = document.querySelector('.turnFor');

      if ((player0Name === '' && playerXName === '')) {

        winX.innerText = boxTexts[e[0]].innerText + ' win';
        winX.style.color = '#17FF00';
        winX.style.fontSize = 30 + 'px';
        winX.style.background = "transparent";

      } else if (player0Name === '' && boxTexts[e[0]].innerText === "0") {

        winX.innerText = '0 win';
        winX.style.color = '#17FF00';
        winX.style.fontSize = 30 + 'px';
        winX.style.background = "transparent";

      } else if (playerXName === '' && boxTexts[e[0]].innerText === "X") {

        winX.innerText = 'X win';
        winX.style.color = '#17FF00';
        winX.style.fontSize = 30 + 'px';
        winX.style.background = "transparent";

      } else if (boxTexts[e[0]].innerText === "X") {

        winX.innerText = playerXName + " win"
        winX.style.color = '#17FF00';
        winX.style.fontSize = 30 + 'px';
        winX.style.background = "transparent";

      } else if (boxTexts[e[0]].innerText === "0") {

        winX.innerText = player0Name + " win";
        winX.style.color = '#17FF00'
        winX.style.fontSize = 30 + 'px';
        winX.style.background = "transparent";
      }

      let boxContainer = document.getElementById('box-container');
      let winImage = document.getElementById('winImage');

      winImage.style.width = 60 + '%'
      boxContainer.style.marginTop = 120 + 'px';

      gameOver = true;
      gameOverAudio.play();

      // console.log(boxTexts[e[0]].innerText);
      // console.log(player0Name);
    }
  })
}




let setName = document.getElementById('setName');
setName.addEventListener('click', () => {
  let playerX = document.getElementById("playerX");
  let player0 = document.getElementById("player0");
  

  playerXName = playerX.value.toUpperCase();
  player0Name = player0.value.toUpperCase();

  document.getElementsByClassName("turnFor")[0].innerText = "Turn for " + playerXName;

  inputName = playerXName;
  let OName;
  let xName;

  turnfor = () => {
    return inputName === playerXName ? player0Name : playerXName;

    return xName == playerXName;
    return OName == player0Name;

  }

  // console.log(a);
  // console.log(playerXName, player0Name);

  playerX.value = "";
  player0.value = "";
  playerX.style.display = `none`;
  player0.style.display = `none`;
  setName.style.display = `none`;

  let boxs = document.getElementsByClassName("box");
  Array.from(boxs).forEach(element => {


    element.addEventListener('click', () => {

      if ((count === 9) && (win === '' || win === undefined)) {

        document.getElementsByClassName("turnFor")[0].style.display = 'none';
        document.getElementsByClassName("draw")[0].style.display = 'block';

      }

      if (!gameOver) {

        let boxText = element.querySelector(".box-text");
        // console.log(boxText);
        if (boxText.innerText === '') {
          boxText.innerText = turn;
          turn = changeTurn();
          checkWin();
          inputName = turnfor();
          audioTurn.play();

          if (!gameOver) {

            if (inputName == '') {
              document.getElementsByClassName("turnFor")[0].innerText = "Turn for " + turn;
              // audioTurn.play()
            } else {
              document.getElementsByClassName("turnFor")[0].innerText = "Turn for " + inputName;
              // audioTurn.play()
            }
          }
          count++;
        }

      }

    })

  })

})


let playAgain = document.getElementById('playAgain');

playAgain.addEventListener('click', () => {
  let boxText = document.querySelectorAll(".box-text");
  Array.from(boxText).forEach(element => {
    element.innerText = "";
  })
  turn = 'X';
  gameOver = false;
  inputName = playerXName;

  if (inputName == '') {
    document.getElementsByClassName("turnFor")[0].innerText = "Turn for " + turn;
  } else {
    document.getElementsByClassName("turnFor")[0].innerText = "Turn for " + inputName;
  }

  document.getElementById('underLine').style.width = 0 + 'px';

  document.getElementsByClassName("turnFor")[0].style.display = 'block';
  document.getElementsByClassName("draw")[0].style.display = 'none';

  let boxContainer = document.getElementById('box-container');
  let winImage = document.getElementById('winImage');
  let winX = document.querySelector('.turnFor');

  winImage.style.width = 0 + '%';
  boxContainer.style.marginTop = 0 + 'px';

  count = 0;
  win = '';

})


let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  location.reload();
})



setInterval(() => {
  let randomNum = Math.round(2 + (15 - 2) * Math.random());
  let body = document.body;
  body.style.backgroundImage = `url(bg/bg${randomNum}.jpg)`;
}, 4000);




playerX.addEventListener('focusin', ()=>{
  let borderLine1 = document.getElementById('borderLine1');
  borderLine1.style.width = `280px`;
})
playerX.addEventListener('focusout', ()=>{
  let borderLine1 = document.getElementById('borderLine1');
  borderLine1.style.width = `0px`;
})

player0.addEventListener('focusin', ()=>{
  let borderLine2 = document.getElementById('borderLine2');
  borderLine2.style.width = `280px`;
})
player0.addEventListener('focusout', ()=>{
  let borderLine2 = document.getElementById('borderLine2');
  borderLine2.style.width = `0px`;
})

