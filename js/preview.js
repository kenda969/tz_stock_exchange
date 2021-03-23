'use strict';
(function () {
	var gallery = {
		overlay: document.querySelector('.gallery-overlay'),
		overlayClose: document.querySelector('.gallery-overlay-close')
	};
	var overlay = {
		image: gallery.overlay.querySelector('.gallery-overlay-image'),
		likes: gallery.overlay.querySelector('.likes-count'),
		comments: gallery.overlay.querySelector('.comments-count')
	};
	var container = document.querySelector('.container');
	
   gallery.overlay.classList.remove('hidden');
   gallery.overlay.style.display ='none';

   // Выводит Overlay  на страницу
	function renderGaleryOverlay (advert) {
		overlay.image.src = advert.url;
		overlay.image.alt = advert.url;
		overlay.likes.textContent = advert.likes;
		overlay.comments.textContent = advert.comments;
	}
	
	// Формирует данные для Overlay
  function renderOverlay(evt) {
		evt.preventDefault();
		var target = evt.target;
		var overlayData = {
				url: target.src,
				comments: target.parentNode.children['1'].children['0'].innerText,
				likes: target.parentNode.children['1'].children['1'].innerText
		};
		
	if(target.tagName === 'IMG'){
		renderGaleryOverlay(overlayData);
		gallery.overlay.style.display ='block';
		gallery.overlayClose.addEventListener('click', function () {
	    gallery.overlay.style.display ='none';
  });
}
		return;
  }
  
  container.addEventListener('click', renderOverlay);
})();
