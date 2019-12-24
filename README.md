# Printer
![npm](https://img.shields.io/npm/v/dom-printer)
![browser](https://img.shields.io/badge/Browsers-Chrome%2C%20IE9--11%2C%20Edge%2C%20Safari%2C%20Firefox-green)

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
style       | String                            | <optional\> | Custom style. The default is ''
preview     | Boolean                           | <optional\> | Preview instead of print. The default is false

### Methods
* `print()` Print action
* `append(elem: Element | HTMLCollection | NodeList, clone: boolean = true)` Append element
* `splitPage()` Split page
* `clear()` Clear content
* `destroy()` Destroy printer instance
