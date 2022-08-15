const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 5000 //innerWidth //- 30
canvas.height = 5000 //innerHeight //- 30
/*
addEventListener('resize', () => {
  canvas.width = innerWidth // - 30
  canvas.height = innerHeight // - 30
  draw()
})
*/
//canvas.style.border = '2vh solid black'
let offsetX = 0
let offsetY = 0
let getOffset = function () {
  let canvas_offsets = canvas.getBoundingClientRect()

  offsetX = canvas_offsets.left
  offsetY = canvas_offsets.top
}

getOffset()

window.onscroll = function () {
  getOffset()
}

let shapes = []
let curent_shape_index = null
let is_dragging = false
let startX
let startY
shapes.push({
  x: 900,
  y: 500,
  width: 100,
  height: 100,
  color: 'red',
  name: 'Redsquare',
})
shapes.push({
  x: 10,
  y: 100,
  width: 200,
  height: 50,
  color: '#7868E6',
  name: 'platform1',
})
shapes.push({
  x: 10,
  y: 100,
  width: 200,
  height: 50,
  color: '#7868E6',
  name: 'platform2',
})
shapes.push({
  x: 10,
  y: 100,
  width: 200,
  height: 50,
  color: '#7868E6',
  name: 'platform3',
})

let is_mouse_in_shape = function (x, y, shape) {
  let shape_left = shape.x
  let shape_right = shape.x + shape.width
  let shape_top = shape.y
  let shape_bottom = shape.y + shape.height

  if (x > shape_left && x < shape_right && y < shape_bottom && y > shape_top)
    return true
  return false
}

function update() {
  //console.log(curent_shape.x)
  //console.log(curent_shape.x)
  document.getElementById('x').innerHTML = 'X: ' + curent_shape.x
  document.getElementById('y').innerHTML = 'Y: ' + curent_shape.y
  document.getElementById('name').innerHTML = curent_shape.name
  //console.log(curent_shape)
  document.getElementById('width').innerHTML = 'width: ' + curent_shape.width
  document.getElementById('height').innerHTML = 'height: ' + curent_shape.height
}

let mouse_down = function (event) {
  event.preventDefault()
  startX = parseInt(event.clientX - offsetX)
  startY = parseInt(event.clientY - offsetY)

  let index = 0
  for (let shape of shapes) {
    if (is_mouse_in_shape(startX, startY, shape)) {
      curent_shape_index = index
      is_dragging = true
      return
    } 
    index++
  }
}

let mouse_up = function (event) {
  if (!is_dragging) {
    return
  }
  event.preventDefault()
  is_dragging = false
  //update()
}
let mouse_out = function (event) {
  if (!is_dragging) {
    return
  }
  event.preventDefault()
  is_dragging = false
}
let curent_shape
let mouse_move = function (event) {
  if (!is_dragging) return
  else {
    event.preventDefault()
    let mouseX = parseInt(event.clientX - offsetX)
    let mouseY = parseInt(event.clientY - offsetY)
    let dx = mouseX - startX
    let dy = mouseY - startY

    curent_shape = shapes[curent_shape_index]
    curent_shape.x += dx
    curent_shape.y += dy
    draw()
    startX = mouseX
    startY = mouseY
    //console.log(curent_shape)
    //console.log('X: ', curent_shape.x)
    //c.font = '48px serif';
    //c.fillText('X: '+curent_shape.x, 100, 100);
    //c.fillText('Y: '+curent_shape.y, 100, 150);
  }
}
export default curent_shape

let right_click = function (event) {
  for (let shape of shapes) {
    if (is_mouse_in_shape(startX, startY, shape)) {
      event.preventDefault()
      let curent_shape = shapes[curent_shape_index]
    }
  }
}

canvas.onmousedown = mouse_down
canvas.onmouseup = mouse_up
canvas.onmouseout = mouse_out
canvas.onmousemove = mouse_move
canvas.oncontextmenu = right_click

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgb(55, 55, 55)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  for (let shape of shapes) {
    c.fillStyle = shape.color
    c.fillRect(shape.x, shape.y, shape.width, shape.height)
  }
  update()
}
draw()
