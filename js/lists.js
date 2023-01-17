const urls = [];

collect();

function collect() {
    db.collection('urls').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(item => {
            if (item.type == 'added') add(item.doc.data(), item.doc.id);
            if (item.type == 'removed') remove(item);
        });
    });
}

function add(item,id) {
    urls.push({full: item.full, short: item.short, id})
}

function remove(url) {
  const index = urls.indexOf(urls.find(item => item.id == url.doc.id));
  if (index > -1) { 
    urls.splice(index, 1);
  }
}
