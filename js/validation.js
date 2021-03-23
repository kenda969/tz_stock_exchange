(function () {
	var uploadForm = {
		hashtags: document.querySelector('.upload-form-hashtags'),
		description: document.querySelector('.upload-form-description'),
		button: document.querySelector('.upload-form-submit')
	};
	uploadForm.button.style.cursor = 'pointer';

// Проверка длинны массива. Не более 5 хэштэгов.
	function checkLengthArray(arr) {
		if(arr.length > 5){
			uploadForm.hashtags.style.borderColor = 'red';
		  message.message('Должно быть не больше 5 хэштегов!!!');
		} else {
			uploadForm.hashtags.style.borderColor = '';
		}
	}

// Проверка длинны  элементов массива. Не более 20 символов.
//  И наличие символа #.
	function checkLengthArrayElement(arr) {
		 if(arr !== "") {
			for (i = 0; i < arr.length; i++) {
				var a = arr[i].split('');
				var mess = '\r\n' + arr[i];
				if (a[0] !== '#') {
					uploadForm.hashtags.style.borderColor = 'red';
					message.message('Отсутствует символ # в теге' + mess + ' !!!');
				} else if (arr[i].length > 20) {
					uploadForm.hashtags.style.borderColor = 'red';
					message.message('Этот хэш тег  ' + mess + ' слишком длинный !!!');
				}
				else {
					uploadForm.hashtags.style.borderColor = '';
				}
			}
		}
	}

// Проверка элементов массива на идентичные записи не регистрозависимые..
	function checkMatchingArrayElement(arr) {
		var hashtagsCoincidence = [];
		arr.forEach(function(val, index){
			var hashtags = val.toLowerCase();
			if(index !== arr.lastIndexOf(hashtags) && hashtagsCoincidence.indexOf(hashtags) === -1){
				hashtagsCoincidence.push(hashtags);
		}else if(hashtagsCoincidence.length !== 0){
				message.message('Имеются одинаковые хэштеги!!!');
		}
		});
	}

// Обработка Хэштэгов на валидность в поле хэштэг
	function uploadFormHashtagsChangeHandler() {
		var uploadFormHashtagsValue = this.value.split(' ');
		checkLengthArray(uploadFormHashtagsValue);
		checkLengthArrayElement(uploadFormHashtagsValue);
		checkMatchingArrayElement(uploadFormHashtagsValue);
	}

	
// Обработка коментария на валидность.
	function uploadFormDescriptionChangeHandler (){
		var uploadFormDescriptionValue = this.value;
		if (uploadFormDescriptionValue.length > 140){
			message.message('Ваш комментарий слишком большой!!!');
			uploadForm.description.style.borderColor = 'red';
			
		}else {
			uploadForm.description.style.borderColor = '';
		}
	}
	
	uploadForm.hashtags.addEventListener('change', uploadFormHashtagsChangeHandler);
	uploadForm.description.addEventListener('change',uploadFormDescriptionChangeHandler);
	
	window.validation = {
		hashtags:  uploadFormHashtagsChangeHandler,
		description:  uploadFormDescriptionChangeHandler,
		buttonSubmit: uploadForm.button
	};
	
	// Отмена события по нажатию на кнопку ESC при фокусе в поле комментарий.
	uploadForm.description.addEventListener('focus', function () {
		document.removeEventListener('keydown',form.escKeydownHandler);
	});

// Возврат события по нажатию на кнопку ESC при потере фокуса поля комментария.
	uploadForm.description.addEventListener('blur', function () {
		document.addEventListener('keydown',form.escKeydownHandler);
	});
})();
