function savePin(pin) {
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    savedPins.push(pin);
    localStorage.setItem("pins", JSON.stringify(savedPins));
}

// 関数を外部から呼び出せるようにする
window.savePin = savePin;

function loadPins() {
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    savedPins.forEach(pin => addMarkerToMap(pin));
}

function removePin(lat, lng) {
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    let updatedPins = savedPins.filter(pin => 
        Math.abs(pin.lat - lat) > 0.000001 || Math.abs(pin.lng - lng) > 0.000001
    );

    if (savedPins.length === updatedPins.length) {
        console.warn("削除対象のピンが見つかりません:", lat, lng);
        alert("削除できませんでした。再度お試しください。");
        return;
    }

    // ローカルストレージを更新
    localStorage.setItem("pins", JSON.stringify(updatedPins));

    // マップ上の該当ピンを削除
    let targetMarker = null;
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            let layerLatLng = layer.getLatLng();
            if (Math.abs(layerLatLng.lat - lat) < 0.000001 && Math.abs(layerLatLng.lng - lng) < 0.000001) {
                targetMarker = layer;
            }
        }
    });

    if (targetMarker) {
        map.removeLayer(targetMarker);
        alert("ピンを削除しました！");
    } else {
        alert("マップ上のピンが見つかりませんでした。");
    }

    updatePinList(); // ピンリスト更新
}

// 削除前に確認ダイアログを表示
function confirmRemovePin(lat, lng) {
    if (confirm("本当にこのピンを削除しますか？")) {
        removePin(lat, lng);
    }
}

// 関数を外部から呼び出せるようにする
window.removePin = removePin;
window.confirmRemovePin = confirmRemovePin;

function resetForm() {
    document.getElementById("pin-title").value = "";
    document.getElementById("pin-date").value = "";
    document.getElementById("pin-comment").value = "";
    document.getElementById("pin-tags").value = "";
    selectedLatLng = null;
    pinMode = false;
    togglePinModeBtn.textContent = "ピン追加モード: OFF";
}
