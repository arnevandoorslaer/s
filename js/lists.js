const full_urls = [];
const short_urls = [];
const ids = [];

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
    removeA(full_urls, url.doc.data().full);
    removeA(short_urls, url.doc.data().short);
    removeA(ids, url.doc.id);
}

  function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}