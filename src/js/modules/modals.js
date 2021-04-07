const modals = () => {
	function bindModal(
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

		function closeModal() {
			windows.forEach((modal) => {
				modal.style.display = 'none';
			});
			document.body.style.overflow = '';
			document.body.style.marginRight = '0px';
			document.body.classList.remove('modal-open');
		}

		trigger.forEach((item) => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}
				closeModal();
				openModal(modal);
			});
		});

		close.addEventListener('click', () => closeModal());

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				closeModal();
			}
		});

		document.addEventListener('keydown', (e) => {
			if (
				e.code === 'Escape' &&
				closeClickOverlay &&
				document.body.classList.contains('modal-open')
			) {
				closeModal();
			}
		});
	}

	function openModal(modal) {
		const scroll = calcScroll();
		modal.style.display = 'block';
		document.body.style.overflow = 'hidden';
		document.body.style.marginRight = `${scroll}px`;
		document.body.classList.add('modal-open');
	}
	function showModalByTime(selector, time) {
		setTimeout(() => {
			if (!document.body.classList.contains('modal-open')) {
				openModal(document.querySelector(selector));
			}
		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal(
		'.button-consultation',
		'.popup-consultation',
		'.popup-consultation .popup-close'
	);

	showModalByTime('.popup-consultation', 60000);
};

export default modals;
