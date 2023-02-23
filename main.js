var scene, camera, renderer, controls;
var mesh;
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

init();

function init() {
	// create the scene
	scene = new THREE.Scene();

	// create the camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, 0, 5);

	// create the renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("canvas-container").appendChild(renderer.domElement);

	// create the controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.screenSpacePanning = false;
	controls.minDistance = 1;
	controls.maxDistance = 10;
	controls.maxPolarAngle = Math.PI / 2;

	// load the obj file
	document.getElementById("file-input").addEventListener("change", function (event) {
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function (event) {
			var contents = event.target.result;
			var loader = new THREE.OBJLoader();
			var object = loader.parse(contents);
			scene.add(object);
		};
		reader.readAsText(file);
	});

	// add some lights
	var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);
	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(0, 1, 1);
	scene.add(directionalLight);

	// render the scene
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
