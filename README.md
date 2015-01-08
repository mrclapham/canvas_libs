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
* Masking;
* Caching of graphic elements;
* touch support for mobile devices;
* Event listeners.

For anyone with ActionScript experience Easle should have a fairly shallow learning curve, having borrowed much of its syntax and paradigms from ActionScript. It allows the nested grouping of elements and EventListeners to be added to created elements in a DOM-like fashion. It also retains the ‘display list’ paradignm of ActionScript where elements may be added and removed form the 'Stage' as and when required.

Paths drawing and modification is fairly straighforward using the same moveTo/lineTo syntax found in native Canvas and ActionScript. Both bezier and quadratic curves are supported.

Animations is not hanldled natively but, fortunatly, Easle is part of the Create.js package which includeds TweenJs - a tweening library similar to GreenSock’s TweenMax. 

The documentation contains a caveat about the text being expesive to generate, in my test example I generated the text-based tool-tips via HTML but used the DisplayObject localToGlobal method to position them correctly. Easle also has the ability to cache DisplayObjects - be they graphic or text - to speed up rendering and make it a less expesive prospect.

All in all Easle is a hugely versitile canvas library for a range of applications: charting, data-viz, game development, banner ads - basically anything once done with Flash.

As for cons, a cetain amount of built-in animation capability would have been nice as would a 2D Vector class. Both of these capabilities may, however, be handled by third party libraries. 

###FabricJS

* Built in drag and drop capabilities;
* Grouping of items;
* Event listeners;
* PhotoShop-like image filters;
* SVG import.

Each of the libraries has its unique USP and Fabrics’s seems to be its built-in drag and drop/draggable-resizing capabilites. Simply by setting a display object’s 'selectable' property to 'true'.

Fabric also has built in animation capabilities with onChange and onComplete Events much like GreenSock's TweenMax. 

If you can get past its eye-wateringly ugly website Fabric has a wealth of features. It treats graphic elements as DOM elements allowing individulal elements to be animated or to have EventListeners added for, say, mouse Events.

If each library has its niche Fabric's niche seems to be for creating on-line versions of PhotoShop/Illustrator/Paint type apps. There are off-the-shelf tools in there for creating drawing brushes, image filtering and manipulation. 

On the down side the line/shape drawing API is cumbersome compared to the other libraries looked at and animating path elements created some unwanted image-noise type artifacts around the path’s edges. The documentation could be more comprehensive too.

###PaperJs
PaperJs whets you appetite with some very impressive examples on its website, with source code provided. As with many of the libraries it takes a DOM-like approch to created elements allowing them to be manipulated individually and to have EventListeners added. 

The learning curve is slightly steeper for PaperJs - there are, however, a wealth of tutorials on the site and the documentation is excellent. The learning curve is steeper partly due to the wealth of features and partly to do with the quirks involved in scoping, particularly if using PaperJs in JavaScript mode not PaperScript mode (see [http://paperjs.org/tutorials/getting-started/working-with-paper-js/](http://paperjs.org/tutorials/getting-started/working-with-paper-js/)). I pefer a modular, Class based approach and initially found I was drawing to the wrong canvas instance when creating a number of Class instances. Once I surrmounted that hurdle I found it a joy to work with. If it has a USP it is probably paths (hence the proponderance of animated curves in the code examples) with smoothing, simplifying and flattening available out-of-the-box.

The inclusion of vector geometry is a big bonus, particularly for data visualisation and mimiking kinetic physics.

Animation is handled in a fairly rudimentry fashion using what I assume is requestAnimationFrame running at 60fps by calling its onFrame() method. This could become sluggish if expensive tasks are being performed on each frame. It could, however, be teamed with TweenMax ([http://greensock.com/tweenmax](http://greensock.com/tweenmax)) or Even TweenJs ([http://www.createjs.com/#!/TweenJS](http://www.createjs.com/#!/TweenJS)), sister library to the aforementioned EasleJs, if this becomes an issue.


### Running the examples

Browserify is an optional extra - the individual examples will all run in isolation.

run `npm install -g browserify`

run `npm install`

run `bower install`

Then to set up the watch run `gulp watch` to auto compile the code to build.
