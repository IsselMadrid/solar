
let stopRender = false;
let camera, scene, renderer;
let geometry, material, mSol;
let mouse;
let ang1 = 0.0;
let ang2 = 0.0;
let ang3 = 0.0;
let ang4 = 0.0;
let ang5 = 0.0;

init();
animate();
function AgregOrbita(scene, radio) {
    let curve = new THREE.EllipseCurve(0,  0, radio, radio, 0,  6.28, false, 0);
    let points = curve.getPoints( 50 );
    let geometry = new THREE.BufferGeometry().setFromPoints( points );
    let material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
    let ellipse = new THREE.Line( geometry, material );
        ellipse.rotation.x = 3.14/2;
        scene.add( ellipse );
}
    
function init() {

	scene = new THREE.Scene();
    let aspect = window.innerWidth / window.innerHeight;
    let d = 0.6;
    camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

    camera.position.set( 20, 20, 20 ); // all components equal
    camera.lookAt( scene.position ); // or the origin
    

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth*1, window.innerHeight*1);
	document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    
    //Sol
    let texture = new THREE.TextureLoader().load( 'texturasol.jpg' );
	geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
	material = new THREE.MeshBasicMaterial( { map: texture } );
	mSol = new THREE.Mesh( geometry, material );
	scene.add( mSol );
    
    //Planeta
    texture = new THREE.TextureLoader().load( 'texturamercurio.png' );
	geometry = new THREE.SphereGeometry( 0.03, 32, 32 );
	material = new THREE.MeshBasicMaterial( { map: texture } );
	mPlan1 = new THREE.Mesh( geometry, material );
	scene.add( mPlan1 );
    AgregOrbita(scene, 0.2); //Órbita
    
    //Planeta
    texture = new THREE.TextureLoader().load( 'texturavenus.jpg' );
	geometry = new THREE.SphereGeometry( 0.04, 32, 32 );
	material = new THREE.MeshBasicMaterial( { map: texture } );
	mPlan2 = new THREE.Mesh( geometry, material );
	scene.add( mPlan2 );
    AgregOrbita(scene, 0.4); //Órbita

    //Planeta
    texture = new THREE.TextureLoader().load( 'textura_tierra.jpg' );
	geometry = new THREE.SphereGeometry( 0.05, 32, 32 );
	material = new THREE.MeshBasicMaterial( { map: texture } );
	mPlan3 = new THREE.Mesh( geometry, material );
	scene.add( mPlan3 );
    AgregOrbita(scene, 0.6); //Órbita
    
    //Planeta
    texture = new THREE.TextureLoader().load( 'texturamarte.jpg' );
	geometry = new THREE.SphereGeometry( 0.04, 32, 32 );
	material = new THREE.MeshBasicMaterial( { map: texture } );
	mPlan4 = new THREE.Mesh( geometry, material );
	scene.add( mPlan4 );
    AgregOrbita(scene, 0.8); //Órbita

    //Objetos adicionales
    mouse = new THREE.Vector2();
}

function animate() {
	requestAnimationFrame( animate );
    if (stopRender) return;

    ang1 = ang1 - 0.03;
    ang2 = ang2 - 0.02;
    ang3 = ang3 - 0.013;
    ang4 = ang4 - 0.01;
	//Rotación del sol
	mSol.rotation.y += 0.03;
    //Traslación de planeta
    mPlan1.position.x = 0.2 * Math.cos(ang1);
    mPlan1.position.z = 0.2 * Math.sin(ang1);

    mPlan2.position.x = 0.4 * Math.cos(ang2);
    mPlan2.position.z = 0.4 * Math.sin(ang2);
    
    mPlan3.position.x = 0.6 * Math.cos(ang3);
    mPlan3.position.z = 0.6 * Math.sin(ang3);
    mPlan3.rotation.y += 0.1;
    
    mPlan4.position.x = 0.8 * Math.sin(-ang4);
    mPlan4.position.z = 0.8 * Math.cos(ang4);
    mPlan4.rotation.y += 0.08;

//    camera.rotation.z += 0.005;
    renderer.render( scene, camera );
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    stopRender = !stopRender;
}
