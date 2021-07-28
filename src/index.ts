import {isFirefox, isIE} from "./host";

const NEW_PAGE_CLASS = 'prt-new-page';
const NO_PRINT_CLASS = 'prt-no-print';

/**
 * @public
 */
export type Options = {
    content?: Element | HTMLCollection | NodeList
    importCSS?: Boolean
    style?: string
    preview?: Boolean
}

/**
 * @public
 */
export default class Printer {
    private iframe: HTMLIFrameElement | null;
    private head: HTMLHeadElement | null = null;
    private body: HTMLElement | null = null;

    private style: string = '';
    private readonly importCSS: boolean = true;
    private readonly preview: boolean = false;

    private ready: boolean = false;
    private waitingPrint: boolean = false;

    private contentTransitStation: Array<{
        elem: Element | HTMLCollection | NodeList,
        clone: boolean
    }> = [];

    constructor(options: Options) {
        options = options || {};
        this.style = options.style || '';
        this.iframe = document.createElement('iframe');
        this.iframe.style.position = 'fixed';
        this.iframe.style.width = '0';
        this.iframe.style.height = '0';
        this.iframe.style.left = '-1000px';
        this.iframe.style.top = '-1000px';
        document.body.appendChild(this.iframe);

        if ('importCSS' in options) {
            this.importCSS = !!options.importCSS;
        }

        if ('preview' in options) {
            this.preview = !!options.preview;
        }

        const printAfterLoadIfWaiting = () => {
            if (!this.waitingPrint) {
                return;
            }
            this.contentTransitStation.forEach((item) => {
                this.append(item.elem, item.clone);
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
        printerStyle.innerText = `@media print {.${NO_PRINT_CLASS} {display: none;}.${NEW_PAGE_CLASS} {page-break-before: always;}}${this.style}`;
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
        if (this.preview) {
            (this.iframe as HTMLIFrameElement).style.width = '100%';
            (this.iframe as HTMLIFrameElement).style.height = '100%';
            (this.iframe as HTMLIFrameElement).style.background = 'white';
            (this.iframe as HTMLIFrameElement).style.left = '0';
            (this.iframe as HTMLIFrameElement).style.top = '0';
            (this.iframe as HTMLIFrameElement).style.zIndex = '99999';
        } else {
            if (isIE()) {
                ((this.iframe as HTMLIFrameElement).contentWindow as Window).document.execCommand('print', false);
            } else {
                ((this.iframe as HTMLIFrameElement).contentWindow as Window).print();
            }
        }
        this.waitingPrint = false;
        return this;
    }

    append(elem: Element | HTMLCollection | NodeList, clone: boolean = true) {
        if (!this.ready) {
            this.contentTransitStation.push({
                elem: elem,
                clone: clone
            });
            return this;
        }
        if (elem instanceof Element) {
            (this.body as HTMLBodyElement).appendChild(clone ? elem.cloneNode(true) : elem);
        } else if (elem instanceof HTMLCollection || elem instanceof NodeList) {
            for (let j = 0; j < elem.length; j++) {
                (this.body as HTMLBodyElement).appendChild(clone ? elem[j].cloneNode(true) : elem[j]);
            }
        }
        return this;
    }

    split() {
        const div = document.createElement('div');
        div.className = NEW_PAGE_CLASS;
        if (!this.ready) {
            this.contentTransitStation.push({
                elem: div,
                clone: false
            });
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
