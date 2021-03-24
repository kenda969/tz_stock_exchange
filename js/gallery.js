'use strict';
(function () {
	var pictures = document.querySelector('.pictures ');
	var fragment = document.createDocumentFragment();

	function renderPhotoGallery(photoGallery) {
    photoGallery.forEach(function (arr) {
			fragment.appendChild(window.renderPictures(arr));
		});
    pictures.appendChild(fragment);
  }
		window.gallery = {renderPhotoGallery: renderPhotoGallery}
})();
