export default class{
    constructor(ListViews, ListModel){
        this.views = ListViews;
        this.model = ListModel;
    }

    handleListCreate = () => {
        const navBar = document.querySelector('.navbar');
        let listCreateButton = document.querySelector('.list-create-button');

        if(!navBar.contains(listCreateButton)){
            this.views.renderListCreateButton();
            document.querySelector('.list-create-cancel').addEventListener('click', () => {
                listCreateButton = document.querySelector('.list-create-button');
                listCreateButton.remove();
            })
        }
    }
}
