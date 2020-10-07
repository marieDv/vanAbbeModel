// import * as THREE from 'three';
// import { MathUtils } from './assets/MathUtils.js';
// import { OrbitControls } from './assets/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
var width = window.innerWidth;
var height = window.innerHeight;
var shaderMaterial = null;
var shaderMaterialSmall = null;
let start = Date.now();
var renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true});
renderer.setPixelRatio(window.devicePixelRatio * 2);

// scene.fog = new THREE.Fog(0xff0000, 1, 2.0);
// var composer = new THREE.EffectComposer(renderer);
// composer.addPass(new THREE.RenderPass(scene, camera));
// composer.setPixelRatio(window.devicePixelRatio * 6);
// var afterimagePass = new THREE.AfterimagePass(1);
// composer.addPass(afterimagePass);




// var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
// 			bloomPass.threshold = 1.0;
// 			bloomPass.strength = 2.0;
// 			bloomPass.radius = 2.0;

// 			var bloomComposer = new THREE.EffectComposer( renderer );
// 			bloomComposer.renderToScreen = false;
// 			bloomComposer.addPass( scene );
// 			bloomComposer.addPass( bloomPass );
// 			var composer = new EffectComposer( renderer );
// 			composer.addPass( scene );


function saveCanvas() {
  let canvas = document.querySelector('canvas');
  let link = document.createElement('a');
  let timestamp = new Date().toISOString();
  link.download = timestamp + '.png';
  link.href = canvas.toDataURL();
  link.style.display = 'none';     // Firefox
  document.body.appendChild(link); // Firefox
  link.click();
  document.body.removeChild(link); // Firefox
}
document.addEventListener('keydown', e => {
  // console.log(e.key, e.keyCode, e);
  if (e.key == 's') { // s .. save frame
    saveCanvas();
  }
});






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

//DEN HAAG
//47.3, 3.4, 0.6, 7.5, 5.9, 2.2, 2.2, 0.3, 2.7, 6.3, 2.0, 1.6, 2.3, 1.5, 0.8, 0.7, 1.5, 11.3

//TILBURG
//73.8,2.2,1.2,3.7,2.8,0.8,1.5,0.1,1.0,3.8,1.1,0.6,1.9,0.2,0.5,0.4,0.7,3.8,

//BREDA
//76.9,3.0,1.6,1.7,3.1,1.1,1.7,0.1,1.1,2.8,0.8,0.6,1.3,0.4,0.4,0.6,0.6,2.3


//BEN BOSCH
//80.1,2.6,0.7,1.8,3.2,0.9,1.7,0.1,0.9,2.1,1.0,0.5,0.9,0.2,0.6,0.5,0.5,1.9,


//HELMOND

//74.6,2.4,0.8,2.7,4.3,0.9,2.2,0.1,1.3,5.3,0.7,0.5,1.1,0.1,0.4,0.9,0.5,1.5




var array = [74.6,2.4,0.8,2.7,4.3,0.9,2.2,0.1,1.3,5.3,0.7,0.5,1.1,0.1,0.4,0.9,0.5,1.5



];
var colors = [0x000000, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a, 0xffe55a];

let ambient = new THREE.AmbientLight(0xffffff, 1.0);
var pointLight = new THREE.PointLight(0xffffff, 90, 300);
pointLight.position.set(0, 0, 160);
scene.add(pointLight);

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add(pointLightHelper);

let density = 1;
let volume = array[0];
let posX = Math.sin((Math.random() * 10) + 1) * Math.PI * Math.PI;
let posZ = 0;
let sinFac = 1;
for (let i = 0; i < array.length; i++) {
	volume = array[i];

	posX = ((Math.sin(i / 3) * sinFac) * 10.5) - 2;//80   
	posZ = (Math.sin(i / 1) * sinFac) * 10;//80   
	createSpheres(i, i*20.0, i, volume, colors[i], i);

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

	var geometry = new THREE.Geometry();
	geometry.verticesNeedUpdate = true;

	var geometrySmall = new THREE.Geometry();
	geometrySmall.verticesNeedUpdate = true;

	var spherical = new THREE.Spherical();

	if (current === 0) {
		for (let i = 0; i < volume * 20; i++) {
			geometrySmall.vertices.push(setRandomPointInBigSphere(volume, i));// 10 is the desired radius
		}
		for (let i = 0; i < volume * 100; i++) {
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
			Math.cos(THREE.MathUtils.randFloatSpread(-2, 10)) * volume * 20.0 * Math.sin(i * 5),
			Math.sin(THREE.MathUtils.randFloatSpread(-2, 10)) * volume,
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


	var test = new THREE.SphereBufferGeometry(2*volume, 160, 110);
	var testSmall = new THREE.SphereBufferGeometry(150, 90, 90);
	var testVol = new THREE.SphereBufferGeometry(2*volume, volume*5.0, volume*5.0);





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
				random: {
					type: "f",
					value: 1.0
				},
				distortion: {
					type: "f",
					value: 2.1,
				},
				pointSize: {
					type: "f",
					value: 2.6,
				},
				blending: THREE.AdditiveBlending,
			}
		});

		shaderMaterialSmall = new THREE.ShaderMaterial({
			vertexShader: document.getElementById('vertexShaderrr').textContent,
			fragmentShader: document.getElementById('fragmentshaderrr').textContent,
			uniforms: {
				time: {
					type: "f",
					value: 1.0,
				},
				random: {
					type: "f",
					value: 1.0
				},
				distortion: {
					type: "f",
					value: 100.0,
				},
				pointSize: {
					type: "f",
					value: 2.1,
				},
				blending: THREE.AdditiveBlending,
			}
		});

		
		cube = new THREE.Points(test, shaderMaterial);
    cube.rotation.x = 1.5;
		cube.geometry.attributes.position.needsUpdate = true;

		filling = new THREE.Points(geometry, fillmat);
	} else {
		let testShaderMat = new THREE.ShaderMaterial({
			vertexShader: document.getElementById('vertexShaderrr').textContent,
			fragmentShader: document.getElementById('fragmentshaderrr').textContent,
			uniforms: {
				time: {
					type: "f",
					value: 1.0,
				},
				random: {
					type: "f",
					value: 1.0
				},
				distortion: {
					type: "f",
					value: 3.0,
				},
				pointSize: {
					type: "f",
					value: 3.7,
				},
				blending: THREE.AdditiveBlending,
			}
		});
		var material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.9 });
    cube = new THREE.Points(testVol, testShaderMat);
    
	}

console.log(cube.geometry)
	// for(){

	// }

	let materialShadow = new THREE.MeshToonMaterial({
		transparent: true,
		opacity: 0.1, color: 0xffe55a,
		wireframe: true,
	});
	let cubeShadow = new THREE.Mesh(geometryShadow, materialShadow);

	cube.position.z = -50 + z;
	cube.position.x = x*0.5;
	cube.position.y = y*3.5;
	cubeShadow.position.z = -50 + z;
	cubeShadow.position.x = x*0.5;
  cubeShadow.position.y = y*3.5;
  
  if(current === 0){
  //  cube.position.x = 90;
  // cube.position.z= 100;
  }

if(current === 0){
	let cubeCopy = new THREE.Points(testSmall, shaderMaterialSmall);
	cubeCopy.scale.x = 0.80;
	cubeCopy.scale.y = 0.80;
	cubeCopy.scale.z = 0.80;

	cubeCopy.position.x = x;
	cubeCopy.position.y = y;
  cubeCopy.position.z = -50 + z;
  // cubeCopy.position.z= 100;
	shadowGroup.add(cubeCopy);
}
	group.add(cube);
	// group.add(filling);
	if (current !== 0) {
	//	shadowGroup.add(cubeShadow);
	}
}
var animate = function () {
	requestAnimationFrame(animate);
	shaderMaterial.uniforms['time'].value = .00025 * (Date.now() - start);
	shaderMaterialSmall.uniforms['time'].value = .00025 * (Date.now() - start);
	shaderMaterial.uniforms['random'].value = (Math.random() * 10-1) + 1;
	shaderMaterialSmall.uniforms['random'].value = (Math.random() * 10-1) + 1;
	
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