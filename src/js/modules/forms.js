import { postData } from '../services/requests';

const forms = () => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]');

	// checkNumInputs('input[name="user_phone"]');

	const messages = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png',
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php',
	};

	const clearInputs = () => {
		inputs.forEach((input) => (input.value = ''));
		upload.forEach((item) => (item.previousElementSibling.textContent = 'Файл не выбран'));
	};

	upload.forEach((item) => {
		item.addEventListener('input', () => {
			console.log(item.files[0]);
			let dots;
			const fileName = item.files[0].name.split('.'),
				fileSize = (+item.files[0].size / 1024).toFixed(2);

			fileName[0].length > 6 ? (dots = '...') : (dots = '.');
			const name = fileName[0].substring(0, 6) + dots + fileName[1];
			item.previousElementSibling.textContent = `${name} (${fileSize} kb)`;
		});
	});

	form.forEach((item) => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', messages.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = messages.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(item);
			let api;
			item.closest('.popup-design') || item.classList.contains('calc-form')
				? (api = path.designer)
				: (api = path.question);
			console.log(api);

			postData(api, formData)
				.then((res) => {
					console.log(res);
					statusImg.setAttribute('src', messages.ok);
					textMessage.textContent = messages.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', messages.fail);
					textMessage.textContent = messages.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						item.style.display = 'block';
						item.classList.remove('fadeOutUp');
						item.classList.add('fadeInUp');
					}, 5000);
				});
		});
	});
};

export default forms;
