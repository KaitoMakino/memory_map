function updatePinList() {
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    savedPins.sort((a, b) => new Date(a.date) - new Date(b.date));

    let pinList = document.getElementById("pin-list");
    pinList.innerHTML = "";

    savedPins.forEach(pin => {
        let listItem = document.createElement("li");
        listItem.textContent = `${pin.date} - ${pin.title}`;
        listItem.addEventListener("click", () => {
            map.setView([pin.lat, pin.lng], 12);
        });
        pinList.appendChild(listItem);
    });
}

document.getElementById('search-btn').addEventListener('click', function () {
    let searchTag = document.getElementById('search-tag').value.trim();
    if (!searchTag.startsWith("#")) {
        alert("タグは # で始まる形式で入力してください！");
        return;
    }

    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    let filteredPins = savedPins.filter(pin => pin.tags.includes(searchTag));
    map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });
    filteredPins.forEach(pin => addMarkerToMap(pin));
});

document.getElementById('filter-btn').addEventListener('click', function () {
    let selectedCategory = document.getElementById('filter-category').value;
    let savedPins = JSON.parse(localStorage.getItem("pins")) || [];
    let filteredPins = selectedCategory === "all" ? savedPins : savedPins.filter(pin => pin.category === selectedCategory);
    map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });
    filteredPins.forEach(pin => addMarkerToMap(pin));
});
