'use strict'

const mario = document.querySelector('.run-mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameBoard = document.querySelector('.game-board')
const menu = document.querySelector('.menu')
const startButton = document.querySelector('.btn')
const themeAudio = document.querySelector('.theme-audio')
const jumpAudio = document.querySelector('.jump-audio')
const deadAudio = document.querySelector('.dead-audio')
const menuAudio = document.querySelector('.menu-audio')
const scoreElement = document.getElementById('scoreValue')
const previousScoreElement = document.getElementById('previousScoreValue')

const morningGradient = "linear-gradient(to top, #FAD0C4, #FFB6B9, #FFC0CB)"
const afternoonGradient = "linear-gradient(to top, #FFDAB9, #FFA07A, #FF7F50)"
const nightGradient = "linear-gradient(to top, #4169E1, #483D8B, #6A5ACD)"

let score = 0
let previousScore = 0

window.onload = menuAudio.play()
themeAudio.volume = 0.25
menuAudio.volume = 0.25

function changeBackground() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 6 && hours < 12) {
    gameBoard.style.background = morningGradient;
  } else if (hours >= 12 && hours < 18) {
    gameBoard.style.background = afternoonGradient;
  } else {
    gameBoard.style.background = nightGradient;
    gameBoard.style.borderBottom = '20px solid rgba(0, 140, 0, 0.5)'
  }
}

changeBackground()

const start = () => {
  menu.style.display = 'none'

  setInterval(() => {
    pipe.classList.add('pipe-animation')
    clouds.classList.add('clouds-animation')
  }, 2400)

  menuAudio.pause()
  themeAudio.play()

  let jumping = false
  const jump = () => {
    if (!jumping) {
      jumping = true
      mario.classList.add('jump')
      jumpAudio.play()
      jumpAudio.volume = 0.5

      setTimeout(() => {
        mario.classList.remove('jump')
        jumping = false
      }, 500)
    }
  };

  const previousScoreFromLocalStorage = localStorage.getItem('previousScore');
  if (previousScoreFromLocalStorage !== null) {
    previousScore = parseInt(previousScoreFromLocalStorage);
    updatePreviousScoreDisplay();
  }

  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
      previousScore = score > previousScore ? score : previousScore;
      localStorage.setItem('previousScore', previousScore);
      updatePreviousScoreDisplay();

      score = 0;
      scoreElement.textContent = score;

      mario.src = '/images/dead-mario.png'
      mario.style.width = '55px'
      mario.style.marginLeft = '10px'
      mario.style.bottom = `${marioPosition}px`
      mario.classList.remove('jump')

      pipe.style.animation = 'none'
      pipe.style.left = `${pipePosition}px`

      clouds.style.right = `${cloudsPosition}px`
      clouds.style.animation = 'none'

      themeAudio.volume = 0.4
      deadAudio.play()

      clearInterval(loop)

      setInterval(() => {
        location.reload()
      }, 3250)
    } else {
      score += 1
      scoreElement.textContent = score
    }
  }, 10);

  function updatePreviousScoreDisplay() {
    previousScoreElement.textContent = previousScore;
  }

  document.addEventListener('keydown', jump)
  document.addEventListener('click', jump)
}

startButton.addEventListener('click', start)
