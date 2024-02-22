import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  .01,
  100
)

const clock = new THREE.Clock()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.09
// controls.enablePan = false
// controls.enableZoom = false
const scene = new THREE.Scene()
const meshes = {}
const lights = {}
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
//pointer.x or ponter.y for 1st or 2nd value of pointer

init()
function init() {
  // set up our render default settings, add scene/canvas to webpage
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  meshes.default = addBoilerPlateMeshes()
  meshes.standard = addStandardMesh()
  lights.default = addLight()

  scene.add(lights.default)
  scene.add(meshes.standard)
  scene.add(meshes.default)

  camera.position.set(0, 0, 5)
  // learnGSAP()
  raycast()
  resize()
  animate()
}

function raycast() {
  window.addEventListener('click', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.userData.name == 'target1') {
        gsap.to(intersects[i].object.scale,{
          x: 4,
          y: 4,
          z: 4,
          duration: 10,
          ease: 'power3.inOut'
        })
      }
    }
  })
}

function learnGSAP() {
  const button = document.querySelector('.tempButton')
  button.addEventListener('click', (event) => {
    gsap.to(meshes.default.scale, {
      x: 4,
      y: 4,
      z: 4,
      duration: 10,
      ease: 'power3.InOut',
    })
    gsap.to(meshes.standard.scale, {
      x: .2,
      y: .2,
      z: .2,
      duration: 2,
      ease: 'power2.in',
    })
  })
}

function resize() {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  controls.update()
  meshes.default.rotation.x += 0.01
  meshes.default.rotation.z += 0.01
  meshes.standard.rotation.y += 0.04
  meshes.standard.rotation.z += 0.04
  renderer.render(scene, camera)
}

