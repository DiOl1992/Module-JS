import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimer){
    // axios.get('http://localhost:3000/menu')
    //   .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //   });

    //Скрипт отправки данних на сервер XMLHttpRequest

    // const forms = document.querySelectorAll('form');

    // const message = {
    //     loading: 'img/spinner.svg',
    //     sucsess: 'Спасибо! Мы с Вами свяжемся!',
    //     fail: 'Что-то пошло не так...'
    // };

    // forms.forEach(item => {
    //     postData(item);
    // });

    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('img');
    //         statusMessage.src = message.loading;
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;

    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');

    //         request.setRequestHeader('Content-type', 'application/json');

    //         const formData = new FormData(form);

    //         const object = {};
    //         formData.forEach(function (value, key) {
    //             object[key] = value;
    //         });

    //         const json = JSON.stringify(object);

    //         request.send(json);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 showThanksModal(message.sucsess);
    //                 form.reset();
    //                 statusMessage.remove();

    //             } else {
    //                 showThanksModal(message.fail);
    //             }
    //         });
    //     });
    // }

    // function showThanksModal(message) {
    //     const prevModalDialog = document.querySelector('.modal__dialog');

    //     prevModalDialog.classList.add('hide');
    //     prevModalDialog.classList.remove('show');
    //     showModal();

    //     const thanksModal = document.createElement('div');
    //     thanksModal.classList.add('modal__dialog');
    //     thanksModal.innerHTML = `
    //     <div class="modal__content">
    //         <div data-close class="modal__close">×</div>
    //         <div class="modal__title">${message}</div>
    //     </div>
    //     `;

    //     document.querySelector('.modal').append(thanksModal);
    //     setTimeout(() => {
    //         thanksModal.remove();
    //         prevModalDialog.classList.add('show');
    //         prevModalDialog.classList.remove('hide');
    //         closeModal();
    //     }, 4000);
    // }

    // отправка форм использование FetchAPI

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        sucsess: 'Спасибо! Мы с Вами свяжемся!',
        fail: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.sucsess);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.fail);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        showModal('.modal', modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;