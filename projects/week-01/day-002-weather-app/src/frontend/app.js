console.log('app.js loaded!');
// APIキーとベースURL
const API_KEY = 'a7bfc538a6b829a0585585ec78228a5f'; // ここにあなたのAPIキーを入力
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM要素の取得
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');

// 検索ボタンのクリックイベント
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// Enterキーでも検索できるように
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// 天気データを取得する非同期関数
async function getWeatherData(city) {
    try {
        // エラーメッセージを隠す
        errorMessage.classList.add('hidden');
        
        // APIにリクエストを送信
        const url = `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;
        console.log('APIリクエスト送信中...');
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`都市が見つかりません: ${city}`);
        }
        
        const data = await response.json();
        console.log('取得したデータ:', data);
        
        // データを表示
        displayWeatherData(data);
        
    } catch (error) {
        console.error('エラー:', error);
        showError(error.message);
    }
}

// 天気データを画面に表示
function displayWeatherData(data) {
    // 都市名
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    
    // 温度（小数点第1位まで）
    document.getElementById('temp').textContent = Math.round(data.main.temp * 10) / 10;
    
    // 天気の説明
    document.getElementById('weatherDesc').textContent = data.weather[0].description;
    
    // 詳細情報
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like * 10) / 10;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = data.wind.speed;
    
    // 結果を表示
    weatherResult.classList.remove('hidden');
}

// エラーメッセージを表示
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherResult.classList.add('hidden');
}

// ページ読み込み時のデフォルト検索
window.addEventListener('DOMContentLoaded', () => {
    // デフォルトでTokyoの天気を表示
    getWeatherData('Tokyo');
});