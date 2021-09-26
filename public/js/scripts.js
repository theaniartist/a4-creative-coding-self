const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const overlay = document.getElementById('overlay')
const content = document.getElementById('content')
const title = document.getElementById('title')
const playBtn = document.getElementById('play')

const sajouBtn = document.getElementById('sajou'),
      sawanoBtn = document.getElementById('sawano'),
      reonaBtn = document.getElementById('reona'),
      lisaBtn = document.getElementById('lisa'),
      utadaBtn = document.getElementById('utada'),
      sasanomalyBtn = document.getElementById('sasanomaly'),
      aimerBtn = document.getElementById('aimer')

let color = 'white';

const sajou = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F01.%20Gray.mp3?v=1632606001734"
const sawano = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F02.Hands%20Up%20to%20the%20Sky.mp3?v=1632612774842"
const reona = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F03.Untitled%20world.mp3?v=1632613620178"
const lisa = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F01.%20%E7%B4%85%E8%93%AE%E8%8F%AF.mp3?v=1632679415882"
const utada = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F01.PINK%20BLOOD.mp3?v=1632679673420"
const sasanomaly = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F01.%E7%A9%BA%E3%81%A8%E8%99%9A.mp3?v=1632680283648"
const aimer = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F04%203min.mp3?v=1632680298458"

//audio init
const audioCtx = new AudioContext()
const audioElement = document.createElement('audio')
document.body.appendChild(audioElement)

const start = function () {

    //audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024
    const player = audioCtx.createMediaElementSource(audioElement)
    player.connect(audioCtx.destination)
    player.connect(analyser)

    audioElement.src = sajou
    audioElement.play()
    audioElement.crossOrigin = "anonymous";

    const results = new Uint8Array(analyser.frequencyBinCount)

    draw = function () {
        window.requestAnimationFrame(draw)

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = color

        analyser.getByteFrequencyData(results)

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
            ctx.fillRect(i, canvas.height, 3, -results[i])
        }
    }
    draw()
}

playBtn.addEventListener('click', function() {
    document.body.removeChild(overlay)
    document.body.removeChild(title)
    content.style.display = 'block'
    audioCtx.resume()
    start()
})

sajouBtn.addEventListener('click', function() {
    audioElement.src = sajou
    audioElement.play()
})

sawanoBtn.addEventListener('click', function() {
    audioElement.src = sawano
    audioElement.play()
})

reonaBtn.addEventListener('click', function() {
    audioElement.src = reona
    audioElement.play()
})

lisaBtn.addEventListener('click', function() {
    audioElement.src = lisa
    audioElement.play()
})

utadaBtn.addEventListener('click', function() {
    audioElement.src = utada
    audioElement.play()
})

sasanomalyBtn.addEventListener('click', function() {
    audioElement.src = sasanomaly
    audioElement.play()
})

aimerBtn.addEventListener('click', function() {
    audioElement.src = aimer
    audioElement.play()
})

const defaultColor = document.getElementById('default'),
      red = document.getElementById('redGradient'),
      green = document.getElementById('greenGradient'),
      blue = document.getElementById('blueGradient'),
      purple = document.getElementById('purpleGradient')

defaultColor.addEventListener('click', function() {
    color = 'white';
})

red.addEventListener('click', function() {
    let gradient = ctx.createLinearGradient(170, 0, 0, 0)
    gradient.addColorStop(0, "#D67F74")
    gradient.addColorStop(1, "#D63936")
    color = gradient;
})

green.addEventListener('click', function() {
    let gradient = ctx.createLinearGradient(170, 0, 0, 0)
    gradient.addColorStop(0, "#91D6C3")
    gradient.addColorStop(1, "#32D6AC")
    color = gradient;
})

blue.addEventListener('click', function () {
    let gradient = ctx.createLinearGradient(0, 0, 170, 0)
    gradient.addColorStop(0, "#0087F5")
    gradient.addColorStop(1, "#7DC6E0")
    color = gradient;
})

purple.addEventListener('click', function() {
    let gradient = ctx.createLinearGradient(170, 0, 0, 0)
    gradient.addColorStop(0, "#B89FD6")
    gradient.addColorStop(1, "#9563D6")
    color = gradient;
})