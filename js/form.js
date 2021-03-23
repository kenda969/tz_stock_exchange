'use strict';
(function () {

	var upload = {
		overlay: document.querySelector('.upload-overlay'),
		file: document.querySelector('#upload-file'),
		formCancel: document.querySelector('.upload-form-cancel'),
		formPreview: document.querySelector('.upload-form-preview > img')
	};

// отображение редактора фото , после того как фото было загружено.
	function uploadFileChangeHandler () {
		upload.overlay.classList.remove('hidden');
	}
	
//закрытие редактора фото.
	function escKeydownHandler(evt){
		if(evt.keyCode === data.ESC){
      upload.overlay.classList.add('hidden');
		}
	}
	
	function uploadFormCancelClickHandler() {
    upload.overlay.classList.add('hidden');
	}
	
//Редактирование размера фотографии.
	var sizeDefault = 50;
	
	var uploadResize = {
		controls: document.querySelector('.upload-resize-controls'),
    controlsButtonDec: 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-dec',
    controlsButtonInc: 'upload-resize-control upload-resize-controls-button upload-resize-controls-button-inc',
    controlsValue: document.querySelector('.upload-resize-controls-value')
	};
	
	uploadResize.controlsValue.value = sizeDefault + '%';
	upload.formPreview.style.transform = 'scale(' + sizeDefault / 100 +')';
	
	function uploadResizeControlsClickHandler(evt) {
		var className = evt.target.className;
		
		if(className === uploadResize.controlsButtonInc){
			sizeDefault !== 100 ? sizeDefault += 25:sizeDefault = 100;
      uploadResize.controlsValue.value = sizeDefault + '%';
		}else if (className === uploadResize.controlsButtonDec){
			sizeDefault <= 25 ? sizeDefault = 25:sizeDefault -= 25;
      uploadResize.controlsValue.value = sizeDefault + '%';
		}
		upload.formPreview.style.transform = 'scale(' + sizeDefault / 100 +')';
	}
	
// Применение эффекта для избражений
	var uploadEffect = {
		controls: document.querySelector('.upload-effect-controls'),
		level: document.querySelector('.upload-effect-level'),
		levelLine: document.querySelector('.upload-effect-level-line'),
		levelPin: document.querySelector('.upload-effect-level-pin'),
		levelVal: document.querySelector('.upload-effect-level-val')
	};
	
	uploadEffect.levelPin.style.left = '0';
	uploadEffect.levelVal.style.width = '0';

  function uploadEffectControlsClickHandler(evt) {
    var uploadEffectControlsValue = evt.target.value;
    var className = 'effect-' + uploadEffectControlsValue;
    if(uploadEffectControlsValue){
      upload.formPreview.className = className;
      upload.formPreview.style.removeProperty('filter');
      uploadEffect.levelPin.style.left = scrollDefaultPin(className);
      uploadEffect.levelVal.style.width = scrollDefaultPin(className);
    }
    return;
  }


  function scrollDefaultPin(className) {
    var posicionPin;
    switch (className){
      case 'effect-none':
        posicionPin = '0';
        break;
      case 'effect-phobos':
        posicionPin = '50%';
        break;
      default:
        posicionPin = '100%';
        break;
    }
    return posicionPin;
  }

  function effectImageFilter (className) {
    var imageFilter;

    switch (className){
      case 'effect-chrome':
        imageFilter = 'grayscale';
        break;
      case 'effect-sepia':
        imageFilter = 'sepia';
        break;
      case 'effect-marvin':
        imageFilter = 'invert';
        break;
      case 'effect-phobos':
        imageFilter = 'blur';
        break;
      case 'effect-heat':
        imageFilter = 'brightness';
        break;
      case 'effect-none':
        imageFilter = 'none';
        break;
    }
    return imageFilter;
  }
	function effectImageFilterSaturate(effectFilter, numFilter) {
		var saturate;
		var x;
		
		switch (effectFilter){
			case 'grayscale':
				x = numFilter / 100;
				saturate = x.toPrecision(1);
				break;
			case 'sepia':
				x = numFilter / 100;
				saturate = x.toPrecision(1);
				break;
			case 'invert':
				saturate = numFilter + '%';
				break;
			case 'blur':
				saturate = numFilter / 10 + 'px';
				break;
			case 'brightness':
				saturate = numFilter * 3 + '%';
				break;
			case 'none':
				saturate = '';
				break;
		}
		return saturate;
	}
	
	function percentageNum(percentageX,percentageFull) {
		var percentage = (percentageX / percentageFull) * 100;
		return percentage;
	}

//Применение светофильтров
	function beginColorFilters (shift){
		var colorFilter = percentageNum(uploadEffect.levelPin.offsetLeft - shift,uploadEffect.levelLine.offsetWidth - (data.PIN_WIDTH / 2));
		var className = upload.formPreview.className;
		upload.formPreview.style.filter = effectImageFilter(className) +
			'('+ effectImageFilterSaturate(effectImageFilter(className), colorFilter) +')';
	}

// Перетаскивание пина
	function uploadEffectLevelPinMousedovn(evt) {
		evt.preventDefault();
		
		var beginCoords = {
			x: evt.clientX,
			y: evt.clientY
		};
		var dragged = false;
		
		function uploadEffectLevelPinMousemove(moveEvt) {
			moveEvt.preventDefault();
			dragged = true;
			var shift = {
				x: beginCoords.x - moveEvt.clientX,
				y: beginCoords.y - moveEvt.clientY
			};
			
			beginCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};
			
			uploadEffect.levelPin.style.left = uploadEffect.levelPin.offsetLeft - shift.x +'px';
			uploadEffect.levelVal.style.width = uploadEffect.levelPin.offsetLeft - shift.x +'px';
			
			if (uploadEffect.levelPin.offsetLeft - shift.x < data.PIN_WIDTH / 2){
				uploadEffect.levelPin.style.left = data.PIN_WIDTH / 2 +'px';
				uploadEffect.levelVal.style.width = data.PIN_WIDTH / 2 +'px';
			}else if(uploadEffect.levelPin.offsetLeft - shift.x > uploadEffect.levelLine.offsetWidth - (data.PIN_WIDTH / 2)){
				uploadEffect.levelPin.style.left = uploadEffect.levelLine.offsetWidth - (data.PIN_WIDTH / 2) + 'px';
				uploadEffect.levelVal.style.width = uploadEffect.levelLine.offsetWidth - (data.PIN_WIDTH / 2) + 'px';
			}
			
			beginColorFilters(shift.x);
		}
		function uploadEffectLevelPinMouseupHandler(upEvt) {
			upEvt.preventDefault();

			document.removeEventListener('mousemove',uploadEffectLevelPinMousemove);
			document.removeEventListener('mouseup', uploadEffectLevelPinMouseupHandler);
		}
		document.addEventListener('mousemove',uploadEffectLevelPinMousemove);
		document.addEventListener('mouseup', uploadEffectLevelPinMouseupHandler);
	}
	
	
	var uploadFormSubmit = document.querySelector('.upload-form');
	
	//Отправка формы на сервер
	function uploadFofmSubmitHandler(evt) {
		evt.preventDefault();
		
		var data = new FormData(uploadFormSubmit);
		backend.save(data, displaySendingMessage, gallery.errorMessage);
		upload.overlay.classList.add('hidden');
		document.querySelector('.upload-form-hashtags').value = '';
		document.querySelector('.upload-form-description').value = '';
	}
	
	
	// Вывод сообщения
	function displaySendingMessage() {
		message.message('Фото добавленно!!!');
	}
	
	window.form = {
		escKeydownHandler: escKeydownHandler
	};
	
	upload.file.addEventListener('change',uploadFileChangeHandler);
	document.addEventListener('keydown',escKeydownHandler);
	upload.formCancel.addEventListener('click',uploadFormCancelClickHandler);
	uploadResize.controls.addEventListener('click',  uploadResizeControlsClickHandler);
	uploadEffect.controls.addEventListener('click',uploadEffectControlsClickHandler);
	uploadEffect.levelPin.addEventListener('mousedown', uploadEffectLevelPinMousedovn );
	uploadFormSubmit.addEventListener('submit', uploadFofmSubmitHandler);
	
	
	
})();
