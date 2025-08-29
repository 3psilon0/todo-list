import storage from '../services/StorageService.js'
import List from './List.js'

export default class{
    constructor(){
        this.lists = [];
        Object.keys(storage.instance).forEach(key => {
            if(key.slice(0, 4) === 'list'){
                const storedList = JSON.parse(storage.instance[key]);
                const retrievedList = new List(storedList.id, storedList.name, storedList.items);
                this.lists.push(retrievedList); 
            }
        })
        this.lists.sort((a, b) => a.name.localeCompare(b.name));
        console.log(this.lists);
    }

    createList(listId, name) {
        const list = new List(listId, name);
        this.lists.push(list);
        this.lists.sort((a, b) => a.name.localeCompare(b.name));
        storage.save(`list-${listId}`, JSON.stringify(list));
    }

    searchList(listId){
        return this.lists.find(list => list.id === listId);
    }
    
    deleteList(listId){
    this.lists.splice(this.lists.indexOf(this.searchList(listId)), 1);
    storage.delete(`list-${listId}`);
    }
}