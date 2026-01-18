import json
import urllib.request
from datetime import datetime, timezone, timedelta
import os

API_KEY = os.environ.get('FINNHUB_API_KEY', 'demo')

def fetch_quote(symbol):
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={API_KEY}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
        if data.get('c') and data['c'] > 0:
            return {"price": data['c'], "change": data.get('d', 0), "changePercent": data.get('dp', 0), "high": data.get('h', data['c']), "low": data.get('l', data['c'])}
    except Exception as e:
        print(f"Error {symbol}: {e}")
    return None

def fetch_forex(base):
    url = f"https://finnhub.io/api/v1/forex/rates?base={base}&token={API_KEY}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Error forex {base}: {e}")
    return None

def lambda_handler(event, context):
    headers = {"Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}
    
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}
    
    results = []
    
    # US Index ETFs
    us_idx = [("SPY", "S&P500"), ("DIA", "NYDow"), ("QQQ", "NASDAQ100"), ("IWM", "Russell2000"), ("VIX", "VIX")]
    for symbol, name in us_idx:
        data = fetch_quote(symbol)
        if data:
            results.append({"symbol": symbol, "name": name, "category": "US Index", "price": round(data["price"], 2), "change": round(data.get("change", 0), 2), "changePercent": round(data.get("changePercent", 0), 2), "high": round(data.get("high", 0), 2), "low": round(data.get("low", 0), 2)})
    
    # Japan Index ETFs (US listed)
    jp_idx = [("EWJ", "Japan ETF"), ("DXJ", "Japan Hedge")]
    for symbol, name in jp_idx:
        data = fetch_quote(symbol)
        if data:
            results.append({"symbol": symbol, "name": name, "category": "Japan Index", "price": round(data["price"], 2), "change": round(data.get("change", 0), 2), "changePercent": round(data.get("changePercent", 0), 2), "high": round(data.get("high", 0), 2), "low": round(data.get("low", 0), 2)})
    
    # Europe/Asia Index ETFs
    world_idx = [("EFA", "EAFE"), ("VGK", "Europe"), ("FXI", "China"), ("EEM", "Emerging")]
    for symbol, name in world_idx:
        data = fetch_quote(symbol)
        if data:
            results.append({"symbol": symbol, "name": name, "category": "World Index", "price": round(data["price"], 2), "change": round(data.get("change", 0), 2), "changePercent": round(data.get("changePercent", 0), 2), "high": round(data.get("high", 0), 2), "low": round(data.get("low", 0), 2)})
    
    # Commodities ETFs
    commod = [("GLD", "Gold"), ("SLV", "Silver"), ("USO", "Oil"), ("UNG", "NatGas")]
    for symbol, name in commod:
        data = fetch_quote(symbol)
        if data:
            results.append({"symbol": symbol, "name": name, "category": "Commodity", "price": round(data["price"], 2), "change": round(data.get("change", 0), 2), "changePercent": round(data.get("changePercent", 0), 2), "high": round(data.get("high", 0), 2), "low": round(data.get("low", 0), 2)})
    
    # Forex
    fx = fetch_forex("USD")
    if fx and fx.get("quote"):
        for to, name in [("JPY", "USD/JPY"), ("EUR", "USD/EUR"), ("GBP", "USD/GBP"), ("CNY", "USD/CNY")]:
            if to in fx["quote"]:
                results.append({"symbol": name, "name": name, "category": "FX", "price": round(fx["quote"][to], 3), "change": 0, "changePercent": 0, "high": 0, "low": 0})
    
    # Crypto
    crypto = [("BINANCE:BTCUSDT", "Bitcoin"), ("BINANCE:ETHUSDT", "Ethereum")]
    for symbol, name in crypto:
        data = fetch_quote(symbol)
        if data:
            results.append({"symbol": name, "name": name, "category": "Crypto", "price": round(data["price"], 2), "change": round(data.get("change", 0), 2), "changePercent": round(data.get("changePercent", 0), 2), "high": round(data.get("high", 0), 2), "low": round(data.get("low", 0), 2)})
    
    # Bond ETFs
    bond = [("TLT", "US20Y Bond"), ("IEF", "US7-10Y Bond")]
    for symbol, name in bond:
        data = fetch_quote(symbol)
        if data:
            results.append({"symbol": symbol, "name": name, "category": "Bond", "price": round(data["price"], 2), "change": round(data.get("change", 0), 2), "changePercent": round(data.get("changePercent", 0), 2), "high": round(data.get("high", 0), 2), "low": round(data.get("low", 0), 2)})
    
    jst = timezone(timedelta(hours=9))
    timestamp = datetime.now(jst).strftime('%Y-%m-%d %H:%M:%S JST')
    
    return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True, "timestamp": timestamp, "count": len(results), "data": results})}