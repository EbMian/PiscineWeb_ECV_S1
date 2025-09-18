import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // alpha: true,
    // premultipliedAlpha: false,
});

const container = document.getElementById('canvasContainer');
const width = container.clientWidth;
const height = container.clientHeight;
renderer.setSize(width, height);

const fov = 50;
const aspect = width / height;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = .1 / 2;
camera.position.y = .25 / 2;
camera.position.x = .4 / 2;

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, .025, 0);
controls.update();

container.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let meshColor = 'antiquewhite';

// document.getElementById('changeColorButton').addEventListener('click', () => changeColor())

function changeColor() {
    if (meshColor == 'antiquewhite') meshColor = 'salmon';
    else meshColor = 'antiquewhite';
    console.log(meshColor);
    loadMug();
};

loadMug();

function loadMug() {
    loader.load('../../../assets/models/mug-cup/scene.gltf', function (gltf) {

        gltf.scene.traverse(obj => {
            if (obj.isMesh) {
                console.log(obj);
                obj.castShadow = true;
                obj.material = new THREE.MeshStandardMaterial({ color: meshColor, roughness: .1 })
            };
        })
        scene.add(gltf.scene);

    }, undefined, function (error) {

        console.error(error);

    });
}

const color = 0xFFFFFF;
const intensity = 1;
const AmbientLight = new THREE.AmbientLight(color, intensity);
AmbientLight.castShadow = true;
const DirectionalLight = new THREE.DirectionalLight(color, intensity);
DirectionalLight.position.x = 1;
DirectionalLight.position.z = 1;
DirectionalLight.position.y = 0;
DirectionalLight.castShadow = true;
scene.add(AmbientLight, DirectionalLight);

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);