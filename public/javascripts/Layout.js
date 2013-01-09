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
		, imageSize;

	function init() {
		duration = 0.2;
		camera = new THREE.PerspectiveCamera( 45, window.width / window.height, 0.0002, 80000 );
		renderer = new THREE.CSS3DRenderer();
		scene = new THREE.Scene();
		materials = [];

		camera.position.z = 1000;

//////////////////////TODO: elems が全部取得できない
		elems = $("#pj_elem");
		console.log(elems);

//////////////////////////////////////////

		for ( var i = 0; i < elems.length; i++ ){
			var threeElem
				, cubeFace
				, geom;
			elems[i].style.paddingLeft = '250px';
			threeElem = new THREE.CSS3DObject( elems[i] );

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

		animating = false;
		gridMode = true;

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
		if ( !animating ){
			for ( var i = 0; i < materials.length; i++ ) {
				var object = materials[i];
				if( gridMode ){
					object.position.y -= 2;
					object.rotation.y += 0.01;
				} else {
					object.position.y -= 5;
					object.rotation.y += 0.02;
				}
				
			}

			for ( var i = 0; i < materials.length; i++ ) {
				var object = materials[i];
				if( object.position.y > imageSize * materials.length * 0.5){
					object.position.y = -imageSize * materials.length * 0.5;
				}
				if( object.position.y < -imageSize * materials.length * 0.5){
					object.position.y = imageSize * materials.length * 0.5;
				}
			}
		}

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