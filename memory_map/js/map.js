// 地図の初期化（日本の範囲を制限）
var map = L.map('map', {
    maxBounds: [
        [55, 100],  // 北西（最大緯度・最小経度）
        [15, 180]   // 南東（最小緯度・最大経度）
    ],
    maxBoundsViscosity: 1.0,
    worldCopyJump: false
}).setView([35.6895, 139.6917], 5);

// OpenStreetMap タイルレイヤーを追加
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// カテゴリごとのアイコン設定
const categoryIcons = {
    "観光": "blue",
    "食事": "red",
    "宿泊": "green",
    "その他": "gray"
};

// クリックした場所の緯度・経度を格納
var selectedLatLng = null;
var tempMarker = null;

// 地図上に保存済みのピンをロード
window.addEventListener("load", () => {
    loadPins();
    updatePinList();
});

function addMarkerToMap(pin) {
    let iconColor = categoryIcons[pin.category] || "gray";

    let marker = L.marker([pin.lat, pin.lng], {
        icon: L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColor}.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
    }).addTo(map);

    let popupContent = `
        <div style="max-width: 400px; text-align: center; font-size: 1.5em; padding: 15px;">
            <b>${pin.title}</b><br>
            🗂️ カテゴリ: ${pin.category}<br>
            🏷️ タグ: ${pin.tags.join(" ")}<br>
            📅 ${pin.date}<br>
            <p>${pin.comment}</p>
            <button onclick="editPin('${pin.lat}', '${pin.lng}')"
                    style="color: white; background: blue; border: none; padding: 10px; cursor: pointer; margin-top: 15px; font-size: 1.3em; border-radius: 5px;">
                編集
            </button>
            <button onclick="confirmRemovePin('${pin.lat}', '${pin.lng}')"
                    style="color: white; background: red; border: none; padding: 10px; cursor: pointer; margin-top: 15px; font-size: 1.3em; border-radius: 5px;">
                削除
            </button>
        </div>
    `;

    marker.bindPopup(popupContent);
}

// 関数を外部から呼び出せるようにする
window.addMarkerToMap = addMarkerToMap;

