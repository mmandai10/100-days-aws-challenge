import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

// 選挙区データ
const districts = [
  { id: 1, name: "1区", areas: "中区・磯子区・金沢区", prediction: "中道", intensity: "接戦", analysis: "前回立憲の篠原氏が勝利。中道改革連合として組織力強化。" },
  { id: 2, name: "2区", areas: "西区・南区・港南区", prediction: "自民", intensity: "接戦", analysis: "菅義偉元首相の引退を受けた選挙区。後継の新田氏が組織を引き継ぐ。" },
  { id: 3, name: "3区", areas: "鶴見区・神奈川区", prediction: "自民", intensity: "やや自民", analysis: "中西氏が地盤を固める。現職の優位は揺るがない見通し。" },
  { id: 4, name: "4区", areas: "栄区・鎌倉市・逗子市", prediction: "中道", intensity: "激戦", analysis: "前回勝利の早稲田氏が優位。三つ巴で票が分散する可能性。" },
  { id: 5, name: "5区", areas: "戸塚区・泉区", prediction: "中道", intensity: "接戦", analysis: "前回は山崎氏が勝利。都市部での自民逆風が続く。" },
  { id: 6, name: "6区", areas: "保土ケ谷区・旭区", prediction: "中道", intensity: "一騎打ち", analysis: "与野党一騎打ち。前回勝利の青柳氏が組織力を活かし優位。" },
  { id: 7, name: "7区", areas: "港北区", prediction: "中道", intensity: "一騎打ち", analysis: "与野党一騎打ち。前回は中谷氏が勝利。無党派層の動向が鍵。" },
  { id: 8, name: "8区", areas: "緑区・青葉区", prediction: "中道", intensity: "一騎打ち", analysis: "与野党一騎打ち。江田氏は8回当選のベテラン。" },
  { id: 9, name: "9区", areas: "川崎市多摩区・麻生区", prediction: "中道", intensity: "接戦", analysis: "前回勝利の笠氏が優位。維新が票を分ける可能性。" },
  { id: 10, name: "10区", areas: "川崎市川崎区・幸区", prediction: "自民", intensity: "与党対決", analysis: "自民vs維新の与党対決。9回当選の田中氏が経験で上回る。" },
  { id: 11, name: "11区", areas: "横須賀市・三浦市", prediction: "自民", intensity: "自民優勢", analysis: "小泉進次郎氏の牙城。知名度・地盤ともに圧倒的。" },
  { id: 12, name: "12区", areas: "藤沢市・高座郡", prediction: "中道", intensity: "接戦", analysis: "9回当選の阿部氏がやや優位。" },
  { id: 13, name: "13区", areas: "瀬谷区・大和市・綾瀬市", prediction: "中道", intensity: "接戦", analysis: "甘利氏の地盤継承者vs太氏。太氏は組織戦で優位。" },
  { id: 14, name: "14区", areas: "相模原市緑区・中央区", prediction: "自民", intensity: "接戦", analysis: "赤間氏がやや優位だが、中道・長友氏との接戦。" },
  { id: 15, name: "15区", areas: "平塚市・茅ヶ崎市", prediction: "自民", intensity: "自民優勢", analysis: "河野太郎氏の強固な地盤。安定した戦い。" },
  { id: 16, name: "16区", areas: "相模原市南区・座間市", prediction: "中道", intensity: "一騎打ち", analysis: "与野党一騎打ち。前回勝利の後藤氏が優位。" },
  { id: 17, name: "17区", areas: "小田原市・秦野市", prediction: "自民", intensity: "接戦", analysis: "牧島氏がやや優位。デジタル大臣経験を活かす。" },
  { id: 18, name: "18区", areas: "川崎市中原区・高津区", prediction: "中道", intensity: "激戦", analysis: "最多6人が出馬する激戦区。前回勝利の宗野氏がやや優位。" },
  { id: 19, name: "19区", areas: "宮前区・都筑区", prediction: "中道", intensity: "中道優勢", analysis: "旧公明党の古屋氏が中道改革連合から出馬。組織力で優位。" },
  { id: 20, name: "20区", areas: "厚木市・海老名市・伊勢原市", prediction: "中道", intensity: "接戦", analysis: "新設区。前回勝利の大塚氏が地盤を固める。" },
];

// 比例代表データ
const proportionalData = [
  { party: "自民", fullName: "自由民主党", seats: 8, color: "#E53935" },
  { party: "中道", fullName: "中道改革連合", seats: 4, color: "#1E88E5" },
  { party: "維新", fullName: "日本維新の会", seats: 2, color: "#43A047" },
  { party: "国民", fullName: "国民民主党", seats: 2, color: "#FB8C00" },
  { party: "みらい", fullName: "チームみらい", seats: 2, color: "#00ACC1" },
  { party: "共産", fullName: "日本共産党", seats: 1, color: "#C62828" },
  { party: "れいわ", fullName: "れいわ新選組", seats: 1, color: "#EC407A" },
  { party: "参政", fullName: "参政党", seats: 1, color: "#FF7043" },
  { party: "保守", fullName: "日本保守党", seats: 1, color: "#5D4037" },
  { party: "減税", fullName: "減税日本", seats: 1, color: "#7B1FA2" },
];

// 比例当選予測（惜敗率付き）
const electedCandidates = [
  // 自民党（8議席）- 神奈川関連の惜敗復活
  { party: "自民", name: "坂井学", district: "神奈川5区", type: "惜敗復活", sekihaiRate: 92.5, color: "#E53935" },
  { party: "自民", name: "古川直季", district: "神奈川6区", type: "惜敗復活", sekihaiRate: 91.8, color: "#E53935" },
  { party: "自民", name: "鈴木馨祐", district: "神奈川7区", type: "惜敗復活", sekihaiRate: 90.2, color: "#E53935" },
  { party: "自民", name: "三谷英弘", district: "神奈川8区", type: "惜敗復活", sekihaiRate: 88.5, color: "#E53935" },
  { party: "自民", name: "星野剛士", district: "神奈川12区", type: "惜敗復活", sekihaiRate: 87.3, color: "#E53935" },
  { party: "自民", name: "丸田康一郎", district: "神奈川13区", type: "惜敗復活", sekihaiRate: 86.1, color: "#E53935" },
  { party: "自民", name: "山際大志郎", district: "神奈川18区", type: "惜敗復活", sekihaiRate: 84.7, color: "#E53935" },
  { party: "自民", name: "金沢結衣", district: "神奈川20区", type: "惜敗復活", sekihaiRate: 83.2, color: "#E53935" },
  // 中道改革連合（4議席）
  { party: "中道", name: "角田秀穂", district: "比例単独", type: "単独1位", sekihaiRate: null, color: "#1E88E5" },
  { party: "中道", name: "沼崎満子", district: "比例単独", type: "単独2位", sekihaiRate: null, color: "#1E88E5" },
  { party: "中道", name: "原田直樹", district: "比例単独", type: "単独3位", sekihaiRate: null, color: "#1E88E5" },
  { party: "中道", name: "長友克洋", district: "神奈川14区", type: "惜敗復活", sekihaiRate: 91.5, color: "#1E88E5" },
  // 維新（2議席）
  { party: "維新", name: "鈴木敦", district: "神奈川10区", type: "惜敗復活", sekihaiRate: 78.5, color: "#43A047" },
  { party: "維新", name: "藤巻健太", district: "神奈川14区", type: "惜敗復活", sekihaiRate: 65.2, color: "#43A047" },
  // 国民（2議席）
  { party: "国民", name: "浅尾慶一郎", district: "神奈川4区", type: "惜敗復活", sekihaiRate: 72.3, color: "#FB8C00" },
  { party: "国民", name: "杉村康之", district: "神奈川19区", type: "惜敗復活", sekihaiRate: 58.4, color: "#FB8C00" },
  // その他（各1議席）
  { party: "みらい", name: "竹田恒泰", district: "比例単独", type: "単独1位", sekihaiRate: null, color: "#00ACC1" },
  { party: "みらい", name: "宮崎政久", district: "比例単独", type: "単独2位", sekihaiRate: null, color: "#00ACC1" },
  { party: "共産", name: "斉藤和子", district: "比例単独", type: "単独1位", sekihaiRate: null, color: "#C62828" },
  { party: "れいわ", name: "三好りょう", district: "神奈川15区", type: "惜敗復活", sekihaiRate: 35.2, color: "#EC407A" },
  { party: "参政", name: "神谷宗幣", district: "比例単独", type: "単独1位", sekihaiRate: null, color: "#FF7043" },
  { party: "保守", name: "小坂英二", district: "比例単独", type: "単独1位", sekihaiRate: null, color: "#5D4037" },
  { party: "減税", name: "原口一博", district: "比例単独", type: "単独1位", sekihaiRate: null, color: "#7B1FA2" },
];

// 神奈川関連の比例当選者のみ抽出
const kanagawaElected = electedCandidates.filter(c => c.district.includes('神奈川'));

// 小選挙区予測集計
const jiminSeats = districts.filter(d => d.prediction === '自民').length;
const chudoSeats = districts.filter(d => d.prediction === '中道').length;
const totalSeats = 20;

export default function KanagawaElectionForecast() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllElected, setShowAllElected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-900 py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-300 text-xs mb-1">2026年2月8日投開票</p>
          <h1 className="text-xl font-bold">神奈川県 衆議院選挙 AI予測</h1>
          <p className="text-gray-300 text-sm mt-1">小選挙区20区 + 南関東比例代表23議席</p>
        </div>
      </header>

      {/* タブ */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex">
          {[
            { key: 'overview', label: '概要' },
            { key: 'districts', label: '小選挙区' },
            { key: 'proportional', label: '比例代表' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4">
        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* サマリー */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-xs">小選挙区予測</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-red-500">{jiminSeats}</span>
                  <span className="text-xs text-gray-500">自民</span>
                  <span className="text-gray-500 mx-1">:</span>
                  <span className="text-2xl font-bold text-blue-500">{chudoSeats}</span>
                  <span className="text-xs text-gray-500">中道</span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-xs">比例南関東</p>
                <p className="text-2xl font-bold mt-1">23<span className="text-sm text-gray-500">議席</span></p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-xs">接戦区数</p>
                <p className="text-2xl font-bold mt-1 text-yellow-500">
                  {districts.filter(d => d.intensity === '接戦' || d.intensity === '激戦').length}
                </p>
              </div>
            </div>

            {/* 議席バー */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-sm font-bold mb-3">小選挙区 議席予測</h2>
              <div className="flex h-8 rounded overflow-hidden">
                <div 
                  className="bg-red-600 flex items-center justify-center text-sm font-medium"
                  style={{ width: `${(jiminSeats / totalSeats) * 100}%` }}
                >
                  自民 {jiminSeats}
                </div>
                <div 
                  className="bg-blue-600 flex items-center justify-center text-sm font-medium"
                  style={{ width: `${(chudoSeats / totalSeats) * 100}%` }}
                >
                  中道 {chudoSeats}
                </div>
              </div>
            </div>

            {/* 選挙区グリッド */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-sm font-bold mb-3">選挙区マップ（タップで詳細）</h2>
              <div className="grid grid-cols-5 gap-2">
                {districts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    className={`p-2 rounded text-center transition-all hover:scale-105 ${
                      d.prediction === '自民' ? 'bg-red-900 hover:bg-red-800' :
                      'bg-blue-900 hover:bg-blue-800'
                    } ${selectedDistrict?.id === d.id ? 'ring-2 ring-white' : ''}`}
                  >
                    <p className="font-bold text-sm">{d.id}</p>
                    <p className="text-xs text-gray-300">{d.prediction}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-3 justify-center text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-600 rounded"></span> 自民
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-600 rounded"></span> 中道
                </span>
              </div>
            </div>

            {/* 選択した選挙区の詳細 */}
            {selectedDistrict && (
              <div className="bg-gray-800 rounded-lg p-4 border border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">神奈川{selectedDistrict.name}</h3>
                    <p className="text-gray-400 text-sm">{selectedDistrict.areas}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedDistrict(null)}
                    className="text-gray-500 hover:text-white text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedDistrict.prediction === '自民' ? 'bg-red-900' : 'bg-blue-900'
                  }`}>
                    予測: {selectedDistrict.prediction}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedDistrict.intensity === '激戦' ? 'bg-yellow-800' :
                    selectedDistrict.intensity === '接戦' ? 'bg-orange-800' :
                    'bg-gray-700'
                  }`}>
                    {selectedDistrict.intensity}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-3">{selectedDistrict.analysis}</p>
              </div>
            )}
          </div>
        )}

        {/* 小選挙区タブ */}
        {activeTab === 'districts' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold">全20小選挙区 予測一覧</h2>
            <div className="grid grid-cols-1 gap-2">
              {districts.map((d) => (
                <div key={d.id} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{d.id}区</span>
                        <span className="text-xs text-gray-400">{d.areas}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{d.analysis}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        d.prediction === '自民' ? 'bg-red-600' : 'bg-blue-600'
                      }`}>
                        {d.prediction}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        d.intensity === '激戦' ? 'bg-yellow-700' :
                        d.intensity === '接戦' ? 'bg-orange-700' :
                        'bg-gray-700'
                      }`}>
                        {d.intensity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 比例代表タブ */}
        {activeTab === 'proportional' && (
          <div className="space-y-4">
            {/* 議席予測サマリー */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-sm font-bold mb-1">南関東ブロック 比例代表</h2>
              <p className="text-xs text-gray-400 mb-4">神奈川・千葉・山梨 | 全23議席</p>
              
              {/* 議席バー */}
              <div className="flex h-8 rounded overflow-hidden mb-4">
                {proportionalData.map((p) => (
                  <div
                    key={p.party}
                    className="flex items-center justify-center text-xs font-medium min-w-0"
                    style={{ 
                      width: `${(p.seats / 23) * 100}%`,
                      backgroundColor: p.color 
                    }}
                  >
                    {p.seats >= 2 ? p.seats : ''}
                  </div>
                ))}
              </div>

              {/* 政党リスト */}
              <div className="grid grid-cols-2 gap-1">
                {proportionalData.map((p) => (
                  <div key={p.party} className="flex items-center justify-between bg-gray-700 rounded px-2 py-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded"
                        style={{ backgroundColor: p.color }}
                      ></span>
                      <span className="text-xs">{p.fullName}</span>
                    </div>
                    <span className="font-bold text-sm">{p.seats}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 神奈川関連の比例当選者 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold">神奈川関連 比例当選予測</h3>
                <span className="text-xs text-gray-400">{kanagawaElected.length}名</span>
              </div>
              
              <div className="space-y-2">
                {kanagawaElected.map((c, i) => (
                  <div key={i} className="bg-gray-700 rounded p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-8 rounded"
                          style={{ backgroundColor: c.color }}
                        ></span>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.party} | {c.district}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded ${
                          c.type === '惜敗復活' ? 'bg-orange-800' : 'bg-purple-800'
                        }`}>
                          {c.type}
                        </span>
                        {c.sekihaiRate && (
                          <p className="text-xs text-gray-400 mt-1">
                            惜敗率: <span className="text-yellow-400 font-medium">{c.sekihaiRate}%</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 惜敗率グラフ */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-3">惜敗率ランキング（神奈川）</h3>
              <div className="space-y-2">
                {kanagawaElected
                  .filter(c => c.sekihaiRate)
                  .sort((a, b) => b.sekihaiRate - a.sekihaiRate)
                  .map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs w-16 text-gray-400 truncate">{c.name}</span>
                      <div className="flex-1 h-4 bg-gray-700 rounded overflow-hidden">
                        <div 
                          className="h-full rounded"
                          style={{ 
                            width: `${c.sekihaiRate}%`,
                            backgroundColor: c.color
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium w-12 text-right">{c.sekihaiRate}%</span>
                    </div>
                  ))
                }
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ※惜敗率 = 落選候補の得票数 ÷ 当選者の得票数 × 100
              </p>
            </div>

            {/* 全比例当選者 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <button
                onClick={() => setShowAllElected(!showAllElected)}
                className="flex justify-between items-center w-full"
              >
                <h3 className="text-sm font-bold">南関東ブロック全当選予測</h3>
                <span className="text-xs text-blue-400">
                  {showAllElected ? '閉じる' : '表示する'}
                </span>
              </button>
              
              {showAllElected && (
                <div className="mt-3 space-y-1">
                  {electedCandidates.map((c, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-700 rounded px-2 py-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded"
                          style={{ backgroundColor: c.color }}
                        ></span>
                        <span className="text-xs">{c.name}</span>
                        <span className="text-xs text-gray-500">{c.party}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{c.district}</span>
                        {c.sekihaiRate && (
                          <span className="text-xs text-yellow-400">{c.sekihaiRate}%</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 分析 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2">AI分析</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                自民党は小選挙区で7議席を獲得予測だが、落選した13選挙区の候補者が高い惜敗率で比例復活。
                中道改革連合は旧公明党出身者を名簿上位（1-3位）に配置し、3名が比例単独で当選確実。
                残り1議席は神奈川14区で惜敗した長友氏が復活当選の見込み。
                維新は与党入りしたものの比例票は伸び悩み2議席。国民民主は浅尾元議員が復活。
              </p>
            </div>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 mt-6 py-4 px-4 text-center text-gray-500 text-xs">
        <p>AIによる予測です。実際の選挙結果を保証するものではありません。</p>
        <p className="mt-1">更新: 2026年2月2日</p>
      </footer>
    </div>
  );
}
