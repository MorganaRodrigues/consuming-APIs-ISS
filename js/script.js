// Criando o mapa e a atribuição
const mapa = L.map("mapa-estacao").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Obrigado pela API, vocês são demais!';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mapa);

// Criando um marcador com um ícone
const issIcon = L.icon({
  iconUrl: "images/estacao-espacial.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mapa);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const {
    latitude,
    longitude,
    altitude,
    velocity,
    visibility,
    footprint,
  } = data;

  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mapa.setView([latitude, longitude], 2);
    firstTime = false;
  }
  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("alt").textContent = altitude;
  document.getElementById("vel").textContent = velocity;
  document.getElementById("vis").textContent = visibility;
  document.getElementById("are").textContent = footprint;
}

getISS();

setInterval(getISS, 1000);
