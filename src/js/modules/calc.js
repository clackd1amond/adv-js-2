const calc = (size, material, options, promocode, result, state) => {
	const sizeBlock = document.querySelector(size),
		materialBlock = document.querySelector(material),
		optionsBlock = document.querySelector(options),
		promocodeBlock = document.querySelector(promocode),
		resultBlock = document.querySelector(result);

	let sum = 0;

	const calcFunc = () => {
		sum = Math.round(+sizeBlock.value * +materialBlock.value + +optionsBlock.value);
		if (sizeBlock.value == '' || materialBlock.value == '') {
			resultBlock.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
		} else if (promocodeBlock.value === 'IWANTPOPART') {
			resultBlock.textContent = Math.round(sum * 0.7) + 'р.';
			state.price = Math.round(sum * 0.7);
		} else {
			resultBlock.textContent = sum + 'р.';
			state.price = sum;
		}
	};

	sizeBlock.addEventListener('change', calcFunc);
	materialBlock.addEventListener('change', calcFunc);
	optionsBlock.addEventListener('change', calcFunc);
	promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;
