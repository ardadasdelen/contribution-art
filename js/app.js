import { desserts, drinks } from "./menu.js";
import { ProductScene } from "./models.js";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// rastgele seçim (mümkünse art arda aynısını verme)
function pickDifferent(arr, last) {
  if (arr.length < 2) return pick(arr);
  let item;
  do {
    item = pick(arr);
  } while (item.name === last);
  return item;
}

const els = {
  startBtn: document.getElementById("startBtn"),
  dessertCard: document.getElementById("dessertCard"),
  drinkCard: document.getElementById("drinkCard"),
  dessertName: document.getElementById("dessertName"),
  drinkName: document.getElementById("drinkName"),
  result: document.getElementById("result"),
  dessertHistory: document.getElementById("dessertHistory"),
  drinkHistory: document.getElementById("drinkHistory"),
  dessertCount: document.getElementById("dessertCount"),
  drinkCount: document.getElementById("drinkCount"),
  emptyState: document.getElementById("emptyState"),
};

const dessertScene = new ProductScene(document.getElementById("dessertCanvas"));
const drinkScene = new ProductScene(document.getElementById("drinkCanvas"));
dessertScene.start();
drinkScene.start();

const state = {
  lastDessert: null,
  lastDrink: null,
  dessertLog: [], // {name, emoji}
  drinkLog: [],
};

function renderHistory(logEl, log, countEl) {
  countEl.textContent = log.length;
  logEl.innerHTML = "";
  // en yeni en üstte
  [...log].reverse().forEach((entry) => {
    const chip = document.createElement("li");
    chip.className = "chip";
    chip.innerHTML = `<span class="chip-emoji">${entry.emoji}</span><span class="chip-name">${entry.name}</span>`;
    logEl.appendChild(chip);
  });
}

function spin() {
  const dessert = pickDifferent(desserts, state.lastDessert);
  const drink = pickDifferent(drinks, state.lastDrink);
  state.lastDessert = dessert.name;
  state.lastDrink = drink.name;

  dessertScene.setProduct(dessert);
  drinkScene.setProduct(drink);

  els.dessertName.textContent = `${dessert.emoji} ${dessert.name}`;
  els.drinkName.textContent = `${drink.emoji} ${drink.name}`;

  state.dessertLog.push({ name: dessert.name, emoji: dessert.emoji });
  state.drinkLog.push({ name: drink.name, emoji: drink.emoji });
  renderHistory(els.dessertHistory, state.dessertLog, els.dessertCount);
  renderHistory(els.drinkHistory, state.drinkLog, els.drinkCount);

  els.result.classList.add("revealed");
  els.emptyState.classList.add("hidden");

  // kart pop animasyonu
  [els.dessertCard, els.drinkCard].forEach((c) => {
    c.classList.remove("pop");
    // reflow ile yeniden tetikle
    void c.offsetWidth;
    c.classList.add("pop");
  });

  els.startBtn.textContent = "Tekrar Çek 🎲";
}

els.startBtn.addEventListener("click", spin);
