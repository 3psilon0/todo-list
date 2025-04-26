import checkPng from '../../assets/images/check.png'
import closePng from '../../assets/images/close.png'

export default class {

    static renderListButton(listName){
        
    }
    
    static renderListCreateButton(){
        const navbar = document.querySelector('.navbar');
        const mainDiv = document.createElement('div');
        mainDiv.className = 'list-create-button';
        mainDiv.innerHTML = `
            <input type="text" class="list-create-input" placeholder="Enter list name   ">
            <button type="button" class="default-button list-create-confirm">
                <img src="${checkPng}" alt="check">
            </button>
            <button type="button" class="default-button list-create-cancel">
                <img src="${closePng}" alt="close">
            </button>
        `;
        navbar.insertBefore(mainDiv, navbar.firstChild);
    }
}