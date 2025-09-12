    export default class {
    constructor(ListViews, ListModel) {
        this.views = ListViews;
        this.model = ListModel;
    }

    handleListCreate = () => {
        const navBar = document.querySelector(".navbar");
        let listCreateButton = document.querySelector(".list-create-button");

        if (!navBar.contains(listCreateButton)) {
            const handleCreateConfirm = () => {
                listCreateButton = document.querySelector(".list-create-button");
                const input = document.querySelector(".list-create-input");
                this.createList(this.model.listCounter, input.checkValidity() ? input.value : "Default List");
                listCreateButton.remove();
            };

            const handleCreateCancel = () => {
                listCreateButton = document.querySelector(".list-create-button");
                listCreateButton.remove();
            };

            this.views.renderListCreateButton();

            document
                .querySelector(".list-create-confirm")
                .addEventListener("click", handleCreateConfirm);

            document
                .querySelector(".list-create-cancel")
                .addEventListener("click", handleCreateCancel);
        }
    };

    handleListEdit = (e) => {
        const parentListTag = e.currentTarget.parentElement.parentElement;
        const listId = parentListTag.dataset.id;
        const listName = this.model.searchList(listId).name;

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
            this.updateSidebarUI();
        });

        // List edit cancel
        listEditButton.children.item(2).addEventListener("click", () => {
            let editItem = this.model.searchList(listId);
            listEditButton.remove();
            this.updateSidebarUI();
        });
    }

    handleListDelete = (e) => {
        const listId = e.currentTarget.parentElement.parentElement.dataset.id;

        document.querySelector(`div[data-id="${listId}"]`).remove();
        this.model.deleteList(listId);
    }

    handleItemCreate = () => {
        const handleCreateConfirm = (e) => {
            e.preventDefault();
            const listId = document.querySelector('#content').dataset.listId;
            const currentList = this.model.searchList(listId);
            const form = document.querySelector('.item-add-form');

            if(form.checkValidity()){
                document.querySelector('.form-confirm-button').removeEventListener("click", handleCreateConfirm);

                const desc = document.querySelector('#item-desc-input').value === '' ? 'No description' : document.querySelector('#item-desc-input').value;
                const dueDate = new Date(document.querySelector('#item-dueDate-input').value).toLocaleString('Us-en', {dateStyle: 'medium'});

                currentList.addItem(currentList.itemCounter, document.querySelector('#item-title-input').value, desc, dueDate, document.querySelector(`input[name='prio']:checked`).value);
                document.querySelector('.item-add-dialog').close();
                this.updateContentUI(listId);
                form.reset();
            }
        }

        const handleCreateCancel = () => {
            document.querySelector('.form-cancel-button').removeEventListener("click", handleCreateCancel);
            document.querySelector('.item-add-form').reset();
            document.querySelector('.item-add-dialog').close();
        }

        document.querySelector('.dialog-title').innerHTML = "Add new task";
        document.querySelector('.item-add-dialog').showModal();

        document.querySelector('.form-confirm-button').addEventListener("click", handleCreateConfirm);
        document.querySelector('.form-cancel-button').addEventListener("click", handleCreateCancel);
    }

    handleItemToggle = (e) => {
        const parentId = e.target.parentElement.parentElement.parentElement.dataset.parentId;
        const itemId = e.target.parentElement.parentElement.parentElement.dataset.itemId;
        const currentList = this.model.searchList(parentId);

        currentList.toggleItem(itemId);
        this.updateContentUI(parentId);
    }

    handleListShow = (e) => {
        if(e.target.className === 'list-button' || e.target.className === 'list-button-text'){
            let listId;
            switch(e.target.className){
                case 'list-button':
                    listId = e.target.dataset.id;
                    break;
                case 'list-button-text':
                    listId = e.target.parentElement.dataset.id;
                    break;
            }
            this.updateContentUI(listId);
        }
    }

    initialize = () => {
        this.updateSidebarUI();
        document.querySelector(".list-add-button").addEventListener("click", this.handleListCreate);
    }

    updateContentUI(listId) {
        const list = this.model.searchList(listId);

        this.views.renderListLayout(list.id, list.name, list.nCheckedItems, list.items.length);
        document.querySelector('.item-add-button').addEventListener("click", this.handleItemCreate);

        list.items.forEach((item) => {
            this.views.renderListItem(item.id, item.parentId, item.title, item.desc, item.dueDate, item.priority, item.checked);

            document.querySelector(`div[data-item-id="${item.id}"]`).children.item(0).children.item(0).children.item(1).addEventListener("click", this.handleItemToggle);
        });
    }

    updateSidebarUI() {
        const addListButton = (listId, listName) => {
            this.views.renderListButton(listId, listName);

            document.querySelector(`div[data-id="${listId}"]`).addEventListener("click", this.handleListShow);

            document
                .querySelector(`div[data-id="${listId}"]`)
                .children.item(2)
                .children.item(0)
                .addEventListener("click", this.handleListEdit);

            document
                .querySelector(`div[data-id="${listId}"]`)
                .children.item(2)
                .children.item(1)
                .addEventListener("click", this.handleListDelete);
        };

        document.querySelector(".navbar").innerHTML = "";
        this.model.lists.forEach((list) => {
            addListButton(list.id, list.name);
        });
    }

    createList(listId, listName) {
        if (this.model.searchList(listId) === undefined) {
            this.model.createList(listId, listName);
        }
        this.updateSidebarUI();
    }
}
