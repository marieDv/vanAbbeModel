//SINUS


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);


var renderer = new THREE.WebGLRenderer();
var group = new THREE.Object3D();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let ambient = new THREE.AmbientLight();
var pointLight = new THREE.PointLight(0xffffff, 2, 400);
pointLight.position.set(10, 10, 70);
scene.add(pointLight);

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);
//scene.add(ambient);
let density = 1;
let posX = Math.sin((Math.random() * 10) + 1)* Math.PI;
let sinFac = 1;
for (let i = 0; i < 1300; i++) {

	if (i % 5 === 0) {
		// for (let j = 0; j< 80; j++) {
		// 	posX = (Math.random() * 10) + 1;
		// 	createSpheres(posX+(Math.random() * -10) + 5, i*(Math.random() * 0.5) + 0.1, density);
		// }
	} else {
		posX = (Math.sin(i/80)*sinFac) *80.5;//80   
		createSpheres(posX, Math.random(i/ 10.0)+(i-90), density);
	}
	sinFac ++;
	console.log(sinFac)
	if(sinFac === 10){
	if(sinFac === 10){
		sinFac = 1;
	}
}

scene.add(group);

camera.position.z = 350;
controls.update();


function createSpheres(x, y, density) {
	let geometry = new THREE.SphereGeometry(3, 5, 5);
	let material = new THREE.MeshPhongMaterial({ color: 0x2b2b2b, emissive: 0xbfbfbf });
	let cube = new THREE.Mesh(geometry, material);
	cube.position.z = -50;
	cube.position.x = x;
	cube.position.y = y - 400;
	group.add(cube);
}
var animate = function () {
	requestAnimationFrame(animate);


	controls.update();
	renderer.render(scene, camera);
};

animate();