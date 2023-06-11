//? Selector
const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input");
const ekleFormu = document.getElementById("ekle-formu");

const giderinizTd = document.getElementById("gideriniz");
const gelirinizTd = document.getElementById("geliriniz");
const kalanTd = document.getElementById("kalan");

//* harcama formu
const harcamaFormu = document.getElementById("harcama-formu");
const harcamaAlaniInput = document.getElementById("harcama-alani");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");

const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn")
//?Variables
let gelirler = 0;
let harcamaList = [];

//? events

ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);

  localStorage.setItem("gelirler", gelirler);

  ekleFormu.reset();

  hesaplaVeGuncelle();
});

window.addEventListener("load", () => {
  gelirler = localStorage.getItem("gelirler");

  harcamaList = JSON.parse(localStorage.getItem("harcamalar")) || [];
  harcamaList.forEach((h) => harcamayiDomaYaz(h));

  tarihInput.valueAsDate = new Date();

  hesaplaVeGuncelle();
});

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();

  const yeniHarcama = {
    id: new Date().getTime(),
    tarih: tarihInput.value,
    alan: harcamaAlaniInput.value,
    miktar: miktarInput.value,
  };
  harcamaList.push(yeniHarcama);

  localStorage.setItem("harcamalar", JSON.stringify(harcamaList));
  harcamayiDomaYaz(yeniHarcama);
  hesaplaVeGuncelle();

  console.log(harcamaList);
  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
});

//? Functions
const hesaplaVeGuncelle = () => {
  const giderler = harcamaList.reduce(
    (toplam, harcama) => toplam + Number(harcama.miktar),
    0
  );
  gelirinizTd.innerText = gelirler;

  giderinizTd.innerText = giderler;
  kalanTd.innerText = gelirler - giderler;
};

const harcamayiDomaYaz = ({ id, tarih, alan, miktar }) => {
  harcamaBody.innerHTML += ` <tr>
    <td>${tarih}</td>
    <td>${alan}</td>
    <td>${miktar}</td>
    <td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
  </tr>`;
};

harcamaBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    e.target.parentElement.parentElement.remove();
    const id = e.target.id;
    console.log(id);
    harcamaList = harcamaList.filter((harcama) => harcama.id != id);
    localStorage.setItem("harcamalar", JSON.stringify(harcamaList));
    hesaplaVeGuncelle()
  }
});

temizleBtn.addEventListener("click", ()=> {
  localStorage.clear()
  gelirler=0
  harcamaList=[]
  harcamaBody.innerHTML=""
  hesaplaVeGuncelle()
})
