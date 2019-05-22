import { GUI } from './gui.js';
import {CSSGlobalVariables} from './lib/css-global-variables.js';


let cssVar               = new CSSGlobalVariables();
let __MAX_CARD_SIZE__    = Number( cssVar['card-size'] );


window.cssVar = cssVar;

let Grid = {
    /**
     * 
     * 
     */
    updateSize : function(){
        // If there is available space in the with of the container not
        // being used, it will expand or reduce the cell area in order to
        // fill all the available space. 
        // It will expand the cells when the increment does not make the cell
        // be bigger than the max allowed size, otherwise it will reduce
        // enought to fit another column, and fill al the free space 
        let containerWidth    = GUI.cardsContainer.getBoundingClientRect().width;
        let currentSize       = Number( cssVar['card-size'] );
        let columnsCount      = Math.floor(containerWidth / currentSize );
        let usedWidth         = currentSize * columnsCount;
        let availableWidth    = containerWidth - usedWidth;
        let potentialIncrease = Math.floor( availableWidth / columnsCount );
        // decide if enlarge or reduce
        if( currentSize === __MAX_CARD_SIZE__ || currentSize + potentialIncrease > __MAX_CARD_SIZE__ ){
            cssVar['card-size'] =  Math.floor( containerWidth / (columnsCount+1) );
        }else{
            cssVar['card-size'] = currentSize + potentialIncrease;
        }
    },
    /**
     * 
     * 
     */
    fill : function( Projects ){
        GUI.cardsContainer.innerHTML = '';
        // render all the cards
        for(let i=0;i<Projects.length;i++){
            let card = document.createElement('a');
            card.href='#!/projects/' + Projects[i].URI;
            // handle card click
            //card.addEventListener( 'click', async ()=>Navigation.loadUrl('#!/projects/' + Projects[i].URI) );
    
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img" style="background-image:url(./grido-content/projects/${Projects[i].URI}/thumbnail.jpg)"></div>
                <div class="card-button">+</div>
                <div class="card-title">${Projects[i].title}</div>
            `;
            GUI.cardsContainer.appendChild(card);
        }
        Grid.updateSize();
    
        setTimeout( ()=>Grid.updateSize() , 1000);
    
    },
    /**
     * 
     * 
     */
    filter : function(_Projects , Filters ){
        let Projects = [];
        for(let i=0;i<_Projects.length;i++){
            let project = _Projects[i];
            for(let c=0; c < project.categories.length; c++){
                let projectCategory = project.categories[c];
                if( !Filters.hasOwnProperty(projectCategory) ) throw new Error('Unknown category found in project: '+ projectCategory)
                if( Filters[projectCategory] === true ){ 
                    Projects.push( project );
                    break;
                }
            }
        }
        Grid.fill( Projects );
    },
};

window.addEventListener('resize', ()=>{ 
    Grid.updateSize();
});

export { Grid };

