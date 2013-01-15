/*
Layout.js
*/

var setup3D = function() {
	var elems
		, canvas
		, materials
		, geometory
		, camera
		, renderer
		, duration
		, targets
		, animating
		, gridMode
		, scene
		, scrollSpeed
		,	mouseX;

	function init() {
		duration = 0.2;
		scrollSpeed = 400;
		camera = new THREE.PerspectiveCamera( 45, window.width / window.height, 0.0002, 80000 );
		renderer = new THREE.CSS3DRenderer();
		scene = new THREE.Scene();
		materials = [];

		camera.position.z = 1500;

		elems = $(".pj_elem");

		for ( var i = 0; i < elems.length; i++ ){
			var threeElem;
			threeElem = new THREE.CSS3DObject( elems[i] );
			threeElem.position.x = i * 500 ;
			threeElem.element.style.opacity = 0.2 * i;
			materials.push( threeElem );
			scene.add( threeElem );
		}

		scene.add( camera );

		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top = 0;
		renderer.domElement.style.overflow = 'visible';

		var doc = document.getElementById( "canvas" );
		doc.appendChild( renderer.domElement );

		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function render() {
		renderer.render(scene, camera);
	}

	function animate() {
		$(function(){
			for( var i = 0; i < materials.length; i++ ){
				materials[i].position.x -= scrollSpeed;
				if( materials[i].position.x < -1250 ) materials[i].position.x = 1250;
				materials[i].element.style.opacity = ( 1000 - materials[i].position.x ) * 0.001;
			}

			scrollSpeed *= 0.96;
			if( scrollSpeed < 2 ) scrollSpeed = 2;
		});
		requestAnimationFrame( animate );
		render();
	}

	function agent(){
	    var userAgent = window.navigator.userAgent.toLowerCase();

		if (userAgent.indexOf('opera') != -1) {
		  return 'opera';
		} else if (userAgent.indexOf('msie') != -1) {
		  return 'ie';
		} else if (userAgent.indexOf('chrome') != -1) {
		  return 'chrome';
		} else if (userAgent.indexOf('safari') != -1) {
		  return 'safari';
		} else if (userAgent.indexOf('gecko') != -1) {
		  return 'gecko';
		} else {
		  return false;
		}
	}

	if( 'chrome' == agent() || 'safari' ==  agent() ){
		init();
		animate();
	}

}