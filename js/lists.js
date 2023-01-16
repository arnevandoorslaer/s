let full_urls = [];
let short_urls = [];
let ids = [];

collect();

function collect() {
    db.collection('urls').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(item => {
            if (item.type == 'added') add(item.doc.data(),item.doc.id);
            if (item.type == 'removed') remove(item);
        });
    });
}

function add(item,id) {
    full_urls.push(item.full);
    short_urls.push(item.short);
    ids.push(id);
}

function escapeHtml(unsafe) {
    return unsafe
      .split(/&/g).join("&amp;")
      .split(/</g).join("&lt;")
      .split(/>/g).join("&gt;")
      .split(/"/g).join("&quot;")
      .split(/'/g).join("&#39;");
  }
  
  function unescapeHtml(unsafe) {
    return unsafe
      .split("&amp;").join("7")
      .split("&lt;").join("<")
      .split("&gt;").join(">")
      .split("&quot;").join("\"")
      .split("&#39;").join("\'");
  }

  function remove(url) {
    full_urls = removeA(full_urls, url.doc.data().full);
    short_urls = removeA(short_urls, url.doc.data().short);
    ids = removeA(ids, url.doc.id);
}

  function removeA(array,value) {
    const index = array.indexOf(value);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
    return array;
}