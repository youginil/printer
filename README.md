# Printer

Printer for browsers.

### Usage
````
import {Printer} from "dom-printer";

const p = new Printer();
p.append(document.getElementById('first-page'));
p.splitPage();
p.append(document.getElementById('second-page'));
p.print();
````

### Constructor Parameters
Name        | Type                              | Attributes  | Description
------------|-----------------------------------|-------------|-----------------
content     | Element, HTMLCollection, NodeList | <optional\> | Content for print
importCSS   | Boolean                           | <optional\> | Import style of current page or not. The default is true

### Methods
* `print()` Print action
* `append(...elems: Array<Element | HTMLCollection | NodeList>)` Append element(s)
* `splitPage()` Split page
* `clear()` Clear content
* `destroy()` Destroy printer instance
