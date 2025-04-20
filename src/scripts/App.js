class ListItem{
    constructor(title, desc, dueDate, priority){
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
        this.checked = false;
    }
}

class List {
    constructor(name){
        this.name = name;
        this.items = [];
    }

    addItem(title, desc, dueDate, priority, checked = false){
        const item = new ListItem(title, desc, dueDate, priority, checked);
        this.items.push(item);
    }

    removeItem(index){
        this.items.splice(index, 1);
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

export default class {
    constructor(){
        this.lists = []
    }

    createList(name) {
        const list = new List(name);
        this.lists.push(list);
    }

    deleteList(index){
        this.lists.splice(index, 1);
    }
}