var https = require('https')
var fs = require('fs')

const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()
const path = require('path')

var options = {
  key: fs.readFileSync(path.join(__dirname, 'certificates/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certificates/cert.pem')),
}

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      handle(req, res)
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port}`)
    })
})
