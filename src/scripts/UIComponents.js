export default class {
    
    static renderListCreateInput(){
        const navbar = document.querySelector('.navbar');
        const mainDiv = document.createElement('div');
        mainDiv.className = 'list-create-button';
        mainDiv.innerHTML = `
            <input type="text" class="list-create-input">
            <button type="button" class="list-create-confirm">
                <img src="./assets/images/check.png" alt="check">
            </button>
            <button type="button" class="list-create-cancel">
                <img src="./assets/images/close.png" alt="close">
            </button>
        `;
        navbar.appendChild(mainDiv);
        document.querySelector('.list-create-cancel').addEventListener('click', () => {
            mainDiv.remove();
        })
    }
}