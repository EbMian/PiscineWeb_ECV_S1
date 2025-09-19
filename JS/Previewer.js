
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { previewOptions } from './Data.js';

export class Previewer {
    constructor({ canvasId = 'c', containerId = 'canvasContainer', interactive = true } = {}) {
        this.scene = new THREE.Scene();
        this.canvas = document.querySelector(`#${canvasId}`);
        this.container = document.querySelector(`#${containerId}`);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 10);
        this.camera.position.set(.2, .125, .05);

        this._setupControls();

        this._setupLights();

        this.loader = new GLTFLoader();
        this._scale;
        this._color;
        this._roughness;

        this.interactive = interactive;
        this._mug = null;
        this._meshes = [];
    }

    _setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.target.set(0, .025, 0);
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.update();
    }

    _setupLights() {
        const color = 0xFFEEEE;
        const intensity = 1;
        const ambient = new THREE.AmbientLight(color, intensity);
        ambient.castShadow = true;
        const directional = new THREE.DirectionalLight(color, intensity);
        directional.position.set(1, -.4, 1);
        directional.castShadow = true;
        this.scene.add(ambient, directional);
    }

    loadMug() {
        if (this._mug) {
            this.scene.remove(this._mug);
            this._mug = null;
        }
        this.loader.load('../../../assets/models/mug-cup/scene.gltf', (gltf) => {
            gltf.scene.traverse(obj => {
                if (obj.isMesh) {
                    obj.material = new THREE.MeshStandardMaterial({ color: this._color, roughness: this._roughness });
                    obj.castShadow = true;
                    console.log(obj);
                    this._meshes.push(obj);
                }
            });
            this._mug = gltf.scene;
            this.scene.add(this._mug);
            // Appliquer les propriétés juste après le chargement
            this.applyPreviewOptions();
        }, undefined, (error) => {
            console.error(error);
        });
    }

    applyPreviewOptions() {
        if (this._mug) {
            this._mug.scale.setScalar(this._scale);
        }
        if (this._meshes.length > 0) {
            this._meshes.forEach(mesh => {
                mesh.material.color.set(this._color);
                mesh.material.roughness = this._roughness;
                mesh.material.needsUpdate = true;
            });
        }
        this.makeRender();
    }


    changeSize(scale) {
        this._scale = previewOptions.size[scale];
        if (this._mug) {
            this._mug.scale.setScalar(this._scale);
        }
        this.makeRender();
    }

    changeColor(color) {
        this._color = previewOptions.colors[color];
        if (this._meshes.length > 0) {
            this._meshes.forEach(mesh => {
                mesh.material.color.set(this._color);
            });
        }
    }

    changeRoughness(roughness) {
        this._roughness = previewOptions.finish[roughness];
        if (this._meshes.length > 0) {
            this._meshes.forEach(mesh => {
                mesh.material.roughness = this._roughness;
            });
        }
    }

    renderPreview({ scale, color, roughness, interactive = true }) {
        this._scale = previewOptions.size[scale];
        this._color = previewOptions.colors[color];
        this._roughness = previewOptions.finish[roughness];
        this.interactive = interactive;
        this.loadMug();
    }

    makeRender() {
        if (this.interactive) {
            this.animate();
        } else {
            this.controls.reset();
            this.renderFrame();
        }
    }

    renderFrame() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.renderer.setAnimationLoop(null);
        this.renderer.setAnimationLoop(() => {
            this.renderFrame();
        });
    }
}