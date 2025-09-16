// グローバル変数
let cities = [];  // 追加された都市のリスト
let weatherData = {};  // 天気データを保存
let temperatureChart = null;  // グラフインスタンス

// OpenWeatherMap APIのベースURL
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather Dashboard 初期化開始...');
    
    // ローカルストレージから保存された都市を読み込み
    loadSavedCities();
    
    // イベントリスナーの設定
    setupEventListeners();
    
    // デフォルト都市を追加
    addCity('Tokyo');
});
// ローカルストレージから保存された都市を読み込み
function loadSavedCities() {
    const saved = localStorage.getItem('favoriteCities');
    if (saved) {
        const savedCities = JSON.parse(saved);
        savedCities.forEach(city => addCity(city));
        console.log('保存された都市を読み込みました:', savedCities);
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // 都市追加ボタン
    const addBtn = document.getElementById('addCityBtn');
    const input = document.getElementById('cityInput');
    
    addBtn.addEventListener('click', () => {
        const city = input.value.trim();
        if (city) {
            addCity(city);
            input.value = '';  // 入力欄をクリア
        }
    });
    
    // Enterキーでも追加できるように
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });
}

// 都市を追加（修正版）
async function addCity(cityName) {
    // 大文字小文字を無視して重複チェック
    const normalizedName = cityName.toLowerCase();
    const existingCity = cities.find(c => c.toLowerCase() === normalizedName);
    
    if (existingCity) {
        console.log(`${cityName} は既に追加されています`);
        return;
    }
    
    console.log(`${cityName} の天気を取得中...`);
    
    try {
        const response = await fetch(`${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ja`);
        
        if (!response.ok) {
            throw new Error('都市が見つかりません');
        }
        
        const data = await response.json();
        
        // 正式な都市名を使用
        const officialName = data.name;
        
        // 再度チェック（APIから返ってきた正式名で）
        if (!cities.includes(officialName)) {
            cities.push(officialName);
            weatherData[officialName] = data;
            updateUI();
            console.log(`${officialName} の天気データ:`, data);
        }
        
    } catch (error) {
        console.error(`エラー: ${error.message}`);
        alert(`${cityName} の天気を取得できませんでした`);
    }
}
// UI全体を更新
function updateUI() {
    // 天気カードを更新
    updateWeatherCards();
    
    // グラフを更新
    updateChart();
    
    // お気に入りリストを更新
    updateFavoritesList();
    
    // 最終更新時刻
    updateLastUpdateTime();
}

// 天気カードを表示
function updateWeatherCards() {
    const grid = document.getElementById('weatherGrid');
    grid.innerHTML = '';  // 既存のカードをクリア
    
    cities.forEach(city => {
        const data = weatherData[city];
        if (!data) return;
        
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="removeCity('${city}')">×</button>
            <h3>${data.name}</h3>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <div class="description">${data.weather[0].description}</div>
            <div class="weather-details">
                <div><span>体感温度:</span> <strong>${Math.round(data.main.feels_like)}°C</strong></div>
                <div><span>湿度:</span> <strong>${data.main.humidity}%</strong></div>
                <div><span>風速:</span> <strong>${data.wind.speed} m/s</strong></div>
                <div><span>気圧:</span> <strong>${data.main.pressure} hPa</strong></div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// お気に入りリストを更新
function updateFavoritesList() {
    const list = document.getElementById('favoritesList');
    
    if (cities.length === 0) {
        list.innerHTML = '<p class="no-data">お気に入りの都市を追加してください</p>';
        return;
    }
    
    list.innerHTML = cities.map(city => 
        `<span style="margin-right: 10px;">📍 ${city}</span>`
    ).join('');
    
    // ローカルストレージに保存
    localStorage.setItem('favoriteCities', JSON.stringify(cities));
}

// 最終更新時刻を表示
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ja-JP');
    document.getElementById('lastUpdate').textContent = timeString;
}

// 都市を削除
function removeCity(cityName) {
    const index = cities.indexOf(cityName);
    if (index > -1) {
        cities.splice(index, 1);
        delete weatherData[cityName];
        updateUI();
        console.log(`${cityName} を削除しました`);
    }
}

// 気温比較グラフを更新
function updateChart() {
    const canvas = document.getElementById('temperatureChart');
    const ctx = canvas.getContext('2d');
    
    // データがない場合
    if (cities.length === 0) {
        if (temperatureChart) {
            temperatureChart.destroy();
            temperatureChart = null;
        }
        return;
    }
    
    // グラフ用のデータを準備
    const labels = cities;
    const temperatures = cities.map(city => {
        const data = weatherData[city];
        return data ? Math.round(data.main.temp) : 0;
    });
    
    const feelsLike = cities.map(city => {
        const data = weatherData[city];
        return data ? Math.round(data.main.feels_like) : 0;
    });
    
    // 既存のグラフを破棄
    if (temperatureChart) {
        temperatureChart.destroy();
    }
    
    // 新しいグラフを作成
    temperatureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '気温',
                    data: temperatures,
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 2
                },
                {
                    label: '体感温度',
                    data: feelsLike,
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '温度 (°C)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '都市別気温比較'
                }
            }
        }
    });
}

// 5分ごとに自動更新
setInterval(() => {
    console.log('天気データを更新中...');
    cities.forEach(city => {
        // 既存の都市のデータを更新
        fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ja`)
            .then(response => response.json())
            .then(data => {
                weatherData[city] = data;
                updateUI();
            })
            .catch(error => console.error(`${city}の更新エラー:`, error));
    });
}, 5 * 60 * 1000);  // 5分 = 300,000ミリ秒
