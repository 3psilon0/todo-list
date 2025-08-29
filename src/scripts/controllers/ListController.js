import { v4 as uuidv4 } from "uuid";

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
                this.createList(uuidv4(), input.checkValidity() ? input.value : "Default List");
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

    initialize() {
        this.model.lists.forEach((list) => {
            this.createList(list.id, list.name);
        });
        document.querySelector(".list-add-button").addEventListener("click", this.handleListCreate);
    }

    updateSidebarUI() {
        const addListButton = (listId, listName) => {
            this.views.renderListButton(listId, listName);

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
