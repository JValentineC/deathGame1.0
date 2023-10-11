let lives = 3;
let score = 0;
let timers = {};

function startGame() {
  window.location.href = "firstRiddle.html";
}

function updateLivesDisplay() {
  document.getElementById("lives").innerText = lives;
}

function updateScoreDisplay() {
  document.getElementById("score").innerText = score;
}

function checkAnswer() {
  const userAnswer = prompt("Enter your answer:").toLowerCase();
  const keywords = [
    "closed windows",
    "the windows were all closed",
    "windows closed",
    "the detective saw all the windows were closed",
    "the windows were closed",
    "windows were closed",
    "windows",
    "closed",
  ];
   if (keywords.some((keyword) => userAnswer.includes(keyword.toLowerCase()))) {
    score++;
    updateScoreDisplay(); 
    // Update the score display immediately
    window.location.href = "secondRiddle.html"; 
    // Navigate to the next page only when the answer is correct
    } 
   else {
    lives--;
    alert(
      `Try again Lives left: ${lives}. Hint: What does the detective do on each floor?`
    );
    updateLivesDisplay();

    if (lives === 0) {
      gameOver();
    }
  }
  // Save the score in localStorage so it can be accessed on the next page
  localStorage.setItem("score", score);
}

function startTimer(seconds, riddlePage) {
  timers[riddlePage] = setInterval(() => {
    document.getElementById("timer").innerText = seconds;

    if (seconds === 0) {
      clearInterval(timers[riddlePage]);
      lives--;
      alert(`Time's up! Lives left: ${lives}.`);
      updateLivesDisplay();

      if (lives === 0) {
        gameOver();
      } else {
        // Save the score in localStorage so it can be accessed on the next page
        localStorage.setItem("score", score);
        // No navigation on timer expiration, staying on the current page
      }
    } else {
      seconds--;
    }
  }, 1000);
}

function gameOver() {
  alert("Pathetic. Game Over. Restarting...");
  // Clear the score from localStorage when the game is over
  localStorage.removeItem("score");
  window.location.href = "index.html";
}
