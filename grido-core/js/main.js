import { Projects } from '../../grido-content/projects.json.js';
import { Slider } from './lib/simple-slider.js'; 
import { GUI } from './gui.js';
import { Grid } from './grid.js';
import { Navigation } from './navigation.js';
import { Filters } from './filters.js';



async function loadTemplate(){
    let head = await ( await fetch('./grido-content/theme/html/head.htm') ).text();
    // inject i template, extract all the elements, and one by one, inject them in
    // the head using appendChilkdor replacechild

    GUI.htmlLoader.innerHTML += head;
    // force scripts in the imported head to execute! 
    let scripts = GUI.htmlLoader.content.querySelectorAll('script');
    for( let i=0; i< scripts.length; i++){
        console.log( scripts[i])
        let script = document.createElement('script');
        script.type = scripts[i].type || 'text/javascript';
        if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
        script.innerHTML = scripts[i].innerHTML;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }


    let sidebarTop = await ( await fetch('./grido-content/theme/html/sidebar-top.htm') ).text();
    document.getElementById('sidebarTop').innerHTML = sidebarTop;

    let sidebarBottom = await ( await fetch('./grido-content/theme/html/sidebar-bottom.htm') ).text();
    document.getElementById('sidebarBottom').innerHTML = sidebarBottom;

}
loadTemplate();



// set global variable, to make it available to Project individual files
window.Slider = Slider;


/* CATEGORY FILTERS BUTTON : Click Handler */
GUI.filterButton.addEventListener('click', ()=>{
    if( GUI.filterCategoriesList.hasAttribute('folded') ) GUI.filterCategoriesList.removeAttribute('folded');
    else GUI.filterCategoriesList.setAttribute('folded', true)
});


/* CLOSE PROJECT window : Close Button click handler */
GUI.projectClose.addEventListener('click', ()=>{ 
    Navigation.loadUrl('#!/listing');
});


/**
 *  INIT!
 */
window.addEventListener( 'load' , ()=>{ 
    Filters.init();
    Grid.fill( Projects );
    Navigation.loadUrl( window.location.hash , false ); 
})


