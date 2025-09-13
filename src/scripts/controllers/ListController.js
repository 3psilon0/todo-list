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
        const content = document.querySelector('#content');
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
            const editItem = this.model.searchList(listId);
            editItem.editListName(listEditInput.value);
            if(listId === content.dataset.listId){
                this.updateContentUI(editItem.id);
            }
            listEditButton.remove();
            this.updateSidebarUI();
        });

        // List edit cancel
        listEditButton.children.item(2).addEventListener("click", () => {
            listEditButton.remove();
            this.updateSidebarUI();
        });
    }

    handleListDelete = (e) => {
        const content = document.querySelector('#content');
        const listId = e.currentTarget.parentElement.parentElement.dataset.id;

        this.model.deleteList(listId);
        if(content.dataset.listId === listId){
            content.innerHTML = '<h1 class="content-empty">No list is selected..</h1>';
        }

        this.updateSidebarUI();
    }

    handleItemCreate = () => {
        const handleCreateConfirm = (e) => {
            e.preventDefault();
            const listId = document.querySelector('#content').dataset.listId;
            const currentList = this.model.searchList(listId);
            const form = document.querySelector('.item-add-form');

            if(form.checkValidity()){
                document.querySelector('.form-confirm-button').removeEventListener("click", handleCreateConfirm);
                document.querySelector('.form-cancel-button').removeEventListener("click", handleCreateCancel);

                const desc = document.querySelector('#item-desc-input').value === '' ? 'No description' : document.querySelector('#item-desc-input').value;
                const dueDate = new Date(document.querySelector('#item-dueDate-input').value).toLocaleString('Us-en', {dateStyle: 'medium'});

                currentList.addItem(currentList.itemCounter, document.querySelector('#item-title-input').value, desc, dueDate, document.querySelector(`input[name='prio']:checked`).value);
                document.querySelector('.item-add-dialog').close();
                this.updateContentUI(listId);
                form.reset();
            }
        }

        const handleCreateCancel = () => {
            document.querySelector('.form-confirm-button').removeEventListener("click", handleCreateConfirm);
            document.querySelector('.form-cancel-button').removeEventListener("click", handleCreateCancel);

            document.querySelector('.item-add-form').reset();
            document.querySelector('.item-add-dialog').close();
        }

        document.querySelector('.dialog-title').innerHTML = "Add new task";
        document.querySelector('.item-add-dialog').showModal();

        document.querySelector('.form-confirm-button').addEventListener("click", handleCreateConfirm);
        document.querySelector('.form-cancel-button').addEventListener("click", handleCreateCancel);
    }

    handleItemEdit = (e) => {
        const itemId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.itemId;
        const parentId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.parentId;
        const currentList = this.model.searchList(parentId);
        const form = document.querySelector('.item-add-form');
        
        const handleEditConfirm = (e) => {
            e.preventDefault();
            
            if(form.checkValidity()){
                document.querySelector('.form-confirm-button').removeEventListener("click", handleEditConfirm);
                document.querySelector('.form-cancel-button').removeEventListener("click", handleEditCancel);

                const desc = document.querySelector('#item-desc-input').value === '' ? 'No description' : document.querySelector('#item-desc-input').value;
                const dueDate = new Date(document.querySelector('#item-dueDate-input').value).toLocaleString('Us-en', {dateStyle: 'medium'});

                currentList.editItem(itemId, document.querySelector('#item-title-input').value, desc, dueDate, document.querySelector(`input[name='prio']:checked`).value);
                document.querySelector('.item-add-dialog').close();
                this.updateContentUI(parentId);
                form.reset();
            }
        }

        const handleEditCancel = () => {
            document.querySelector('.form-confirm-button').removeEventListener("click", handleEditConfirm);
            document.querySelector('.form-cancel-button').removeEventListener("click", handleEditCancel);

            document.querySelector('.item-add-form').reset();
            document.querySelector('.item-add-dialog').close();
        }
        
        const initalizeForm = () => {
            const listItem = currentList.searchItem(itemId);
            document.querySelector('#item-title-input').value = listItem.title;
            document.querySelector('#item-desc-input').value = listItem.desc;
            const dueDate = new Date(listItem.dueDate).toLocaleString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});
            document.querySelector('#item-dueDate-input').value = dueDate;
            document.querySelector(`#prio-${listItem.priority}-input`).checked = true;
        }

        document.querySelector('.dialog-title').innerHTML = "Edit task";
        initalizeForm();
        document.querySelector('.item-add-dialog').showModal();

        document.querySelector('.form-confirm-button').addEventListener("click", handleEditConfirm);
        document.querySelector('.form-cancel-button').addEventListener("click", handleEditCancel);        
    }

    handleItemDelete = (e) => {
        const itemId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.itemId;
        const parentId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.parentId;
        const currentList = this.model.searchList(parentId);

        currentList.removeItem(itemId);
        this.updateContentUI(parentId);
    }

    handleItemDropdown = (e) => {
        const itemId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.itemId;

        const itemElement = document.querySelector(`div[data-item-id="${itemId}"]`);
        e.target.classList.toggle('dropped');
        const descElement = itemElement.children.item(1);
        
        if(descElement.style.maxHeight){
            descElement.style.maxHeight = null;
            descElement.style.padding = null;
            descElement.style.opacity = null;
        }
        else {
            descElement.style.maxHeight = descElement.scrollHeight + "px";
            descElement.style.padding = "10px";
            descElement.style.opacity = "1";
        }
        
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
            document.querySelector(`div[data-item-id="${item.id}"]`).children.item(0).children.item(2).children.item(0).addEventListener("click", this.handleItemDropdown);
            document.querySelector(`div[data-item-id="${item.id}"]`).children.item(0).children.item(2).children.item(1).addEventListener("click", this.handleItemEdit);
            document.querySelector(`div[data-item-id="${item.id}"]`).children.item(0).children.item(2).children.item(2).addEventListener("click", this.handleItemDelete);
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