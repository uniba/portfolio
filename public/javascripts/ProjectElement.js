/*
ProjectElement.js
*/

var ProjectElement = function( _data ) {
	var title
	, imgUrl
	, description
	, url
	, reqUrl
	, domElement
	, contens;

	contens = _data._contents;
	this.title = _data.title;
	this.description = _data._project;
	//this.url = _data._contents.extend.url;
	this.imgUrl = "./contents/" + contens[0]._id + "/image";
	this.domElement = this.createDomElement();
}

ProjectElement.prototype.createDomElement = function() {
	var dom
	, img;
  dom = document.createElement( "div" );
  img = document.createElement( "img" );
  dom.appendChild( img );
  img.src = this.imgUrl;
  dom.innerText = this.title;
  return dom;
};

ProjectElement.prototype.dump = function() {
	console.log( this );
};
