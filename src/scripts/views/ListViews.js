import checkPng from "../../assets/images/check.png";
import closePng from "../../assets/images/close.png";
import editPng from "../../assets/images/edit.png";
import deletePng from "../../assets/images/delete.png";
import tagPng from "../../assets/images/tag.png";
import addPng from "../../assets/images/add.png"

export default class {
    static renderListLayout(listName, nTasksDone, nTasksTotal) {
        const content = document.querySelector("#content");
        content.innerHTML = `
          <div class="content-header">
            <div class="list-titlebar">
              <p class="titlebar-text">// ${listName} </br> <span class="titlebar-info">${nTasksDone} of ${nTasksTotal} tasks completed</span> </p>
            </div>
            <div class="item-add-container">
              <button type="button" class="default-button item-add-button">
                <img src="${addPng}" alt="add" class="add-icon-new" />
              </button>
            </div>
          </div>
          <div class="list-item-container"></div>
        `;
    }

    static renderListButton(listId, listName) {
        const navbar = document.querySelector(".navbar");
        const listButton = document.createElement("div");
        listButton.className = "list-button";
        listButton.dataset.id = listId;

        listButton.innerHTML = `
            <img class="tag-icon" src="${tagPng}" alt="edit">
            <p class="list-button-text">${listName}<p/>
            <button type="button" class="default-button list-button-edit">
                <img src="${editPng}" alt="edit">
            </button>
            <button type="button" class="default-button list-button-delete">
                <img src="${deletePng}" alt="delete">
            </button>
        `;
        navbar.appendChild(listButton);
    }

    static renderListEditButton(listId) {
        const editButton = document.querySelector(`div[data-id="${listId}"]`);
        editButton.className = "list-edit-button";
        editButton.innerHTML = `
            <input type="text" class="list-edit-input" placeholder="Enter list name" required>
            <button type="button" class="default-button list-edit-confirm">
                <img src="${checkPng}" alt="check">
            </button>
            <button type="button" class="default-button list-edit-cancel">
                <img src="${closePng}" alt="close">
            </button>
        `;
    }

    static renderListCreateButton() {
        const navbar = document.querySelector(".navbar");
        const mainDiv = document.createElement("div");
        mainDiv.className = "list-create-button";
        mainDiv.innerHTML = `
            <input type="text" class="list-create-input" placeholder="Enter list name" required>
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
