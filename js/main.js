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
  $('<input/>', {
    class: 'form-control',
    name: 'searchTerm',
    type: 'text',
    id: 'searchTerm',
    placeholder: 'What are you looking for?',
    addEventListener: addEventListener('keyup', function (e) {
      let searchTerm = $("#searchTerm").val();
      if (e.keyCode == 13) {
        addUrl(searchTerm);
      }
    }),
  }).appendTo($("#search"))
}

async function addUrl(full, short) {
  $("#searchTerm").empty();
  if(!full) return;
  if(!full.includes('http')) return;
  await db.collection('urls').add({ full, short: short ?? getShortId(), clicks: 0})
  draw();
}

function removeUrl(id) {
  db.collection('urls').doc(id).delete();
}

function getShortId(){
  return Math.random().toString(36).substring(7);
}

function copy(short) {
  navigator.clipboard.writeText(`${this.location.origin}/${short}`)
}
