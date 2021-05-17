import {getResorce} from '../services/services';

function carts(){
    //Стовення елементыв за допомогою конструктора классів

    class MenuItem {
        constructor(bgImage, alt, title, text, prise, parentSelector, ...classes) {
            this.bgImage = bgImage;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.prise = prise;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // курс доллара
            this.changeToUAH();
        }

        changeToUAH() {
            this.prise = this.prise * this.transfer;
        }


        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.bgImage} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.prise}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    

    getResorce('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}


export default carts;