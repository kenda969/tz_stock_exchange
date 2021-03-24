(function () {
  var filters = document.querySelector('.filters');
  var picturesContainer = document.querySelector('.pictures');

  function errorMessage(error) {
    message.message(error);
  }

  function loadData(photoGallery) {

    if(photoGallery){
      gallery.renderPhotoGallery(photoGallery);
      filters.classList.remove('filters-inactive');
    }
    getCopyphotoGallery(photoGallery);
  }
    // Реализация функции рандом.
  function filterRandom(photoGallery) {
    var copyArray = photoGallery.slice(0);
    var photoRandom = [];
    var photoRand;
    for (var i = 0; i < photoGallery.length; i++) {
      photoRand = Math.floor(Math.random() * copyArray.length);
      photoRandom.push(copyArray[photoRand]);
      copyArray.splice(photoRand, 1);
    }
    return photoRandom;
  }
  // Копия данных с сервера
   function getCopyphotoGallery(photoGallery) {
     var lastTimeout;
     var arr = photoGallery;
     var newPhotoGallery = arr.slice(0);

     var qwe = {
       'recommend': // Фильтр РЕКОМЕНДУЕМЫЕЮ
         function () {
           gallery.renderPhotoGallery(photoGallery);
         },
       'popular': // Фильтр ПОПУЛЯРНЫЕ.
         function () {
           var photoPopular = newPhotoGallery.sort(function (a, b) {
             return a.likes - b.likes;
           });
           photoPopular.reverse();
           gallery.renderPhotoGallery(photoPopular);
         },
       'discussed': // Фильтр ОБСУЖДАЕМЫЕ.
         function () {
           var photoDiscussed = newPhotoGallery.sort(function (a, b) {
             return a.comments.length - b.comments.length;
           });
           photoDiscussed.reverse();
           gallery.renderPhotoGallery(photoDiscussed);
         },
       'random': //Фильтр СЛУЧАЙНЫЕ.
         function () {
           var random = filterRandom(photoGallery);
           gallery.renderPhotoGallery(random);
         }
     };

     function filtersMouseupHahdler(evt) {
       var value = evt.target.control.defaultValue;
       if (lastTimeout) {
         clearTimeout(lastTimeout);
       }
       lastTimeout = setTimeout(function () {
         if (evt.toElement.className === 'filters-item') {
           picturesContainer.innerHTML = '';
         }
         qwe[value]();
       }, data.DEBOUNCE_INTERVAL);
     }

     filters.addEventListener('mouseup', filtersMouseupHahdler);
   }

    backend.load(loadData,errorMessage);
})();
