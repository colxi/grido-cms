import { Projects } from '../content/projects.json.js';
import { Slider } from './lib/simple-slider.js'; 
import { GUI } from './gui.js';
import { Grid } from './grid.js';
import { Navigation } from './navigation.js';
import { Filters } from './filters.js';



async function loadTemplate(){
    let head = await ( await fetch('./content/theme/html/head.htm') ).text();
    document.head.innerHTML += head;

    let sidebarTop = await ( await fetch('./content/theme/html/sidebar-top.htm') ).text();
    document.getElementById('sidebarTop').innerHTML = sidebarTop;

    let sidebarBottom = await ( await fetch('./content/theme/html/sidebar-bottom.htm') ).text();
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


