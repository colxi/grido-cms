/**
 * 
 * name : simple-slider.js
 * author : colxi.info
 * webpage : https://github.com/colxi/simple-slider
 * 
 */


/*
    Usage : 
    <div id="my-slider" slider-footer slider-nav>
            <img src="https://placekitten.com/208/287" slide-title="My first cat"/>
            <img src="https://placekitten.com/408/287" slide-title="My second cat"/>
            <img src="https://placekitten.com/408/287" slide-title="My forth cat"/>
            <img src="https://placekitten.com/408/287" slide-title="My fifth cat"/>
            <img src="https://placekitten.com/408/287" slide-title="My sixth cat"/>
    </div>

    <script type="module">
        import {Slider} from './simple-slider.js';
        let container = document.getElementById('my-slider');
        Slider(container, 3000); 
    </script>
*/

let CSS = `
    .simple-slider{
        background:grey;
        position:relative;
        overflow:hidden;
        display:grid;
    }

    .simple-slider-contents{
        position    : relative;
        left        : 0px;
        width       : auto;
        display     : grid;
        grid-gap    : 0;
        transition  : left 1s;
        margin-bottom: -3px;
    }

    .simple-slider-slide{
        text-align:center;   
        position:relative;
        overflow:hidden;
    }

    .simple-slider img{ width:100% }

    .simple-slider-slide-footer{
        background:black;
        position:absolute;
        width:100%;
        color:white;
        padding:10px;
        bottom:-50px;
        transition: bottom .5s;
        box-shadow : 0 0 10px black;
    }

    .simple-slider[slider-footer]:hover .simple-slider-slide-footer{
        bottom:3px;
    }

        
    .simple-slider-navigation {
        position: absolute;
        background: black;
        z-index: 1;
        width: 40px;
        height: 40px;
        color: white;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        font-family: monospace;
        cursor: pointer;
        display:none;
    }
    .simple-slider[slider-nav]:hover .simple-slider-navigation { display:block; }

    .simple-slider-navigation-prev {
        align-self: center;
        left: 10px;
    }

    .simple-slider-navigation-next {
        align-self: center;
        right: 10px;
    }
`;
let sliderStyles = document.createElement('style');
sliderStyles.innerHTML = CSS;
document.head.appendChild(sliderStyles);


// public function
function Slider(source, speed=3000){
    if(!source) return false;

    // Function to handle each slider cicle
    let cicle = ()=>{
        // inspect slider size, and adapt contents if changed
        if( width !== source.offsetWidth ){
            width = source.offsetWidth;
            contents.style['grid-template-columns'] = 'repeat('+slidesCount+', '+width+'px)';
        }
        // increase slide, and assign new position
        currentSlide++;
        let newleft = width * currentSlide * -1;
        if( currentSlide >= slidesCount || currentSlide < 0){
            newleft = 0;
            currentSlide= 0;
        }
        //let currentLeft = contents.style.left.substring(0, contents.style.left.length-2);
        contents.style.left = newleft + 'px';
        return true;
    };

    let currentSlide = 0;
    let slidesCount  = source.children.length;
    let temp         = document.createElement('div'); 
    // copy contents ina temp location and
    // clear original container
    temp.innerHTML   = source.innerHTML;
    while (source.firstChild) source.removeChild(source.firstChild);
    
    // setup source container style
    source.className += ' simple-slider ';
    let width         = source.offsetWidth;
    let contents      = document.createElement('div');
    contents.className  = 'simple-slider-contents';
    contents.style.left =' 0px';
    contents.style['grid-template-columns'] = 'repeat('+slidesCount+', '+width+'px)';
    
    // insert  navigation buttons
    let navigationPrev = document.createElement('div');    
    navigationPrev.className = 'simple-slider-navigation simple-slider-navigation-prev';
    navigationPrev.innerHTML = '&lt;';
    source.appendChild(navigationPrev);
    navigationPrev.addEventListener('click', ()=>{
        currentSlide -= 2;
        cicle();
        clearInterval(sliderInterval);
        sliderInterval = setInterval( cicle ,speed);
    });
    let navigationNext = document.createElement('div');
    navigationNext.className = 'simple-slider-navigation simple-slider-navigation-next';
    navigationNext.innerHTML = '&gt;';
    source.appendChild(navigationNext);
    navigationNext.addEventListener('click', ()=>{
        cicle();
        clearInterval(sliderInterval);
        sliderInterval = setInterval( cicle ,speed);
    });
    
    // insert slides
    let html = '';
    for(let i=0;i<slidesCount;i++){
        let foot = '&nbsp;';
        if( temp.children[i].hasAttribute('slide-title') ){
            foot =  temp.children[i].getAttribute('slide-title');
        }
        html+= `
            <div class="simple-slider-slide">
                <img src="${temp.children[i].src}">
                <div class="simple-slider-slide-footer">${foot}</div>
            </div>
        `;
    }
    html += '</div>';
    contents.innerHTML = html;
    
    // contents generated, appand them!
    source.appendChild(contents);
    
    let sliderInterval = setInterval( cicle ,speed);
    return;
}

export {Slider};