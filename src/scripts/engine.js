const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        body: document.querySelector("body")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        initialTime: 10,
    }
};

function randomSquare() {
    if(state.values.initialTime > 0) {
        state.view.squares.forEach((square)=>{
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random()*9);

        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;

    } else {
        playSound("gameover");
        state.view.squares.forEach((square)=>{
            square.classList.remove("enemy");
            square.textContent = "GAME OVER";
        });
        clearInterval(state.values.timerId);
        clearInterval(state.values.timeIntervalId);
    }
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function addListenerHitBox() {
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                state.values.initialTime++; // Aumentar o tempo quando há um clique bem-sucedido
                state.view.timeLeft.textContent = state.values.initialTime;
                playSound("hit");
            }
        });
    });
}

function decrementTime() {
    state.values.timeIntervalId = setInterval(() => {
        if (state.values.initialTime > 0) {
            state.values.initialTime--;
            state.view.timeLeft.textContent = state.values.initialTime;
        } else {
            clearInterval(state.values.timeIntervalId);
        }
    }, 1000); // Decrementa a cada segundo
}


function initialize() {
    moveEnemy();
    decrementTime();
    addListenerHitBox();
}

initialize();