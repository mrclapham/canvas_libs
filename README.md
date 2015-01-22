Canvas Library shootout
===========

### Canvas/SVG/Charting library comparison
there is a live version at [https://canvas-shootout.herokuapp.com/#/paper](https://canvas-shootout.herokuapp.com/#/paper)

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

Although all libraries appear, on the surface, to be aiming for a similar goal, creating images in a web browser, they all have differing approaches and focuses. It is telling that both Fabric and p5.js have ‘noise’ methods but with totally different purposes – fabric’s noise method is an image filter adding pixel ‘noise’ to a loaded image, as per PhotoShop’s noise filter. P5’s noise method creates random values using Perlin Noise showing it’s more generative art roots. 

Libraries I looked at but decided to not trial, at this point, were two.js and kinetic.js. Kinetic shows some promise and is very popular, however,  at present its website appears to be in need of some maintenance with 404s on the tutorials. Two.js is a promising newcomer but, at present, lacks image and text support.

###Easle JS
[http://www.createjs.com/#!/EasleJS](http://www.createjs.com/#!/EasleJS)

 Main features:
 
* ActionScript like syntax;
* Grouping of elements;
* Masking;
* Caching of graphic elements;
* touch support for mobile devices;
* Event listeners.

For anyone with ActionScript experience Easle should have a fairly shallow learning curve, having borrowed much of its syntax and paradigms from ActionScript. It allows the nested grouping of elements and EventListeners to be added to created elements in a DOM-like fashion. It also retains the ‘display list’ paradignm of ActionScript where elements may be added and removed form the 'Stage' as and when required.

Paths drawing and modification is fairly straightforward using the same moveTo/lineTo syntax found in native Canvas and ActionScript. Both bezier and quadratic curves are supported.

Animations is not handled natively but, fortunately, Easle is part of the Create.js package which includes TweenJs - a tweening library similar to GreenSock’s TweenMax. 

The documentation contains a caveat about the text being expensive to generate, in my test example I generated the text-based tool-tips via HTML but used the DisplayObject localToGlobal method to position them correctly. Easle also has the ability to cache DisplayObjects - be they graphic or text - to speed up rendering and make it a less expesive prospect.

All in all Easle is a hugely versatile canvas library for a range of applications: charting, data-viz, game development, banner ads - basically anything once done with Flash.

As for cons, a certain amount of built-in animation capability would have been nice as would a 2D Vector class. Both of these capabilities may, however, be handled by third party libraries. 

###FabricJS
[http://fabricjs.com/](http://fabricjs.com/)

 Main features:

* Built in drag and drop capabilities;
* Grouping of items;
* Event listeners;
* touch event support;
* Canvas elements teated as DOM elements;
* PhotoShop-like image filters;
* SVG import.

Each of the libraries has its unique USP and Fabrics’s seems to be its built-in drag and drop/draggable-resizing capabilities. Simply by setting a display object’s 'selectable' property to 'true'.

Fabric also has built in animation capabilities with onChange and onComplete Events much like GreenSock's TweenMax. 

If you can get past its eye-wateringly ugly website Fabric has a wealth of features. It treats graphic elements as DOM elements allowing individual elements to be animated or to have EventListeners added for, say, mouse Events.

If each library has its niche Fabric's niche seems to be for creating on-line versions of PhotoShop/Illustrator/Paint type apps. There are off-the-shelf tools in there for creating drawing brushes, image filtering and manipulation. 

On the down side the line/shape drawing API is cumbersome compared to the other libraries looked at and animating path elements created some unwanted image-noise type artifacts around the path’s edges. The documentation could be more comprehensive too.

###PaperJs
[http://paperjs.org/](http://paperjs.org/)

 Main features:
 
* Strong path and geometry features;
* Vector and maths capabilities;
* Event listeners;
* Canvas elements treated as DOM elements;

PaperJs whets you appetite with some very impressive examples on its website, with source code provided. As with many of the libraries it takes a DOM-like approach to created elements allowing them to be manipulated individually and to have EventListeners added. 

The learning curve is slightly steeper for PaperJs - there are, however, a wealth of tutorials on the site and the documentation is excellent. The learning curve is steeper partly due to the wealth of features and partly to do with the quirks involved in scoping, particularly if using PaperJs in JavaScript mode not PaperScript mode (see [http://paperjs.org/tutorials/getting-started/working-with-paper-js/](http://paperjs.org/tutorials/getting-started/working-with-paper-js/)). I pefer a modular, Class based approach and initially found I was drawing to the wrong canvas instance when creating a number of Class instances. Once I surrmounted that hurdle I found it a joy to work with. If it has a USP it is probably paths (hence the proponderance of animated curves in the code examples) with smoothing, simplifying and flattening available out-of-the-box.

The inclusion of vector geometry is a big bonus, particularly for data visualisation and mimiking kinetic physics.

Animation is handled in a fairly rudimentry fashion using what I assume is requestAnimationFrame, running at 60fps by calling its onFrame() method. This could become sluggish if expensive tasks are being performed on each frame. It could, however, be teamed with TweenMax ([http://greensock.com/tweenmax](http://greensock.com/tweenmax)) or Even TweenJs ([http://www.createjs.com/#!/TweenJS](http://www.createjs.com/#!/TweenJS)), sister library to the aforementioned EasleJs, if this becomes an issue.

###p5
[http://p5js.org/](http://p5js.org/)

Main features:

* Strong path and geometry features;
* Vector and maths capabilities;
* Additional libraries to allow webcam access and music synthesis.

P5 is the new kid on the block and currently still in Beta. It is a javaScript interpretation of Processing [https://www.processing.org/](https://www.processing.org/) the popular Java based language for data visualisation and generative art. There has been, for some time, a javaScript version of sorts for Processing. This was, however, more of a parser for converting Java based Processing files to JavaScript and not everything could be successfully converted from Java to JavaScript. Although later iterations of processing.jsallowed using JavaScript natively this appears to have been userped by p5.js.

Just as Easle.js will have a relatively shallow learning curve for ActionScripters p5 will feel very familer to anyone who has used Processing. The principal is you need to write two functions setup() and draw(). As they suggest 'setup' is an initialisation function and draw is called, by default, 60 times a second (processor allowing).

P5 is closest to Paper.js in feel with built-in vector geometry, a host of excellent maths and geometry functions and curve and shape methods which make it extremely flexible for making marks on screen.

In addition it has three add-on libraries p5.dom, p5.sound and p5.gibber which provide access to webcams, video, audio sythesis and music sequencing capabilites.

Unlike the other libraries showcased there is less of a DOM approach and more aof a raw canvas approach to image creation. calling the 'background' method within the 'draw' method floods the canvas with a specified colour and clearing all previously drawn elements in the process. Not calling the 'background' method allows the image to build up - frame by frame. Setting an alpha value on the background (or indeed any drawn element) has the effect of building the image up in translucent layers. It means it's down to you to create your own interactivity and map your on-screen elements. It also, currently, lacks a direct method to create gradient fills (although, you have access to the underlying canvas context). That said it reamins a powerful and versitile library and fun to use, particularly if you wish to create generative art.

###D3
[http://d3js.org/](http://d3js.org/)

Main features:

* SVG rendering;
* A mature set of data visualisation tools;
* Excellent documentation and examples.

D3 is a heavyweight of data visualisation. It is a mature library of tools which allows data points to be bound to DOM elements and to mutate their state if and when the underlying data changes.

By default SVG is used for display. This can be a blessing or a curse. As SVG is resolution independent your creations will look pin sharp on any monitor and can be zoomed with no loss of resolution. The downside is that each data point is a DOM element so when you are rendering thousands of points you can run into performance issues - particularly when animating. And older versions of IE are not supported (but we're used to that).

D3 is not a charting library such as Google Charts or ChartJS – which provide specific, off-the-shelf, bar, line, pie etc charts, with an API to customize the look and feel. D3 is much nore low level - it provides the wearwithall to create your own custom charts, graphs and visualisations. It also provides a comprehensive set of helpers to allow you to, for example, create numerical and time-series axises, scale functions and layout helpers for common graph types like bar, pie, chord and scatterplot. 
A skim through the examples provided on the site will give you a flavour of the what may be achieved using D3. The tutorials provided tend to be fairly rudimentary but there are numerous examples with source code which may be reverse engineered to work out how they were put together.

Tweening is built in for some slinky animations and styling of SVG elements may be achieved through a combination of JavaScript, CSS. You can also create SVG filters for shadow and glow effects - although this can become complex.

###Conclusions
So, which is the best? As ever with JavaScript libraries it comes down to horses for courses. 

I have been a long-time fan of D3 - it is sufficiency low-level to allow it to be used as building-blocks rather than boiler-plate. At the same time it has virtually every tool you could need for creating browser-based charts.

P5 is an interesting newcomer but Paper is a more mature and feature rich alternative, however, the sound and video capabilities of p5 make it an interesting prospect.

Easle if Flash ported to JavasScript (well, a cut-down version anyway) and would be a first choice for building on-line games.

Fabric, whilst not without its uses, fell in a the middle ground between the other libraries. It's drag and drop implementation seemed to be the only thing it excelled at, compared to the other libraries.

Time will tell, but Paper is the library is the library I am keenest to explore in more depth – although I have been toying with p5 for purely recreational ends [http://codepen.io/mrClapham/pen/zxoogq](http://codepen.io/mrClapham/pen/zxoogq).

This is far from an exhaustive test and it's best for you test drive each library for yourself. There are examples in the repo to reverse engineer – my  experience with each library dictated how far I took them. 

###Running the examples


run `npm install`

run `bower install`

Then to set up the watch run `gulp watch-less` to auto compile the code to build.
