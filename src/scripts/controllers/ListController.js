import { v4 as uuidv4 } from 'uuid';

export default class{
    constructor(ListViews, ListModel){
        this.views = ListViews;
        this.model = ListModel;
    }

    initialize(){
        this.model.lists.forEach(list => {
            this.createList(list.id, list.name);
        });
        document.querySelector('.list-add-button').addEventListener('click', this.handleListCreate);
    }
    
    createList(listId, listName){
        this.views.renderListButton(listId, listName);
        
        if(this.model.searchList(listId) === undefined){
            this.model.createList(listId, listName);
        }

        // Handles list name edit
        document.querySelector(`div[data-id="${listId}"]`).children.item(2).children.item(0).addEventListener('click', (e) => {
            this.views.renderListEditButton(listId);
            const listEditButton = document.querySelector(`div[data-id="${listId}"]`);

            const listEditInput = listEditButton.children.item(0);
            listEditInput.value = listName;
            listEditInput.focus();

            // List edit confirm
            listEditButton.children.item(1).addEventListener("click", () => {
                let editItem = this.model.searchList(listId);
                editItem.editListName(listEditInput.value);
                editItem = this.model.searchList(listId);
                listEditButton.remove();
                this.createList(listId, editItem.name);
            })

            // List edit cancel
            listEditButton.children.item(2).addEventListener("click", () => {
                let editItem = this.model.searchList(listId);
                listEditButton.remove();
                this.createList(listId, editItem.name);
            })
        })

        // Handles removal of list
        document.querySelector(`div[data-id="${listId}"]`).children.item(2).children.item(1).addEventListener('click', (e) => {
            document.querySelector(`div[data-id="${listId}"]`).remove();
            this.model.deleteList(listId);  
        })
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
