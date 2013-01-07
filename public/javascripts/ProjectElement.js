/*
ProjectElement.js
*/

var ProjectElement = function( _data ) {
	var title
	, imgUrl
	, description
	, url
	, reqUrl
	, tags
	, domElement
	, contens;

	contens = _data._contents;
	this.title = _data.title;
	this.description = _data._project;
	this.url = ( contens[0].extend !== undefined ) ? contens[0].extend.url : "../";
	this.imgUrl = "contents/" + contens[0]._id + "/image";
	this.tags = _data.tags;

	this.domElement = this.createDom();
}

ProjectElement.prototype.createDom = function() {
	var div
	, img
	, dom;
  div = document.createElement( "div" );
  img = document.createElement( "img" );
  dom = document.createElement( "a" );
  img.src = this.imgUrl;
  dom.href = this.url;
  dom.target = "top"
  div.innerText = this.title;
  div.appendChild( img );
  dom.appendChild( div );
  return dom;
};

ProjectElement.prototype.dump = function() {
	console.log( this );
};
