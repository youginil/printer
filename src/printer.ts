import {isFirefox, isIE} from "./host";

const NEW_PAGE_CLASS = 'prt-new-page';
const NO_PRINT_CLASS = 'prt-no-print';

type Options = {
    content?: Element | HTMLCollection | NodeList
    importCSS?: Boolean
}

export class Printer {
    private iframe: HTMLIFrameElement | null;
    private head: HTMLHeadElement | null = null;
    private body: HTMLElement | null = null;

    private readonly importCSS: boolean = true;

    private ready: boolean = false;
    private waitingPrint: boolean = false;

    private contentTransitStation: Array<Element | HTMLCollection | NodeList> = [];

    constructor(options: Options) {
        options = options || {};
        this.iframe = document.createElement('iframe');
        this.iframe.style.width = '0';
        this.iframe.style.height = '0';
        this.iframe.style.position = 'fixed';
        this.iframe.style.left = '-1000px';
        this.iframe.style.top = '-1000px';
        document.body.appendChild(this.iframe);

        if ('importCSS' in options) {
            this.importCSS = !!options.importCSS;
        }

        const printAfterLoadIfWaiting = () => {
            if (!this.waitingPrint) {
                return;
            }
            this.contentTransitStation.forEach((item) => {
                this.append(item);
            });
            this.print();
        };
        if (isIE()) {
            (this.iframe.contentWindow as Window).onload = () => {
                this._onload(printAfterLoadIfWaiting);
            };
        } else if (isFirefox()) {
            setTimeout(() => {
                this._onload(printAfterLoadIfWaiting);
            }, 0);
        } else {
            this._onload(printAfterLoadIfWaiting);
        }
        if (options.content) {
            this.append(options.content);
        }
    }

    _onload(cb: Function) {
        const doc = ((this.iframe as HTMLIFrameElement).contentWindow as Window).document;
        this.head = doc.head;
        this.body = doc.body;

        const printerStyle = document.createElement('style');
        printerStyle.innerText = `@media print {.${NO_PRINT_CLASS} {display: none;}.${NEW_PAGE_CLASS} {page-break-before: always;}}`;
        this.head.appendChild(printerStyle);

        if (!this.importCSS) {
            this.ready = true;
            cb();
            return;
        }

        const linkElements = document.querySelectorAll('link[type="text/css"]');
        let linkCount = linkElements.length;
        for (let i = 0; i < linkElements.length; i++) {
            const link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = (linkElements[i] as HTMLLinkElement).href;
            this.head.appendChild(link);
            link.onerror = link.onload = () => {
                linkCount--;
                if (linkCount > 0) {
                    return;
                }
                this.ready = true;
                cb();
            };
        }
        // TODO link style 顺序
        const styleElements = document.getElementsByTagName('style');
        for (let i = 0; i < styleElements.length; i++) {
            const style = document.createElement('style');
            style.innerText = styleElements[i].innerText.replace(/\r|\n|\r\n/g, '');
            this.head.appendChild(style);
        }

        if (linkCount === 0) {
            this.ready = true;
            cb();
        }
    }

    print() {
        if (!this.ready) {
            this.waitingPrint = true;
            return this;
        }
        if (isIE()) {
            ((this.iframe as HTMLIFrameElement).contentWindow as Window).document.execCommand('print', false);
        } else {
            ((this.iframe as HTMLIFrameElement).contentWindow as Window).print();
        }
        this.waitingPrint = false;
        return this;
    }

    append(...elems: Array<Element | HTMLCollection | NodeList>) {
        if (!this.ready) {
            this.contentTransitStation.push(...elems);
            return this;
        }
        let elem;
        for (let i = 0; i < elems.length; i++) {
            elem = elems[i];
            if (elem instanceof Element) {
                (this.body as HTMLBodyElement).appendChild(elem.cloneNode(true));
            } else if (elem instanceof HTMLCollection || elem instanceof NodeList) {
                for (let j = 0; j < elem.length; j++) {
                    (this.body as HTMLBodyElement).appendChild(elem[j].cloneNode(true));
                }
            }
        }
        return this;
    }

    splitPage() {
        const div = document.createElement('div');
        div.className = NEW_PAGE_CLASS;
        if (!this.ready) {
            this.contentTransitStation.push(div);
            return this;
        }
        (this.body as HTMLBodyElement).appendChild(div);
        return this;
    }

    clear() {
        if (!this.ready) {
            return this;
        }
        (this.body as HTMLBodyElement).innerHTML = '';
        return this;
    }

    destroy() {
        (this.iframe as HTMLIFrameElement).remove();
        this.iframe = null;
        this.head = null;
        this.body = null;
    }
}
