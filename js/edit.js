const editModal = document.getElementById("edit-modal");
const saveEditBtn = document.getElementById("save-edit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

let editingPinIndex = null; // 編集中のピンのインデックス

// ピン編集モーダルを開く
function editPin(lat, lng) {
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    let pinIndex = savedPins.findIndex(p => p.lat == lat && p.lng == lng);
    if (pinIndex === -1) return;

    editingPinIndex = pinIndex; // 編集中のピンのインデックスを保存
    let pin = savedPins[pinIndex];

    // フォームに現在の情報を設定
    document.getElementById("edit-title").value = pin.title;
    document.getElementById("edit-date").value = pin.date;
    document.getElementById("edit-comment").value = pin.comment;
    document.getElementById("edit-category").value = pin.category;
    document.getElementById("edit-tags").value = pin.tags.join(" ");

    // 画像プレビューを表示
    let previewContainer = document.getElementById("edit-photo-preview");
    previewContainer.innerHTML = "";
    if (pin.photos && pin.photos.length > 0) {
        pin.photos.forEach(photo => {
            let img = document.createElement("img");
            img.src = photo;
            img.style.maxWidth = "100px";
            img.style.margin = "5px";
            previewContainer.appendChild(img);
        });
    }

    // モーダルを表示
    editModal.style.display = "block";
}

// 編集内容を保存
saveEditBtn.addEventListener("click", function () {
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    if (editingPinIndex === null) return;

    let pin = savedPins[editingPinIndex];

    // 入力フォームの値を取得
    pin.title = document.getElementById("edit-title").value;
    pin.date = document.getElementById("edit-date").value;
    pin.comment = document.getElementById("edit-comment").value;
    pin.category = document.getElementById("edit-category").value;
    pin.tags = document.getElementById("edit-tags").value.split(" ").map(tag => tag.trim()).filter(tag => tag.startsWith("#"));

    // 画像変更処理
    let photoInput = document.getElementById("edit-photo");
    let files = photoInput.files;
    let newPhotos = [];

    let loadedFiles = 0;
    if (files.length > 0) {
        for (let file of files) {
            let reader = new FileReader();
            reader.onload = function(e) {
                newPhotos.push(e.target.result);
                loadedFiles++;
                if (loadedFiles === files.length) {
                    pin.photos = newPhotos;
                    finalizeEdit(savedPins);
                }
            };
            reader.readAsDataURL(file);
        }
    } else {
        finalizeEdit(savedPins);
    }
});

// 編集内容をローカルストレージに保存
function finalizeEdit(savedPins) {
    localStorage.setItem("pins", JSON.stringify(savedPins));
    alert("ピン情報が更新されました！");

    // モーダルを閉じる
    editModal.style.display = "none";
    editingPinIndex = null;

    // 地図のピンをリロード
    reloadPins();
}

// 編集キャンセル
cancelEditBtn.addEventListener("click", function () {
    editModal.style.display = "none";
    editingPinIndex = null;
});

// 関数を外部から呼び出せるようにする
window.editPin = editPin;
