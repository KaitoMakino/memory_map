const pinForm = document.getElementById("pin-form");
const confirmPinBtn = document.getElementById("confirm-pin-btn");
const cancelPinBtn = document.getElementById("cancel-pin-btn");

// ピン情報入力フォームを画面中央に表示
function showPinForm() {
    pinForm.style.display = "block";
    pinForm.style.position = "fixed";
    pinForm.style.top = "50%";
    pinForm.style.left = "50%";
    pinForm.style.transform = "translate(-50%, -50%)";
    pinForm.style.zIndex = "1000";
}

// ピンの確定処理
confirmPinBtn.addEventListener("click", function () {
    if (!selectedLatLng) {
        alert("ピンの位置を選択してください！");
        return;
    }

    let title = document.getElementById("pin-title").value;
    let date = document.getElementById("pin-date").value;
    let comment = document.getElementById("pin-comment").value;
    let category = document.getElementById("pin-category").value;
    let tags = document.getElementById("pin-tags").value.split(" ").map(tag => tag.trim()).filter(tag => tag.startsWith("#"));

    if (!title || !date || !comment) {
        alert("すべての情報を入力してください！");
        return;
    }

    let pinData = { lat: selectedLatLng.lat, lng: selectedLatLng.lng, title, date, comment, category, tags };
    savePin(pinData);
    addMarkerToMap(pinData);

    // フォームをリセットして非表示に
    pinForm.style.display = "none";
    resetForm();
});

// キャンセルボタンを押すとピンを削除
cancelPinBtn.addEventListener("click", function () {
    removeTemporaryMarker();
    pinForm.style.display = "none";
    resetForm();
});
