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
	this.description = _data.description;
	this.url = ( contens[0].extend !== undefined ) ? contens[0].extend.url : "../";
	this.imgUrl = "contents/" + contens[0]._id + "/image";
	this.tags = _data.tags;

	this.domElement = this.createDom();
}

ProjectElement.prototype.createDom = function() {
	var title
		, img
		, descriptionText
		, aTag
		, dom;
		
	dom = document.createElement( "div" );
	dom.id = "pj_elem";
	aTag = document.createElement( "a" )
  title = document.createElement( "h1" );
  descriptionText = document.createElement( "p" );
  img = document.createElement( "img" );
  img.src = this.imgUrl;
  aTag.href = this.url;
  aTag.target = "top"
  title.innerText = this.title;
  aTag.appendChild( img );
  descriptionText.innerText = this.description;
  aTag.appendChild( title );
  aTag.appendChild( descriptionText );
  dom.appendChild( aTag );
  return dom;
};

ProjectElement.prototype.dump = function() {
	console.log( this );
};
