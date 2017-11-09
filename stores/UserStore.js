import { observable, action } from "mobx";

class UserStore {
    
    @observable userData = [];

    @action
    setUserData(arr){
        this.userData = arr;
    }
    
}

let userStore = new UserStore();
export default userStore;