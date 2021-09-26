const sajou = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F01.%20Gray.mp3?v=1632606001734"
const sawano = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F02.Hands%20Up%20to%20the%20Sky.mp3?v=1632612774842"
const reona = "https://cdn.glitch.com/1be4c9fb-3024-481f-be52-d8a904df0358%2F03.Untitled%20world.mp3?v=1632613620178"

const start = function () {

    document.body.innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.body.appendChild( canvas )
    canvas.width = canvas.height = 512
    const ctx = canvas.getContext( '2d' )

    //audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement('audio')
    document.body.appendChild(audioElement)

    //audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024
    const player = audioCtx.createMediaElementSource(audioElement)
    player.connect(audioCtx.destination)
    player.connect(analyser)

    audioElement.src = reona
    audioElement.play()
    audioElement.crossOrigin = "anonymous";

    const results = new Uint8Array(analyser.frequencyBinCount)

    draw = function () {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame(draw)

        // fill our canvas with a black box
        // by doing this every frame we 'clear' the canvas
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // set the color to white for drawing our visuaization
        ctx.fillStyle = 'white'

        analyser.getByteFrequencyData(results)

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
            ctx.fillRect(i, 0, 1, results[i]) // upside down!
        }
    }

    draw()
}

window.onload = () => document.getElementById('reona').onclick = start



