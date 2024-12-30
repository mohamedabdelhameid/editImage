let upload = document.getElementById("UploadFile");
let img = document.getElementById("image");
// let blurs = document.getElementById("Blur");
let grayscale = document.getElementById("Grayscale");
let opacity = document.getElementById("Opacity");
let sepia = document.getElementById("Sepia");
let hueRotate = document.getElementById("HueRotate");
let contrast = document.getElementById("Contrast");
let brightness = document.getElementById("Brightness");
let saturate = document.getElementById("Saturate");
let btnDownload = document.getElementById("Download");
let reset = document.getElementById("RESET");
let filters = document.querySelectorAll("ul li input");

window.onload = function () {
  btnDownload.style.display = "none";
  reset.style.display = "none";
  img.style.display = "none";
};

function resets(){
  // blurs.value = 0;
  grayscale.value = 0;
  sepia.value = 0;
  hueRotate.value = 0;
  contrast.value = 100;
  brightness.value = 100;
  saturate.value = 100;
  opacity.value = 100;
  img.style.filter = `
      blur(0px)
      grayscale(${grayscale.value})
      opacity(${opacity.value}%)
      sepia(${sepia.value}%)
      hue-rotate(${hueRotate.value}deg)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      saturate(${saturate.value}%)
    `;
}

upload.onchange = function () {
  resets();
  btnDownload.style.display = "block";
  reset.style.display = "block";
  img.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
};

filters.forEach(filter => {
  filter.addEventListener('input', function () {
    img.style.filter = `
      blur(0px)
      grayscale(${grayscale.value})
      opacity(${opacity.value}%)
      sepia(${sepia.value}%)
      hue-rotate(${hueRotate.value}deg)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      saturate(${saturate.value}%)
    `;
  });
});

btnDownload.onclick = function () {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };