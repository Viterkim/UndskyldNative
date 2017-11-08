import { observable, action } from "mobx";

class UndskyldStore {
    
    @observable buttonPressedCounter = 0;
    @observable undList = [];
    @observable currentText = "";
    @observable lastText = "";

    @action
    getNewData(){
        //Fetch data to undList
    }

    @action
    incrementButtonPressed(){
        this.buttonPressedCounter = this.buttonPressedCounter + 1;
    }

    @action
    setUndList(listArg){
        this.undList = listArg;
    }

    @action
    setCurrentText(textArg){
        this.lastText = this.currentText;
        this.currentText = textArg;
    }
    
    
}

let undskyldStore = new UndskyldStore();
export default undskyldStore;