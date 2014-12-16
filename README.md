Canvas Library shootout
===========

### Canvas/SVG/Charting library comparison

A comparison of the main HTML5 Canvas Libraries with examples.

My aim was to build a simple chart - incorporating type and with an animated state change when data is updated - utilising a number of the leading canvas libraries.


### Comparison of JavaScript Canvas and SVG libraries

One of the most exciting aspects of HTML5 is the **canvas** element allowing the free creation of on-screen imagery and pixel wrangling previously reserved for the likes of Flash. Wide browser adoption of the Serial Vector Graphics(SVG)  format has further opened the options for creating rich graphic experiences in-browser.

Whilst the canvas api is powerful tool it remains quite low-level meaning developers have a fair amount of work on their hands if they wish to create their own interfaces. The canvas element is a single element, not comprised of individual DOM elements, therefore, workarounds are required if user interaction is to be captured on a canvas element (eg: mouse clicks and rollovers on individual graphic elements drawn on the canvas).

SVG does create individual DOM elements. These may be styled via css, to a certain extent. Some styling may, however, require writing SVG shaders in a nested XML format, which can be tricky. 

Fortunately, there are a growing number of JavaScript libraries there to sugar the pill.

The ones I am comparing here are: 

* Easle.js
* Fabric.js
* p5.js
* Paper.js
* D3.js

Although not an exhaustive comparison this is an attempt to test drive a number of differing libraries, with somewhat contrasting approaches, strengths and weaknesses. As to which is the ‘best’, well, it very much depend on what you are trying to achieve. Are your priorities simply drawing or are animation, interactivity and physics simulations a priority? Or is ease of use a greater priority than flexibility – all packages having their own learning curves, but none are too steep.

Although all libraries appear, on the surface, to be aiming for a similar goal, creating images in a web browser, they all have differing approaches and focuses. It is telling that both Fabric and p5.js have ‘noise’ methods but with totally different purposes – fabric’s noise method is an image filter adding pixel ‘noise’ to a loaded image, as per Photoshop’s noise filter. P5’s noise method creates random values using Perlin Noise showing it’s more generative art roots. 

Libraries I looked at but decided to not trial, at this point, were two.js and kinetic.js. Kinetic shows some promise and is very poular, however,  at present its website appears to be in need of some maintenance with 404s on the tutorials. Two.js is a promising newcomer but, at present, lacks image and text support.

###Easle JS
 Main features:
 
* ActionScript like syntax;
* Grouping of elements;
* Masking
* Caching of graphic elements
* Event listeners

For anyone with ActionScript experience Easle should have a fairly shallow learning curve, having borrowed much of its syntax and paradigms from ActionScript. It allows the nested grouping of elements and EventListeners to be added to created elements in a DOM-like fashion.
Paths drawing and modification is fairly straighforward using the same moveTo/lineTo syntax found in native Canvas and ActionScript. 
Animations is not hanldled natively but fortunatly Easle is part of the Create.js package



FabricJS
Cons: the line/shape drawing API is cumbersome

### Running the examples

Browserify is an optional extra - the individual examples will all run in isolation.

run `npm install -g browserify`

run `npm install`

run `bower install`

Then to set up the watch run `gulp watch` to auto compile the code to build.
