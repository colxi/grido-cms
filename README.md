# Grido-CMS : Responsive Flat-File CMS 

Grido-CMS is a minimal **flat-file content management system** for portfolios, and other tiled listings, implemented using just Javascript , HTML and CSS. 

The scope and purpose of Grido-CMS are very specific : it aims to provide a modern, lightweight, dependency free and crossdevice system for managing contents, but specialy an intuitive and agile enviroment for both, developers and users.

Can be used as a boilerplate to build on top more complex system, or be used as it is out-of-the-box, performing just a few style customizations, through the simple theming system supported by the engine.


## Features :
- Intuitive UI (Modern and minimal) 
- No dependencies (Tiny & light)
- No database (100% file based)
- Responsive (Desktop+devices)
- Crossbrowser (Chrome, Firefox, Edge, Safari ...)
- Highly customizable (CSS+HTML)


## Interface ( UI ) 

The minimal UI provides a **scrollable listing**, based in a **grid** of responsive **cards**. If any of the list members is clicked, an **extended view** of the item pops in the screen.
A simple fixed **sidebar**, allows some extra contents to be placed (logo, links, menu...), and a floating **Filtering button** lets the user delimit the contents of the card listing, by **category**.

> Check the online demostration [here](https://colxi.info/grido-cms).


# Content management

Because Grido-CMS is a flat-file system, no database is required at all. **All the contents are stored in regular files**. 

> In order for the engine, to be able to locate your contents, you need to respect some directory structures, and file naming. 

The base path for placing the contents is the `/content/` directory. In the following directory structure representation you can see a hypotetical example of its contents :

```
/content/
..... categories.json.js 
..... projects.json.js 
..... projects/ 
.......... my-project/
............... thumbnail.jpg
............... index.htm
.......... another-project/
............... thumbnail.jpg
............... index.htm
............... some-image.jpg

```

Lets take a closer look to each file and directory, to understand their function and roles :

> /content/categories.json.js 

This mandatory file contains all the available categories structured inside an Array. This categories will be used by the filtering engine in the projects listing grid :
```javascript
[
    'dev',
    'art',
    'pic',
    'txt'
]
```

> /content/projects.json.js

This other mandatory file contains the collection of projects you want to be listed. Each project will be represented by a Card in the listing. Are declared using Objects, with some specific properties. A **title**, an **URI** (path to the project files), and the project **categories**, must be provided for each single entry : 
```javascript
[
    {
        title       : 'My Project',
        URI         : 'my-project/',
        categories  : ['art', 'pic']
    },
    {
        title       : 'Another Project',
        URI         : 'another-project/',
        categories  : ['dev']
    }
}
```

> /content/projects/

This directory behaves as your **projects collection container** . Must contains a nested directory for each project, and its name must match with the URIs declared in `projects.json.js`. Inside each project directory should be placed all its related material, but is expected for each project to have an **index.htm** file and a **thumbnail.jpg** file. 

> /content/projects/my-project/thumbnail.jpg

A mandatory image of 300pxx300px (recomended). Is used in the cards, in the projects listing.

> /content/projects/my-project/index.htm

This file contains the extended contents of the project. The HTML code contained in this file will be printed in the floating panel that appears when a card is clicked. 

Extra files can be created  or placed here if required.


# Customizing the UI ( Themes )

You will find another special element inside the `/content/` directory, that has not been mentioned in the previous section :  The `/content/theme/` directory.

> Any of the files inside `/content/theme/` directory can be edited and modified according to your needs. It will allow you addapt the look and feel of the interface. New files can be added, in order to expand the native features.


The CMS comes nativelly with a really simple theme. Its files will provide you the necessary boilerplate for custom changes. Is enought self explanatory and clear by itself, it doesn't require special attention here. 


# Native components and widgets

A few out-of-the-box components are provided, to garantee you can  achieve a basic attractive layout without major efforts :

- Basic general CSS styling
- Columned contents (CSS class based)
- Text Highligting (CSS class based)
- Slideshow player (powered by : [Simple-slider](https://github.com/colxi/simple-slider))

In the following example a simple structure that exposes all them is shown. Just taking a quick look, you can guess what is what and how to use it :

```html
<h1 id="projectTitle">My Project title</h1>
<div id="projectColumns">
    <div id="projectFirstColumn">
        This is my project description column<br>
        </p>
        <span class="accent">A list</span><br>
        - A list element<br>
        - Another list element<br>
        - And one more list element<br>
    </div>
    <div id="projectSecondColumn" class="simple-slider" >
        <img src="./content/projects/my-project/img-1.jpg">
        <img src="./content/projects/my-project/img-2.jpg">
    </div>
</div>

<script>
    Slider( document.getElementById('projectSecondColumn'), 3000 );
</script>
```


# Package distribution 

**Npm** : Install using... 
```
$ npm install grido-cms -s
```

**Git** : Clone from Github... (Or download the latest release [here](https://github.com/colxi/grido-cms/releases/latest))
```
$ git clone https://github.com/colxi/grido-cms
```

After installation, you just need to start adding your files inside the `/contents/` directory, following the steps provided in the **Content management** section of this documentation.

## Grido-cli ( Soon... )

Command Line utility for general contents administration from the command line

- create new projects
- remove projects
- backup
- create categories
- remove categories
- update the engine core
- etc...
