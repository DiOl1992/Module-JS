function showModal(modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimer);
    if(modalTimer){
        clearInterval(modalTimer); // якщо користувач вже відкрива модальне вікно, то відмінити його автоматичне відкриття через 10 сек
    }
    
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer){
    

    const btnsModal = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);


    

    btnsModal.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimer));

    });

    


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });


    //щоб модальне вікно зачинялося на клавішу Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    


    //якщо користувач долистав до кінця, то викликати модальне вікно
    function showModalByScroll() {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {showModal};