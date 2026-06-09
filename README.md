# Kafe Menü Çarkı 🎯

Türkiye'deki kafelerde bulunan **tatlı** ve **içecekleri** rastgele eşleştiren,
yeni nesil **animasyonlu 3B modellerle** desteklenen tek ekranlı bir menü seçme
uygulaması.

## Özellikler

- **Tek ekran + Başla tuşu** — tek tıkla bir tatlı ve bir içecek çekilir.
- **Animasyonlu 3B modeller** — her ürün, [Three.js](https://threejs.org/) ile
  prosedürel olarak oluşturulan, dönen ve süzülen 3B model olarak gösterilir
  (kek dilimi, künefe tepsisi, çay bardağı, kupa, uzun bardak, külah vb.).
- **Tüm Ürünler · Çekilenler** — Başla tuşunun altında, o ana kadar çekilen tüm
  tatlı ve içeceklerin listesi ve sayaçları tutulur.
- Mobil uyumlu, akıcı geçiş animasyonları.

## Çalıştırma

Statik bir uygulamadır; basit bir HTTP sunucusu yeterlidir (ES modülleri ve
importmap kullanıldığı için `file://` ile değil sunucu üzerinden açın):

```bash
python -m http.server 8000
# tarayıcıda: http://localhost:8000
```

## Yapı

| Dosya            | Açıklama                                              |
| ---------------- | ---------------------------------------------------- |
| `index.html`     | Tek ekran arayüz ve Three.js importmap'i             |
| `css/styles.css` | Tema, kartlar, animasyonlar                          |
| `js/menu.js`     | Tatlı/içecek verisi (3B model şekli + renkler dahil) |
| `js/models.js`   | Prosedürel 3B model üreticileri ve sahne yöneticisi  |
| `js/app.js`      | Rastgele seçim mantığı ve geçmiş listesi             |

Menüyü genişletmek için `js/menu.js` içindeki `desserts` / `drinks` dizilerine
yeni ürün eklemeniz yeterli (`shape` alanı mevcut 3B model tiplerinden biri
olmalı).
