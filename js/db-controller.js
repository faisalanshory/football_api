function removeItem(team) {
  var dbPromised = idb.open("football-teams", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    //articlesObjectStore.createIndex("name", "name", { unique: false });
    });	
    
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.delete(team.id);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di hapus");
      });
}

function saveForLater(team) {
  var dbPromised = idb.open("football-teams", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    //articlesObjectStore.createIndex("name", "name", { unique: false });
    });	
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
}

function getAll() {
  var dbPromised = idb.open("football-teams", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    //articlesObjectStore.createIndex("name", "name", { unique: false });
    });
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
}



