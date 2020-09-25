// import * as THREE from 'three';
// import { MathUtils } from './assets/MathUtils.js';
// import { OrbitControls } from './assets/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio * 3 );

var group = new THREE.Object3D();
var shadowGroup = new THREE.Object3D();
group.matrixAutoUpdate = true;
var controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var array = [66.5, 2.7, 1.1, 4.6, 2.7, 1.5, 2.4, 0.2, 2.1, 4.1, 1.4, 0.9, 1.8, 1.6, 1.0, 0.7, 1.9, 2.8
];
var colors = [0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff, 0xff0000, 0xff00ff, 0xff00ff];

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

	posX = ((Math.sin(i / 10) * sinFac) * 10.5) - 90;//80   
	posZ = (Math.sin(i / 1) * sinFac) * 10;//80   
	createSpheres(posX, posZ, i, volume, colors[i], i);

	sinFac++;
	console.log(sinFac)

	if (sinFac === 10) {
		sinFac = 1;
	}
}

scene.add(group);
scene.add(shadowGroup);

camera.position.z = 450;
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
	for(let i = 0; i < volume*500; i++){
		geometry.vertices.push(setRandomPointInSphere(volume));// 10 is the desired radius
	}
	
	function setRandomPointInSphere(radius){
		var v = new THREE.Vector3(
			THREE.Math.randFloatSpread(radius * 2),
			THREE.Math.randFloatSpread(radius * 2),
			THREE.Math.randFloatSpread(radius * 2)
		);
		if (v.length() > radius){
			return setRandomPointInSphere(radius);
		}
		return v;
	}


console.log(vertices);
	var geometryShadow = new THREE.SphereBufferGeometry(volume, 10, 10);

	// }else{
	// var geometryShadow = new THREE.SphereBufferGeometry(volume, volume, volume);
	// }
	// console.log(geometry)
	let aösd = new THREE.Float32BufferAttribute(vertices, 3);
	// geometry.setAttribute('position', aösd);


	var material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

	// var points = new THREE.Points( geometry, material );

	// console.log(MathUtils)

	// let geometry = new THREE.SphereGeometry(volume, 5, 7);
	let materialShadow = new THREE.MeshToonMaterial({
		transparent: true,
		opacity: 0.1, color: color, 


		// map: new THREE.TextureLoader().load("./assets/0 73.8 200919_231313_0001.png"),
		// bumpMap: new THREE.TextureLoader().load("./assets/0 73.8 200919_231313_0001.png")
	});
	let cube = new THREE.Points(geometry, material);
	let cubeShadow = new THREE.Mesh(geometryShadow, materialShadow);

	cube.position.z = -50 + z;
	cube.position.x = x;
	cube.position.y = y;
	cubeShadow.position.z = -50 + z;
	cubeShadow.position.x = x;
	cubeShadow.position.y = y;
	group.add(cube);
	shadowGroup.add(cubeShadow);
}
var animate = function () {
	requestAnimationFrame(animate);

	controls.update();
	mapTextLabels();
	controls.update();
	renderer.render(scene, camera);
};

animate();