/**
 * @public
 */
export declare type Options = {
    content?: Element | HTMLCollection | NodeList;
    importCSS?: Boolean;
    style?: string;
    preview?: Boolean;
};
/**
 * @public
 */
export default class Printer {
    private iframe;
    private head;
    private body;
    private style;
    private readonly importCSS;
    private readonly preview;
    private ready;
    private waitingPrint;
    private contentTransitStation;
    constructor(options: Options);
    _onload(cb: Function): void;
    print(): this;
    append(elem: Element | HTMLCollection | NodeList, clone?: boolean): this;
    split(): this;
    clear(): this;
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map