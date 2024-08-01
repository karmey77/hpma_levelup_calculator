// 升級所需卡片數據
const upgradeData = {
    Normal: [1, 2, 3, 5, 8, 12, 20, 30, 45, 70, 100, 140, 190, 250, 320, 410, 510],
    Rare: [0, 0, 1, 2, 3, 5, 8, 10, 12, 18, 25, 35, 50, 70, 95, 125, 160],
    Epic: [0, 0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 10, 13, 16, 20, 25, 30],
    Legendary: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    'Dark&Mythic': [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12]
};

// 升級所需金幣數據
const goldData = [100, 150, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000];

// 各稀有度的起始等級
const rarityStartLevel = {
    Normal: 1,
    Rare: 3,
    Epic: 6,
    Legendary: 9,
    'Dark&Mythic': 9
};

// 更新稀有度圖標
function updateRarityIcon() {
    const select = document.getElementById('rarity');
    const icon = document.getElementById('rarityIcon');
    icon.src = select.options[select.selectedIndex].getAttribute('data-icon');
}

// 計算升級所需資源
function calculateUpgrade() {
    const rarity = document.getElementById('rarity').value;
    let currentLevel = parseInt(document.getElementById('currentLevel').value);
    let targetLevel = parseInt(document.getElementById('targetLevel').value);
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    const minLevel = rarityStartLevel[rarity];
    if (currentLevel < minLevel) {
        currentLevel = minLevel;
        document.getElementById('currentLevel').value = minLevel;
    }

    if (targetLevel <= currentLevel || targetLevel > 18 || currentLevel < 1) {
        errorDiv.textContent = "請輸入有效的等級範圍。 Please enter a valid level range.";
        resultDiv.innerHTML = "";
        return;
    }

    errorDiv.textContent = "";

    const cards = upgradeData[rarity].slice(currentLevel - 1, targetLevel - 1).reduce((a, b) => a + b, 0);
    const gold = goldData.slice(currentLevel - 1, targetLevel - 1).reduce((a, b) => a + b, 0);

    resultDiv.innerHTML = `
        需要 <span>${cards}</span> 張卡與 <span>${gold.toLocaleString()}</span> 金幣<br>
        <span>${cards}</span> card(s) and <span>${gold.toLocaleString()}</span> gold needed
    `;
}

// 調整目標等級
function adjustTargetLevel() {
    const currentLevel = parseInt(document.getElementById('currentLevel').value);
    const targetLevelInput = document.getElementById('targetLevel');
    const newTargetLevel = Math.min(currentLevel + 1, 18);
    targetLevelInput.value = newTargetLevel;
}

// 更新滑塊顯示
function updateSliders() {
    const rarity = document.getElementById('rarity').value;
    const minLevel = rarityStartLevel[rarity];
    const currentLevelSlider = document.getElementById('currentLevel');
    const targetLevelSlider = document.getElementById('targetLevel');
    const currentLevelDisplay = document.getElementById('currentLevelDisplay');
    const targetLevelDisplay = document.getElementById('targetLevelDisplay');

    currentLevelSlider.min = minLevel;
    currentLevelSlider.value = Math.max(currentLevelSlider.value, minLevel);
    targetLevelSlider.min = Math.min(parseInt(currentLevelSlider.value) + 1, 18);
    targetLevelSlider.value = Math.max(targetLevelSlider.value, targetLevelSlider.min);

    currentLevelDisplay.textContent = currentLevelSlider.value;
    targetLevelDisplay.textContent = targetLevelSlider.value;

    calculateUpgrade();
}

// 事件監聽器
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('rarity').addEventListener('change', function () {
        updateRarityIcon();
        updateSliders();
    });

    document.getElementById('currentLevel').addEventListener('input', function () {
        const targetLevelSlider = document.getElementById('targetLevel');
        targetLevelSlider.min = Math.min(parseInt(this.value) + 1, 18);
        if (parseInt(targetLevelSlider.value) < parseInt(targetLevelSlider.min)) {
            targetLevelSlider.value = targetLevelSlider.min;
        }
        updateSliders();
    });

    document.getElementById('targetLevel').addEventListener('input', updateSliders);

    // 初始化
    updateRarityIcon();
    updateSliders();
});