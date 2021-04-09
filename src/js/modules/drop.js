const drop = () => {
	const fileInputs = document.querySelectorAll('[name="upload"]');

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
		fileInputs.forEach((fileInput) => {
			fileInput.addEventListener(eventName, preventDefaults, false);
		});
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highlight(item) {
		item.closest('.file_upload').style.backgroundColor = '#46ebf6';
	}
	function unhighlight(item) {
		item.closest('.file_upload').style.backgroundColor = 'transparent';
	}

	['dragenter', 'dragover'].forEach((eventName) => {
		fileInputs.forEach((fileInput) => {
			fileInput.addEventListener(eventName, () => highlight(fileInput), false);
		});
	});
	['dragleave', 'drop'].forEach((eventName) => {
		fileInputs.forEach((fileInput) => {
			fileInput.addEventListener(eventName, () => unhighlight(fileInput), false);
		});
	});

	fileInputs.forEach((input) => {
		input.addEventListener('drop', (e) => {
			input.files = e.dataTransfer.files;
			let dots;
			const fileName = input.files[0].name.split('.'),
				fileSize = (+input.files[0].size / 1024).toFixed(2);

			fileName[0].length > 6 ? (dots = '...') : (dots = '.');
			const name = fileName[0].substring(0, 6) + dots + fileName[1];
			input.previousElementSibling.textContent = `${name} (${fileSize} kb)`;
		});
	});
};

export default drop;
