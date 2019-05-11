import { Projects } from '../content/projects.json.js';
import { Categories } from '../content/categories.json.js';
import { GUI } from './gui.js';
import { Grid } from './grid.js';


let Filters = {
    // Collection of filters...
    status : {},
    // Initialized filters, and generate GUI Elements
    init: function(){
        for( let i=0; i<Categories.length; i++ ){
            Filters.status[ Categories[i] ] = true;
            let categoryFilter = document.createElement('div');
            categoryFilter.className = 'filterCategory';
            categoryFilter.innerHTML =  Categories[i];
            categoryFilter.setAttribute('data-name', Categories[i] );
            // handle button click
            categoryFilter.addEventListener('click', (e)=>{ 
                Filters.toggle( e.target.getAttribute('data-name') );
                return true;
            });
            // insert button!
            GUI.filterCategoriesList.appendChild(categoryFilter);
        }
        return true;
    },
    // Togle on/off an individual filter
    toggle : function( name ){
        if( Filters.status[ name ] === undefined ) return false;
        const filterBut = GUI.filterCategoriesList.querySelector('[data-name='+name+']'); 
        if( Filters.status[ name ] ) filterBut.setAttribute('disabled', true);
        else filterBut.removeAttribute('disabled');
        Filters.status[ name ] = !Filters.status[ name ];
        Grid.filter( Projects , Filters.status);
        return true;
    }
};



export {Filters};