function initAddProd() {
  $("#file-input")[0].addEventListener("change", previewImages);
  //   alert("us");
}

function previewImages() {
  //   alert("me");
  var preview = document.querySelector("#preview");
  $("#preview").children("img").remove();
  //   this.files = Array.prototype.slice.call(this.files, 0, 5);
  //   debugger;
  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {
    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return alert(file.name + " is not an image");
    } // else...

    var reader = new FileReader();

    reader.addEventListener("load", function () {
      var image = new Image();
      image.title = file.name;
      image.src = this.result;
      preview.appendChild(image);
    });

    reader.readAsDataURL(file);
  }
}

// function we(values){
//     Array.from(values.options).forEach(each=>{
//         console.log(each.value, each.selected)
//     })
// }