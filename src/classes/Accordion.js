export default class Accordion {

    constructor(params) {
        let { elem, titleClass, contentClass, content, selector } = params;
        this._elem = elem;
        this._titleClass = titleClass;
        this._contentClass = contentClass;
        this._content = content;
        let accordion = this._render();
        document.querySelector(selector).append(accordion);
    }

    _render() {
        let accordion = document.createElement('div');
        accordion.id = this._elem;
        accordion.classList.add('accordion');
        for (let i = 0; i < this._content.titles.length; i++) {
            let panel = document.createElement('div');
            panel.classList.add('accordion__panel');
            accordion.append(panel);

            let button = document.createElement('button');
            button.classList.add(this._titleClass);
            button.innerHTML = this._content.titles[i];
            panel.append(button);

            let content = document.createElement('div');
            content.classList.add(this._contentClass);
            content.classList.add('hidden');
            content.innerHTML = this._content.contents[i];
            panel.append(content);

            button.addEventListener('click', () => {
                let contents = document.querySelectorAll(`#${ this._elem } .${ this._contentClass }`);
                contents.forEach((text) => {
                    if (text === content) {
                        if (text.classList.contains('hidden')) {
                            text.classList.remove('hidden');
                            return 0;
                        }
                    }
                    text.classList.add('hidden');
                });
            });
        }
        return accordion;
    }

}