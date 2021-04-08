const checkTextInputs = (selector) => {
	const textInputs = document.querySelectorAll(selector);
	textInputs.forEach((input) => {
		input.addEventListener('keypress', (e) => {
			if (e.key.match(/[^а-яё 0-9]/gi)) {
				e.preventDefault();
			}
		});
		input.addEventListener('input', () => {
			if (input.value.match(/[^а-яё 0-9]/gi)) {
				input.value = '';
			}
		});
	});
};

export default checkTextInputs;
