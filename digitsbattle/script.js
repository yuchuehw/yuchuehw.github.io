let SEED = 0;
let PROBLEM_ORDER = []
let PROBLEM = -1
let SUBPROBLEM = 4
let SKIPS = 5
let HAVE_TIME = 1

let LOCK = null;
let SOLVED = 0;
let STARTED = 0

let n1 = null;
let op = null;
let n2 = null;
let numbers = []
let target = 0;

let l = [];
let ll = [];

const op_ref = {
  "+": (a, b) => {
    return a + b;
  },
  "−": (a, b) => {
    return a - b >= 0 ? a - b : null;
  },
  "×": (a, b) => {
    return a * b;
  },
  "÷": (a, b) => {
    return a / b == Math.floor(a / b) ? a / b : null;
  }
};

const PLACEHOLDER = document.getElementById("history-placeholder-desktop");
const PLACEHOLDER2 = document.getElementById("history-placeholder-mobile");
const CONTAINER = document.getElementById("history-desktop");
const CONTAINER2 = document.getElementById("history-mobile");
const NUM_CONTAIN = document.getElementById("numbers");

const playButton = document.getElementById("play-button");



function main(element) {
  if (!HAVE_TIME){
    return
  }
  if (!STARTED){
    STARTED = 1
    startTimer()
  }
  if (n1 == null) {
    if (element.classList.contains("number")) {
      n1 = element;
      n1.classList.add("active");
    }
  } else if (n1 != null && op == null) {
    if (element.classList.contains("number")) {
      if (element == n1) {
        n1.classList.remove("active");
        n1 = null;
      } else {
        n1.classList.remove("active");
        n1 = element;
        n1.classList.add("active");
      }
    } else if (element.classList.contains("operation")) {
      op = element;
      op.classList.add("active");
    }
  } else if (n1 != null && op != null && LOCK == null) {
    LOCK = 1;
    if (element.classList.contains("operation")) {
      if (element == op) {
        op.classList.remove("active");
        op = null;
      } else {
        op.classList.remove("active");
        op = element;
        op.classList.add("active");
      }
      LOCK = null;
    } else if (element.classList.contains("number")) {
      n2 = element;
      n2.classList.add("active");
      setTimeout(operate, 500);
    }
  }
}

function operate() {
  const val = op_ref[op.id](Number(n1.innerHTML), Number(n2.innerHTML));
  if(n1 == n2){
    
  }else if (val) {
    l.push(n1);
    l.push(n2);
    ll.push(n1.innerHTML);
    ll.push(n2.innerHTML);
    const history = `${n1.innerHTML} ${op.id} ${n2.innerHTML} = ${val}`;
    PLACEHOLDER.remove();
    PLACEHOLDER2.remove();
    const el = document.createElement("li");
    el.classList.add("history-entry");
    el.style.display = "flex";
    el.innerHTML = history;
    if (CONTAINER.childElementCount) {
      CONTAINER2.lastChild.style.display = "none";
    }
    CONTAINER.append(el);
    CONTAINER2.append(el.cloneNode(true));
    
    n2.innerHTML = val;
    n1.remove();
    l.push(n2);
    ll.push(val);
  }
  n1.classList.remove("active");
  op.classList.remove("active");
  n2.classList.remove("active");

  n1 = null;
  op = null;
  n2 = null;
  LOCK = null;
  if (val == target) {
    SOLVED += 1;
    next_question();
  }
}

function toggleHistoryDrawer() {
  const el = document.getElementById("game-status-mobile");
  if (el.classList.contains("collapsed")) {
    const entries = CONTAINER2.children;
    for (const entry of entries) {
      entry.style.display = "flex";
    }
    el.classList.remove("collapsed");
  } else {
    const entries = CONTAINER2.children;
    for (const entry of entries) {
      entry.style.display = "none";
    }
    CONTAINER2.lastChild.style.display = "flex";
    el.classList.add("collapsed");
  }
}

function undo() {
  if (l.length == 0) {
    return;
  }
  l.pop().remove();
  ll.pop();
  let el = l.pop();
  el.innerHTML = ll.pop();
  NUM_CONTAIN.append(el);
  el = l.pop();
  el.innerHTML = ll.pop();
  NUM_CONTAIN.append(el);
  if (CONTAINER.childElementCount) {
    CONTAINER.lastChild.remove();
    CONTAINER2.lastChild.remove();
  }
  if (CONTAINER.childElementCount) {
    CONTAINER2.lastChild.style.display = "flex";
  } else {
    CONTAINER.append(PLACEHOLDER);
    CONTAINER2.append(PLACEHOLDER2);
  }
}

function next_question() {
  if(SUBPROBLEM == 4){
    PROBLEM += 1
    SUBPROBLEM = 0
  }else{
    SUBPROBLEM += 1
  }
  const problem_ = PROBLEM_DB[PROBLEM_ORDER[PROBLEM]]
  numbers = problem_.numbers[SUBPROBLEM]
  target = problem_.targets[SUBPROBLEM]
  document.getElementById("share-button").innerHTML = "# Solved:" + SOLVED;
  undo();
  undo();
  undo();
  undo();
  undo();

  document.getElementById("number-pos-0").innerHTML = numbers[0];
  document.getElementById("number-pos-1").innerHTML = numbers[1];
  document.getElementById("number-pos-2").innerHTML = numbers[2];
  document.getElementById("number-pos-3").innerHTML = numbers[3];
  document.getElementById("number-pos-4").innerHTML = numbers[4];
  document.getElementById("number-pos-5").innerHTML = numbers[5];
  document.getElementById("target").innerHTML = target;
}


function startTimer(){
  const countDownDate = new Date().getTime()+300000;
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  // Update the count down every 1 second
  const x = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("reveal-button").innerHTML = "🕒" + minutes + ":" + zeroPad(seconds,2);

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("reveal-button").innerHTML = "TIMES UP!";
      HAVE_TIME = 0
    }
  }, 1000);

}

function shuffle(array, seed) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(random(seed) * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed
  }

  return array;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}


function seedCheck(input_object){
  if(input_object.value[3]){
    document.getElementById("play-button").style["background-color"]="#000000"
  }else{
    document.getElementById("play-button").style["background-color"]="#cccccc"
  }
}

function battle(){
  if(document.getElementById("seed").value[3]){
    SEED=document.getElementById("seed").value;  
    document.getElementById("cover").style="display:none"
    PROBLEM_ORDER = shuffle(Array.from(Array(90), (_,x) => x), SEED)
    next_question()
  }
}

function skip(){
  if(SKIPS){
    SKIPS = SKIPS - 1
    next_question()
    if(SKIPS > 1){
      document.getElementById("back-to-puzzles-button").innerHTML = SKIPS + " SKIPS LEFT"    
    }else if(SKIPS == 1){
      document.getElementById("back-to-puzzles-button").innerHTML = "1 SKIPS LEFT"
    }else{
      const el = document.getElementById("back-to-puzzles-button")
      el.id = "next-puzzle-button"
      el.innerHTML = "NO SKIP LEFT"
    }
    
  }
}

function number_only(input_field){
  input_field.value = input_field.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}
window.addEventListener('load', function () {
  playButton.style.backgroundColor = "#cccccc";
  document.getElementById('seed').onkeypress = function(e) {
    if(e.keyCode == 13) {
        battle()
    }
}
})




