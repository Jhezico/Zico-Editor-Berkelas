const fileInput = document.querySelector('.file-input'),
  filterOptions = document.querySelectorAll('.filter button'),
  filterName = document.querySelector('.filter-info .name'),
  filterValue = document.querySelector('.filter-info .value'),
  filterSlider = document.querySelector('.slider input'),
  rotasiOptions = document.querySelectorAll('.rotasi button'),
  previewImg = document.querySelector('.preview-img img'),
  resetFilterBtn = document.querySelector('.reset-filter'),
  pilihGambarBtn = document.querySelector('.pilih-gambar'),
  simpanGambarBtn = document.querySelector('.simpan-gambar');

let kecerahan = 100, saturasi = 100, inversi = 0, grayscale = 0;
let rotasi = 0, flipHorizontal = 1, flipVertikal = 1;

const applyFilter = () => {
  previewImg.style.transform = `rotate(${rotasi}deg) scale(${flipHorizontal}, ${flipVertikal})`;
  previewImg.style.filter = `brightness(${kecerahan}%) saturate(${saturasi}%) invert(${inversi}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
  let file = fileInput.files[0]; // Mendapat file pilihan user
  if (!file) return; // Return jika user belum memilih file
  previewImg.src = URL.createObjectURL(file) // Memasukkan URL file ke dalam web
  previewImg.addEventListener('load', () => {
    resetFilterBtn.click();
    document.querySelector('.container').classList.remove('disable');
  });
}

filterOptions.forEach(option => { // Membuat perubahan Background Color saat di click
  option.addEventListener('click', () => {
    document.querySelector('.filter .active').classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;

    if (option.id === "kecerahan") {
      filterSlider.max = "200";
      filterSlider.value = kecerahan;
      filterValue.innerText = `${kecerahan}%`;
    } else if (option.id === "saturasi") {
      filterSlider.max = "200";
      filterSlider.value = saturasi;
      filterValue.innerText = `${saturasi}%`;
    } else if (option.id === "inversi") {
      filterSlider.max = "100";
      filterSlider.value = inversi;
      filterValue.innerText = `${inversi}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  // menangkap nilai filter yang dipilih
  const selectedFilter = document.querySelector('.filter .active');

  if (selectedFilter.id === "kecerahan") {
    kecerahan = filterSlider.value;
  } else if (selectedFilter.id === "saturasi") {
    saturasi = filterSlider.value;
  } else if (selectedFilter.id === "inversi") {
    inversi = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilter();
}

rotasiOptions.forEach(option => {
  option.addEventListener('click', () => { // Membuat perubahan rotasi saat di click
    if (option.id === "kiri") {
      rotasi -= 90;
    } else if (option.id === "kanan") {
      rotasi += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1
    } else {
      flipVertikal = flipVertikal === 1 ? -1 : 1
    }
    applyFilter();
  });
});

const resetFilter = () => {
  kecerahan = 100; saturasi = 100; inversi = 0; grayscale = 0;
  rotasi = 0; flipHorizontal = 1; flipVertikal = 1;
  filterOptions[0].click()
  applyFilter();
};

const simpanGambar = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${kecerahan}%) saturate(${saturasi}%) invert(${inversi}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotasi !== 0) {
    ctx.rotate(rotasi * Math.PI / 180);
  }
  ctx.scale(flipHorizontal, flipVertikal);
  ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  const link = document.createElement("a");
  link.download = "ZicoEditorBerkelas.jpg";
  link.href = canvas.toDataURL();
  link.click();
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);
simpanGambarBtn.addEventListener('click', simpanGambar);
pilihGambarBtn.addEventListener('click', () => fileInput.click());