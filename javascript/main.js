// start game
var myStart = document.querySelector(".start-up span");
myStart.onclick = function () {
  var nameFirst = prompt("what is your name ?");
  if (nameFirst == null || nameFirst == "") {
    document.querySelector(".info-container span").innerHTML = "unknow";
  } else {
    document.querySelector(".info-container span").innerHTML = nameFirst;
  }
  document.querySelector(".start-up").remove();
};
// time duration and selcetors we will use

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
setTimeout(() => {
  blocksContainer.classList.add("is-flipped");
}, duration);
let blocks = Array.from(blocksContainer.children);
// arry of 19 .key
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);
// for each for blocks to make it with random order and event click for each block
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
// flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  // filter the flipped
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // condatian if flipped 2 ?
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// stopClicking function and duration
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check the Mathched blocked
function checkMatchedBlocks(firstBlock, secondBlock) {
  // tries
  let triesElement = document.querySelector(".tries span");
  // if match
  if (firstBlock.dataset.animal === secondBlock.dataset.animal) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    triesElement.style.color = "red";
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
// suffle the arry to make it random
function shuffle(arry) {
  let current = arry.length /* 19 */,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = arry[current];
    arry[current] = arry[random];
    arry[random] = temp;
    return arry;
  }
}

// sound function
function playAudio(url) {
  new Audio(url).play();
}
