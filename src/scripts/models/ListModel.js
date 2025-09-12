import storage from '../services/StorageService.js'
import List from './List.js'

export default class{
    constructor(){
        this.lists = [];
        this.listCounter = 0;
        Object.keys(storage.instance).forEach(key => {
            if(key.slice(0, 5) === 'list-'){
                const storedList = JSON.parse(storage.instance[key]);
                const retrievedList = new List(storedList.id, storedList.name, storedList.items, storedList.itemCounter);
                console.log(retrievedList);
                this.lists.push(retrievedList); 
            }
            else if(key === 'listCounter'){
                this.listCounter = parseInt(storage.instance[key]);
            }
        })
        this.lists.sort((a, b) => a.name.localeCompare(b.name));
    }

    createList(listId, name) {
        this.listCounter += 1;
        storage.save('listCounter', this.listCounter.toString());
        const list = new List(listId, name);
        this.lists.push(list);
        this.lists.sort((a, b) => a.name.localeCompare(b.name));
        storage.save(`list-${listId}`, JSON.stringify(list));
    }

    searchList(listId){
        return this.lists.find(list => list.id === parseInt(listId));
    }
    
    deleteList(listId){
    this.lists.splice(this.lists.indexOf(this.searchList(listId)), 1);
    storage.delete(`list-${listId}`);
    }

    reset(){
        Object.keys(storage.instance).forEach(key => {
            if(key.slice(0, 4) === 'list'){
                this.deleteList(JSON.parse(storage.instance[key]).id); 
            }
            else if(key === 'listCounter'){
                this.listCounter = 0;
                storage.save('listCounter', this.listCounter.toString());
            }
        })
    }

}