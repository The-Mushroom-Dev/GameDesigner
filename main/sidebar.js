const sidebar = document.getElementById('sidebar')
const ctx = sidebar.getContext('2d')
/*
sidebar.width = 300
sidebar.height = innerHeight
addEventListener('resize', () => {
sidebar.height = innerHeight
sidebar.width = 300
})
*/
ctx.fillStyle = 'white'
ctx.fillRect(0,0,sidebar.width,sidebar.height)
import curent_shape from "./main.js"
//document.getElementById("wow").innerHTML = 5 + 6;
