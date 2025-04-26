export default class {
    static save(key, value){
        window.localStorage.setItem(key, value)
    }

    static load(key){
        window.localStorage.getItem(key);
    }

    static delete(key){
        window.localStorage.removeItem(key);
    }

    static get instance(){
        return window.localStorage;
    }
}