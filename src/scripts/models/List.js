import storage from '../services/StorageService.js';

class ListItem{
    constructor(id, parentId, title, desc, dueDate, priority, checked = false){
        this.id = id;
        this.parentId = parentId;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    toggleCheck() {
        this.checked = !this.checked;
    }

    edit(title, desc, dueDate, priority){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export default class{
    constructor(listId, listName, listItems = [], itemCounter = 1){
        this.id = listId;
        this.name = listName;
        this.itemCounter = itemCounter;
        
        this.items = []
        if(listItems.length != 0) {
            listItems.forEach((storedItem) => {
                const retrievedItem = new ListItem(storedItem.id, storedItem.parentId, storedItem.title, storedItem.desc, storedItem.dueDate, storedItem.priority, storedItem.checked);
                this.items.push(retrievedItem);
            })
        }
    }

    addItem(itemId, title, desc, dueDate, priority){
        this.itemCounter += 1;
        const item = new ListItem(itemId, this.id, title, desc, dueDate, priority);
        this.items.push(item);
        storage.save(`list-${this.id}`, JSON.stringify(this));
    }

    searchItem(itemId){
        return this.items.find(item => item.id === parseInt(itemId));
    }

    removeItem(itemId){
        this.items.splice(this.items.indexOf(this.searchItem(itemId)), 1);
        storage.save(`list-${this.id}`, JSON.stringify(this));
    }

    editItem(itemId, title, desc, dueDate, priority){
        const item = this.items.find(item => item.id === itemId);
        item.edit(title, desc, dueDate, priority);
        storage.save(`list-${this.id}`, JSON.stringify(this));
    }

    toggleItem(itemId){
        this.searchItem(itemId).toggleCheck();
        storage.save(`list-${this.id}`, JSON.stringify(this));
    }

    editListName(name){
        this.name = name;
        storage.save(`list-${this.id}`, JSON.stringify(this));
    }

    reset(){
        this.itemCounter = 0;
        this.items = [];
    }

    get nCheckedItems(){
        let counter = 0;
        this.items.forEach((item) => {
            if(item.checked === true) {
                counter = counter + 1;
            }
        })
        return counter;
    }
}