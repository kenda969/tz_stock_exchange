(function () {
	// отрисовка фото, лайков, комментариев. через фрагмент.
	var picturesTemplate = document.querySelector('#picture-template').content;
	
	window.renderPictures = function(advert) {
		var picturesElement = picturesTemplate.cloneNode(true);
		picturesElement.querySelector('.picture > img').src = advert.url;
		picturesElement.querySelector('.picture-likes').textContent = advert.likes;
		picturesElement.querySelector('.picture-comments').textContent = advert.comments;
		return picturesElement;
	}

})();
