// import * as THREE from 'three';
// import { MathUtils } from './assets/MathUtils.js';
// import { OrbitControls } from './assets/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
var width = window.innerWidth;
var height = window.innerHeight;
var shaderMaterial = null;
let start = Date.now();
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio * 1);

let fog = new THREE.Fog(0xff0000, 1, 300);
// var composer = new THREE.EffectComposer(renderer);
// composer.addPass(new THREE.RenderPass(scene, camera));
// composer.setPixelRatio(window.devicePixelRatio * 6);
// var afterimagePass = new THREE.AfterimagePass(1);
// composer.addPass(afterimagePass);

let params = {
	shape: 2,
	radius: 4,
	rotateR: Math.PI / 12,
	rotateB: Math.PI / 12 * 2,
	rotateG: Math.PI / 12 * 3,
	scatter: 0,
	blending: 1,
	blendingMode: 4,
	greyscale: false,
	disable: false
};
// let halftonePass = new THREE.HalftonePass(window.innerWidth, window.innerHeight, params);
// composer.addPass( renderPass );
// composer.addPass(halftonePass);



var group = new THREE.Object3D();
var shadowGroup = new THREE.Object3D();
group.matrixAutoUpdate = true;
var controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//BREDA 76.9,3.0,1.6,1.7,3.1,1.1,1.7,0.1,1.1,2.8,0.8,0.6,1.3,0.4,0.4,0.6,0.6,2.3
//EINDHOVEN 66.5, 2.7, 1.1, 4.6, 2.7, 1.5, 2.4, 0.2, 2.1, 4.1, 1.4, 0.9, 1.8, 1.6, 1.0, 0.7, 1.9, 2.8
//HELMOND 74.6,2.4,0.8,2.7,4.3,0.9,2.2,0.1,1.3,5.3,0.7,0.5,1.1,0.1,0.4,0.9,0.5,1.5
var array = [66.5, 2.7, 1.1, 4.6, 2.7, 1.5, 2.4, 0.2, 2.1, 4.1, 1.4, 0.9, 1.8, 1.6, 1.0, 0.7, 1.9, 2.8


];
var colors = [0x000000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff];

let ambient = new THREE.AmbientLight(0xffffff, 1.0);
var pointLight = new THREE.PointLight(0xffffff, 90, 300);
pointLight.position.set(0, 0, 160);
scene.add(pointLight);

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

let density = 1;
let volume = array[0];
let posX = Math.sin((Math.random() * 10) + 1) * Math.PI * Math.PI;
let posZ = 0;
let sinFac = 1;
for (let i = 0; i < array.length; i++) {
	volume = array[i];

	posX = ((Math.sin(i / 3) * sinFac) * 5.5) - 2;//80   
	posZ = (Math.sin(i / 1) * sinFac) * 10;//80   
	createSpheres(posX, posZ, i, volume, colors[i], i);

	sinFac++;
	

	if (sinFac === 10) {
		sinFac = 1;
	}
}
group.rotation.z = 1.1;
shadowGroup.rotation.z = 1.1;
scene.add(group);
scene.add(shadowGroup);

camera.position.z = 250;
camera.rotation.y = 80;
controls.update();

function mapTextLabels() {
	controls.update();
	for (let i = 0; i < array.length; i++) {
		group.matrixWorldNeedsUpdate;
		var wpVector = new THREE.Vector3();
		group.children[i].getWorldPosition(wpVector);
		let target = group.children[i].parent.worldToLocal(wpVector);
		let element = document.getElementsByClassName("labels")[0].children[i];

		const tempV = new THREE.Vector3();
		group.children[i].updateMatrix();
		group.children[i].getWorldPosition(tempV);
		tempV.project(camera);
		let tempX = (tempV.x * 0.5 + 0.5) * width;
		let tempY = (tempV.y * -0.5 + 0.5) * height;

		element.style.marginLeft = tempX + "px";
		element.style.top = tempY + "px";
		let style =
			"translate(-50%, -50%) translate(" + tempX + "px," + tempY + "px)";


	}
}
function createSpheres(x, z, y, volume, color, current) {
	var vertices = [];
	// var geometry = new THREE.SphereBufferGeometry(volume, volume, volume);
	var geometry = new THREE.Geometry();
	geometry.verticesNeedUpdate = true;
	// for (var i = 0; i < 90000; i++) {
	// 	const v = new THREE.Vector3();
	// const tx = THREE.MathUtils.randFloatSpread( -1, 1 )*volume;
	// 	const ty = THREE.MathUtils.randFloatSpread( -1, 1 )*volume;
	// 	const tz = THREE.MathUtils.randFloatSpread( -1, 1 )*volume;
	// 	const normalizationFactor = 1 / Math.sqrt( x * x + y * y + z * z );

	// 	v.x = tx * normalizationFactor * volume;
	// 	v.y = ty * normalizationFactor * volume;
	// 	v.z = tz * normalizationFactor * volume;

	// 	vertices.push(tx, ty, tz);
	// }
	var spherical = new THREE.Spherical();

	if (current === 0) {
		for (let i = 0; i < volume * 900; i++) {
			geometry.vertices.push(setRandomPointInBigSphere(volume, i));// 10 is the desired radius
		}
	} else {
		for (let i = 0; i < volume * 50; i++) {
			geometry.vertices.push(setRandomPointInSphere(volume));// 10 is the desired radius
		}
	}
	function setRandomPointInBigSphere(radius, i) {
		posX = ((Math.sin(i / 3) * sinFac) * 5.5) - 2;//80   


		var v = new THREE.Vector3(
			Math.cos(posX),
			// Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume  * 5.0 + Math.sin(i * 5),
			Math.cos(THREE.MathUtils.randFloatSpread(-2, 10)) * volume * 20.0 * Math.sin(i * 5),
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
			// THREE.Math.randFloatSpread(radius * 2) * Math.sin((5)*2,
			// THREE.Math.randFloatSpread(radius * 2) * Math.sin(5)*2,
			// THREE.Math.randFloatSpread(radius * 2) * Math.sin(5)*2
		);
		if (v.length() > radius) {
			return setRandomPointInSphere(radius);
		}
		return v;
	}

	function setRandomPointInSphere(radius) {
		var v = new THREE.Vector3(
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
			// THREE.Math.randFloatSpread(radius * 2) * Math.sin((5)*2,
			// THREE.Math.randFloatSpread(radius * 2) * Math.sin(5)*2,
			// THREE.Math.randFloatSpread(radius * 2) * Math.sin(5)*2
		);
		if (v.length() > radius) {
			return setRandomPointInSphere(radius);
		}
		return v;
	}



	var geometryShadow = new THREE.SphereBufferGeometry(volume, 6, 6);
	var shadergeo = new THREE.SphereBufferGeometry(volume, 40, 80);


	let allVerticePositions = [];

	for (let i = 0; i < 100; i++) {
		  allVerticePositions[i] = new THREE.Vector3(
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
		);
	}


	var test = new THREE.SphereBufferGeometry(100, 160, 80);
console.log(test)

		// test.setAttribute(
		// 	'position',
		// 	new THREE.BufferAttribute(new Float32Array(allVerticePositions), 3));		











	let cube;
	let filling;
	if (current === 0) {
		var fillmat = new THREE.PointsMaterial({ color: 0xa2a2a2, size: 0.3, transparent: true, opcaity: 0.9 });
		shaderMaterial = new THREE.ShaderMaterial({
			vertexShader: document.getElementById('vertexShaderrr').textContent,
			fragmentShader: document.getElementById('fragmentshaderrr').textContent,
			uniforms: {
				time: {
					type: "f",
					value: 1.0,
				},
				// blending: THREE.AdditiveBlending,
				// depthTest: false,
				// transparent: true,
			}
		});
		cube = new THREE.Points(test, shaderMaterial);
		cube.geometry.attributes.position.needsUpdate = true;

		filling = new THREE.Points(geometry, fillmat);
	} else {
		var material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.5 });
		cube = new THREE.Points(geometry, material);
	}

console.log(cube.geometry)
	// for(){

	// }

	let materialShadow = new THREE.MeshToonMaterial({
		transparent: true,
		opacity: 0.5, color: 0xffffff,
		wireframe: true,

		// map: new THREE.TextureLoader().load("./assets/0 73.8 200919_231313_0001.png"),
		// bumpMap: new THREE.TextureLoader().load("./assets/0 73.8 200919_231313_0001.png")
	});
	// let cube = new THREE.Points(geometry, material);
	let cubeShadow = new THREE.Mesh(geometryShadow, materialShadow);

	cube.position.z = -50 + z;
	cube.position.x = x;
	cube.position.y = y;
	cubeShadow.position.z = -50 + z;
	cubeShadow.position.x = x;
	cubeShadow.position.y = y;
	group.add(cube);
	group.add(filling);
	if (current !== 0) {
		shadowGroup.add(cubeShadow);
	}
}
var animate = function () {
	requestAnimationFrame(animate);
	shaderMaterial.uniforms['time'].value = .00025 * (Date.now() - start);
	// console.log(shaderMaterial.uniforms['time'])
	// group.rotation.y += 0.005;
	// shadowGroup.rotation.y += 0.005;
	controls.update();
	mapTextLabels();
	controls.update();
	// composer.render();
	renderer.render(scene, camera);
};

animate();