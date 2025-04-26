import storage from '../services/StorageService.js';

class ListItem{
    constructor(id, parentId, title, desc, dueDate, priority){
        this.id = id;
        this.parentId = parentId;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = false;
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
    constructor(listId, name){
        this.id = listId;
        this.name = name;
        this.items = [];
    }

    addItem = (itemId, title, desc, dueDate, priority) => {
        const item = new ListItem(itemId, this.id, title, desc, dueDate, priority);
        this.items.push(item);
        storage.save(`list-${this.id}`, JSON.stringify(this))
    }

    searchItem(itemId){
        return this.items.find(item => item.id === itemId);
    }

    removeItem(itemId){
        this.items.splice(this.items.indexOf(this.searchItem(itemId)), 1);
        storage.save(`list-${this.id}`, JSON.stringify(this))
    }

    editItem(itemId, title, desc, dueDate, priority){
        const item = this.items.find(item => item.id === itemId);
        item.edit(title, desc, dueDate, priority);
        storage.save(`list-${this.id}`, JSON.stringify(this))
    }

    editListName(name){
        this.name = name;
        storage.save(`list-${this.id}`, JSON.stringify(this))
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