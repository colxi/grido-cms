
/**
 * 
 */
let GUI = {
    insertHTML : function(html, dest, append=false){
        // if no append is requested, clear the target element
        if(!append) dest.innerHTML = '';
        // create a temporary container and insert provided HTML code
        let container = document.createElement('div');
        container.innerHTML = html;
        // cache a reference to all the scripts in the container
        let scripts = container.querySelectorAll('script');
        // get all child elements and clone them in the target element
        let nodes = container.childNodes;
        for( let i=0; i< nodes.length; i++) dest.appendChild( nodes[i].cloneNode(true) );
        // force the found scripts to execute...
        for( let i=0; i< scripts.length; i++){
            let script = document.createElement('script');
            script.type = scripts[i].type || 'text/javascript';
            if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
            script.innerHTML = scripts[i].innerHTML;
            document.head.appendChild(script);
            document.head.removeChild(script);
        }
        // done!
        return true;
    },
    cardsContainer       : document.getElementById('cardsContainer'),
    filterButton         : document.getElementById('filterButton'),
    filterCategoriesList : document.getElementById('filterCategoriesList'),
    projectContainer     : document.getElementById('projectContainer'),
    projectClose         : document.getElementById('projectClose'),
    projectContent       : document.getElementById('projectContent'),
}

export {GUI} ;

