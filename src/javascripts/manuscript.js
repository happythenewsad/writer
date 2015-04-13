var Manuscript = function(){
  var data = {
    goal: 0,
    wordcount: 0,
    manuscript: ""
  };

  this.localStorageAvailable = null;

  this.initialize = function(options){
    if (!options){
      return;
    }

    this.localStorageAvailable = options.html5storage;
    this.initializeDataFromLocalStorage();
  };

  //this method has a browser dependency :-/
  this.initializeDataFromLocalStorage = function(){
    if (!this.localStorageAvailable){
      console.log("Warning: local storage not detected");
      return;
    }

    ["goal", "wordcount", "manuscript"].forEach(function(item){
      if (localStorage[item]){
        this.setData(item, localStorage.getItem(item));
      }
    }, this);
  };

  this.wordsUntilGoal = function(){
    return Math.max(this.goal() - this.wordcount(), 0);
  };

  this.goal = function(){
    return data.goal;
  };

  this.wordcount = function(){
    return data.wordcount;
  };

  this.manuscript = function(){
    return data.manuscript;
  };

  this.setData = function(name, value){
    if (name === "goal" || name === "wordcount") {
      value = parseInt(value);
    }
  
    data[name] = value;
    this.persistItemToLocalStorage(name, value);
  };

  this.persistItemToLocalStorage = function(key, value){
    if (!this.localStorageAvailable){
      console.log("Warning: local storage not detected");
      return;
    }

    localStorage.setItem(key,value);    
  };

  //no use case yet
  // this.appendData = function(name, value){
  //   if (typeof this[name] !== typeof value){
  //     throw "Manuscript#appendData: type coercion not allowed.";
  //   }
  //   data[name] = data[name] + value;
  // }

};

module.exports = Manuscript;
