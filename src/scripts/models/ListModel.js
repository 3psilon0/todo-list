import storage from '../services/StorageService.js'
import List from './List.js'

export default class{
    constructor(){
        this.lists = []
        Object.keys(storage.instance).forEach(key => {
            if(key.slice(0, 3) === 'list'){
                this.lists.push(storage.instance[key]);
            }
        })
    }

    createList(listId, name) {
        const list = new List(listId, name);
        this.lists.push(list);
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