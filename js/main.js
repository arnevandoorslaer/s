window.onload = function () {
  setTimeout(draw, 1000);
  setTimeout(createInput, 100);
};

db.collection('urls').onSnapshot(() => draw());

function draw() {
  $("#url_list_body").empty();
  urls.map(url => displayUrl(url))
}

function displayUrl({short, full, id}) {
  let tr = $('<tr/>',{ id });

  $(`<td class="short">${short}</td>`).click(() => copy(short)).appendTo(tr);
  $(`<td><a href='${full}'>${full}</a></td>`).appendTo(tr);
  $(`<td class="remove"><strong>x</strong></td>`).click(() => removeUrl(id)).appendTo(tr);
  
  tr.appendTo($('#url_list_body'))
}

function createInput() {
  const listener = addEventListener('keyup', function (e) {
    if (e.keyCode == 13)  addUrl();
  })

  const inputAttributes = { class: 'form-control', type: 'text', addEventListener: listener };

  $('<input/>', {... inputAttributes, placeholder: 'full-url', name: 'fullUrl', id: 'fullUrl'}).appendTo($("#search"));
  $('<input/>', {... inputAttributes, placeholder: 'short-url', name: 'shortUrl', id: 'shortUrl'}).appendTo($("#search"));
}

async function addUrl() {
  const [full, short] = [$("#fullUrl").val(), $("#shortUrl").val()];
  $("#fullUrl").val('');
  $("#shortUrl").val('');
  if(!full) return;
  if(!full.includes('http')) return;
  await db.collection('urls').add({ full, short: (!short || short == '') ? getShortId() : short, clicks: 0})
  draw();
}

async function removeUrl(id) {
  await db.collection('urls').doc(id).delete();
  draw();
}

function getShortId(){
  return Math.random().toString(36).substring(7);
}

function copy(short) {
  navigator.clipboard.writeText(`${this.location.origin}/${short}`)
}
