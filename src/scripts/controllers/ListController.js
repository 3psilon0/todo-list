import { v4 as uuidv4 } from 'uuid';

export default class{
    constructor(ListViews, ListModel){
        this.views = ListViews;
        this.model = ListModel;
    }

    createList(listId, listName){
        this.views.renderListButton(listId, listName);
        
        if(this.model.searchList(listId) === undefined){
            this.model.createList(listId, listName);
        }

        document.querySelector(`div[data-id="${listId}"]`).children.item(2).children.item(0).addEventListener('click', (e) => {
            this.views.renderListEditButton(listId);
        })

        document.querySelector(`div[data-id="${listId}"]`).children.item(2).children.item(1).addEventListener('click', (e) => {
            document.querySelector(`div[data-id="${listId}"]`).remove();
            this.model.deleteList(listId);  
        })
    }

    initialize(){
        this.model.lists.forEach(list => {
            this.createList(list.id, list.name);
        });
    }

    handleListCreate = () => {
        const navBar = document.querySelector('.navbar');
        let listCreateButton = document.querySelector('.list-create-button');

        if(!navBar.contains(listCreateButton)){
            this.views.renderListCreateButton();

            document.querySelector('.list-create-confirm').addEventListener('click', () => {
                listCreateButton = document.querySelector('.list-create-button');
                const input = document.querySelector('.list-create-input');
                this.createList(uuidv4(), input.checkValidity() ? input.value : 'Default List')
                listCreateButton.remove();
            })

            document.querySelector('.list-create-cancel').addEventListener('click', () => {
                listCreateButton = document.querySelector('.list-create-button');
                listCreateButton.remove();
            })
        }
    }
}
