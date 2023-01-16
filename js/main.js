window.onload = function () {
  setTimeout(draw, 1000);
  setTimeout(createInput, 500);
};



db.collection('urls').onSnapshot(() => draw());

function draw() {
  $("#url_list_body").empty();
  for (let i = 0; i < short_urls.length; i++) {
    displayUrl(short_urls[i], full_urls[i],ids[i]);
  }
}

function displayUrl(short, full,id) {
  let tr = $('<tr/>',{ id });

  $(`<td class="short">${short}</td>`).click(() => copy(short)).appendTo(tr);
  $(`<td><a href='${full}'>${full}</a></td>`).appendTo(tr);
  $(`<td class="remove"><strong>x</strong></td>`).click(() => removeUrl(id)).appendTo(tr);
  
  tr.appendTo($('#url_list_body'))

}

function createInput() {
  const listener = addEventListener('keyup', function (e) {
    let fullUrl = $("#fullUrl").val();
    let shortUrl = $("#shortUrl").val();
    if (e.keyCode == 13) {
      addUrl(fullUrl, shortUrl);
    }
  })


  $('<input/>', {
    class: 'form-control',
    name: 'fullUrl',
    type: 'text',
    id: 'fullUrl',
    placeholder: 'full-url',
    addEventListener: listener,
  }).appendTo($("#search"));

  $('<input/>', {
    class: 'form-control',
    name: 'shortUrl',
    type: 'text',
    id: 'shortUrl',
    placeholder: 'short-url',
    addEventListener: listener,
  }).appendTo($("#search"))
}

async function addUrl(full, short) {
  $("#fullUrl").empty();
  $("#shortUrl").empty();
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
