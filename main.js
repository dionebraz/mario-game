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

themeAudio.volume = 0.75
menuAudio.volume = 0.75

window.onload = menuAudio.play()

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

  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
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
    }
  }, 10);

  document.addEventListener('keydown', jump)
  document.addEventListener('click', jump)
}

startButton.addEventListener('click', start)
