const togglePinModeBtn = document.getElementById("toggle-pin-mode-btn");
var pinMode = false;
var tempMarker = null;

// ピン追加モードの切り替え
togglePinModeBtn.addEventListener("click", function () {
    pinMode = !pinMode;
    togglePinModeBtn.textContent = "ピン追加モード: " + (pinMode ? "ON" : "OFF");

    if (!pinMode) {
        removeTemporaryMarker();
    }
});

// マウス移動時に仮のピンを表示
map.on("mousemove", function (e) {
    if (!pinMode) return;

    if (!tempMarker) {
        tempMarker = L.marker(e.latlng, { opacity: 0.5 }).addTo(map);
    } else {
        tempMarker.setLatLng(e.latlng);
    }
});

// 地図をクリックするとピンが固定され、情報入力画面を表示
map.on("click", function (e) {
    if (!pinMode) return;

    selectedLatLng = e.latlng;

    if (tempMarker) {
        tempMarker.setLatLng(e.latlng);
        tempMarker.setOpacity(1.0);
        pinMode = false;
        togglePinModeBtn.textContent = "ピン追加モード: OFF";
    }

    showPinForm();
});

// 仮のピンを削除する関数
function removeTemporaryMarker() {
    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }
}
