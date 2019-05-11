import { GUI } from './gui.js';
import { Grid } from './grid.js';
import { Projects } from '../content/projects.json.js';

/**
* 
*/
let __PAGE_TITLE__ = '';
window.addEventListener( 'load' , ()=> __PAGE_TITLE__ = document.title );




function getProjectFromURI(uri){
    if( uri[ uri.length-1] === '/' ) uri = uri.substr(0,uri.length-1);
    if( uri[0] === '/') uri = uri.substr(1,uri.length);
    for(let i=0;i<Projects.length; i++){
        let puri = Projects[i].URI;
        if( puri[ puri.length-1] === '/' ) puri = puri.substr(0,puri.length-1);
        if( puri[0] === '/') puri = puri.substr(1,puri.length);
        if(uri=== puri) return Projects[i];
    }
    return false;
}

window.getProjectFromURI = getProjectFromURI;


/**
 *  
 */
async function loadProject(uri){
    //if(setUrl) window.location = `#!/projects/${uri}`;

    GUI.projectContainer.removeAttribute('folded');
    document.body.setAttribute('projectView', true);

    // fetch project description HTML
    let html = await (await fetch(`./content/projects/${uri}/index.html`) ).text();
    // insert HTML
    GUI.projectContent.innerHTML= html;
    // make script elements to execute (they are not executed when 
    // inserted using innerHTML )
    let scripts = GUI.projectContent.getElementsByTagName('script');
    for( let i=0; i<scripts.length; i++){
        let script = document.createElement('script');
        script.type = scripts[i].type;
        script.innerHTML = scripts[i].innerHTML;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
}


/**
* 
*/
async function loadUrl( url, setUrl=true ) {
    let location = url.split('/');
    if( location[0] !== '#!' ){
        if( location[0] === '#' || location[0] === '' ) location[0] = '#!';
        else location.unshift('#!');
    } 
    if( location[1] === 'projects' ){
        console.log('LoadUrl : Project requested' , location );
        let url =  '#!/projects/'+location[2];
        let projectMeta = getProjectFromURI(location[2]);
        let title = __PAGE_TITLE__ + ' : Project ' + projectMeta.title + ' (' + projectMeta.categories.join(',') + ')';
        await loadProject( location[2] );
        if(setUrl) history.pushState( { url }, title, '#!/projects/'+location[2] );
        else history.replaceState( { url }, undefined, url );
    }else if( location[1] === 'listing' ){
        console.log('LoadUrl : Listing section requested' , location );
        let url = '#!/listing/';
        GUI.projectContainer.setAttribute('folded', true); 
        document.body.removeAttribute('projectView');
        setTimeout( ()=>{ 
            GUI.projectContent.innerHTML = '';
            if(setUrl) history.pushState({ url }, __PAGE_TITLE__ , '#!/listing/' );
            else history.replaceState( { url }, __PAGE_TITLE__, url );
        } , 500 );
        Grid.updateSize();
    }else{
        console.log('LoadUrl : Invalid section request, loading listing...' , location );
        loadUrl( '#!/listing/', setUrl );
    }
}


/**
 * 
 */
window.addEventListener( 'popstate' , event=>{
    // if state is found (browser next or previous button pressed) load it without saving history change
    if( event.state ) loadUrl( event.state.url , false);
    // if no state is found (manual modification of the url), load url and save history change
    else loadUrl( window.location.hash , false);
});

let Navigation = {
    loadUrl : loadUrl
}

export { Navigation };