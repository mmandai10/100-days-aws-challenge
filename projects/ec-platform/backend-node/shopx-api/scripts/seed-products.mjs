// 100件以上のサンプル商品データを投入するスクリプト
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'shopx-api-products';

// カテゴリ定義
const categories = [
  { id: 'electronics', name: '電子機器' },
  { id: 'fashion', name: 'ファッション' },
  { id: 'books', name: '書籍' },
  { id: 'food', name: '食品・飲料' },
  { id: 'home', name: '家庭用品' },
  { id: 'sports', name: 'スポーツ' },
  { id: 'toys', name: 'おもちゃ・ゲーム' },
  { id: 'beauty', name: '美容・健康' },
];

// Unsplash の画像URL（カテゴリ別）
const categoryImages = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',  // headphones
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',  // watch
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',  // headphones2
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',  // phone
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',  // speaker
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',  // mouse
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',  // keyboard
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',  // camera
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',  // battery
    'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400',  // usb hub
  ],
  fashion: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',  // tshirt
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',  // jeans
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',  // sneakers
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',  // sweater
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',  // jacket
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',  // bag
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',  // scarf
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400',  // belt
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',  // sunglasses
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',  // hoodie
  ],
  books: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',  // book1
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',  // book2
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',  // books stack
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',  // bookshelf
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400',  // reading
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',  // book cover
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',  // notebook
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',  // library
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',  // open book
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',  // books2
  ],
  food: [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',  // coffee
    'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400',  // matcha
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',  // nuts
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',  // olive oil
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',  // honey
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400',  // chocolate
    'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',  // dried fruit
    'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=400',  // granola
    'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',  // tea
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',  // pasta
  ],
  home: [
    'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',  // mug
    'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=400',  // cutting board
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',  // lamp
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',  // diffuser
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',  // bath mat
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',  // storage
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',  // container
    'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',  // vacuum
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',  // iron
    'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400',  // clock
  ],
  sports: [
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',  // yoga mat
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',  // dumbbells
    'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400',  // pushup
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',  // shoes
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',  // running
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',  // gym
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',  // shaker
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',  // gym2
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',  // workout
    'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?w=400',  // watch
  ],
  toys: [
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',  // board game
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',  // lego
    'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400',  // puzzle
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400',  // rc car
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',  // cards
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',  // teddy
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',  // blocks
    'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=400',  // playing
    'https://images.unsplash.com/photo-1577460551100-907ba84418ce?w=400',  // rubiks
    'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400',  // drone
  ],
  beauty: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',  // skincare
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',  // lotion
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',  // sunscreen
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',  // shampoo
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400',  // treatment
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',  // hair oil
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400',  // face mask
    'https://images.unsplash.com/photo-1585652757141-8837d676054d?w=400',  // lip
    'https://images.unsplash.com/photo-1562887042-ed962f48c0ba?w=400',  // hand cream
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',  // perfume
  ],
};

// 商品データ生成
const products = [
  // === Electronics (15) ===
  { name: 'ワイヤレスイヤホン Pro', price: 12800, category: 'electronics', description: 'ノイズキャンセリング搭載、最大30時間再生', stock: 50 },
  { name: 'スマートウォッチ X1', price: 24800, category: 'electronics', description: '心拍数・睡眠トラッキング対応、防水仕様', stock: 30 },
  { name: 'USB-C 急速充電器 65W', price: 3980, category: 'electronics', description: 'PD対応、ノートPC充電可能', stock: 100 },
  { name: 'ポータブルSSD 1TB', price: 15800, category: 'electronics', description: '読み込み速度1000MB/s、耐衝撃設計', stock: 40 },
  { name: 'Bluetoothスピーカー', price: 8900, category: 'electronics', description: '360度サウンド、IPX7防水', stock: 60 },
  { name: 'ワイヤレスマウス 静音', price: 2980, category: 'electronics', description: 'クリック音99%カット、電池寿命18ヶ月', stock: 150 },
  { name: 'メカニカルキーボード', price: 9800, category: 'electronics', description: '青軸、RGBバックライト', stock: 35 },
  { name: 'Webカメラ 4K', price: 7800, category: 'electronics', description: 'オートフォーカス、内蔵マイク付き', stock: 45 },
  { name: 'モバイルバッテリー 20000mAh', price: 4500, category: 'electronics', description: '3台同時充電、LCD残量表示', stock: 80 },
  { name: 'USBハブ 7ポート', price: 3200, category: 'electronics', description: 'USB3.0対応、セルフパワー', stock: 70 },
  { name: 'ノイキャンヘッドホン', price: 19800, category: 'electronics', description: '有線/無線両対応、折りたたみ式', stock: 25 },
  { name: 'タブレットスタンド', price: 2500, category: 'electronics', description: '角度調整可能、アルミ製', stock: 90 },
  { name: 'HDMIケーブル 2m', price: 1280, category: 'electronics', description: '4K/60Hz対応、金メッキ端子', stock: 200 },
  { name: 'ワイヤレス充電パッド', price: 2980, category: 'electronics', description: 'Qi対応、15W急速充電', stock: 85 },
  { name: 'デジタルフォトフレーム', price: 8500, category: 'electronics', description: '10インチ、WiFi対応、自動スライドショー', stock: 20 },

  // === Fashion (15) ===
  { name: 'オーガニックコットンTシャツ', price: 3900, category: 'fashion', description: '肌に優しい素材、ユニセックス', stock: 100 },
  { name: 'スリムフィットジーンズ', price: 7800, category: 'fashion', description: 'ストレッチ素材、ダークブルー', stock: 60 },
  { name: 'レザースニーカー', price: 12800, category: 'fashion', description: '本革使用、クッション性抜群', stock: 40 },
  { name: 'ウールニットセーター', price: 8900, category: 'fashion', description: 'メリノウール100%、チャコールグレー', stock: 35 },
  { name: 'ダウンジャケット', price: 24800, category: 'fashion', description: '撥水加工、収納袋付き', stock: 25 },
  { name: 'キャンバストートバッグ', price: 4500, category: 'fashion', description: 'A4サイズ対応、内ポケット付き', stock: 80 },
  { name: 'シルクスカーフ', price: 6800, category: 'fashion', description: '100%シルク、複数の巻き方可能', stock: 50 },
  { name: 'レザーベルト', price: 5500, category: 'fashion', description: '本革、シンプルなバックル', stock: 70 },
  { name: 'サングラス UV400', price: 3980, category: 'fashion', description: '紫外線カット、軽量フレーム', stock: 90 },
  { name: 'コットンパーカー', price: 6900, category: 'fashion', description: '裏起毛、フード付き', stock: 55 },
  { name: 'リネンシャツ', price: 7500, category: 'fashion', description: '麻100%、夏にぴったり', stock: 45 },
  { name: 'チノパンツ', price: 5900, category: 'fashion', description: 'ビジネスカジュアル対応', stock: 65 },
  { name: 'ニットキャップ', price: 2800, category: 'fashion', description: 'アクリル素材、ユニセックス', stock: 100 },
  { name: 'レザーウォレット', price: 9800, category: 'fashion', description: '長財布、カード12枚収納', stock: 40 },
  { name: 'スポーツソックス 5足', price: 1980, category: 'fashion', description: '抗菌防臭、クッション付き', stock: 150 },

  // === Books (15) ===
  { name: 'AI時代の働き方', price: 1980, category: 'books', description: 'ベストセラー、最新版', stock: 80 },
  { name: 'はじめてのPython', price: 2800, category: 'books', description: 'プログラミング入門書、サンプルコード付き', stock: 60 },
  { name: 'マネジメントの基本', price: 2200, category: 'books', description: 'チームリーダー必読', stock: 50 },
  { name: '深夜特急 全巻セット', price: 4800, category: 'books', description: '旅行エッセイの名作', stock: 30 },
  { name: '英語多読 レベル3', price: 1500, category: 'books', description: '語彙1500語レベル', stock: 70 },
  { name: 'クラウド設計パターン', price: 3800, category: 'books', description: 'AWS/Azure/GCP対応', stock: 40 },
  { name: '株式投資の教科書', price: 1800, category: 'books', description: '初心者向け、図解多め', stock: 55 },
  { name: '料理の科学', price: 2500, category: 'books', description: 'なぜこうなるのか解説', stock: 45 },
  { name: 'ミステリー傑作選', price: 1200, category: 'books', description: '短編10作品収録', stock: 90 },
  { name: 'デザイン思考入門', price: 2400, category: 'books', description: 'ワークショップ形式', stock: 35 },
  { name: '日本史 一冊でわかる', price: 1600, category: 'books', description: '縄文から令和まで', stock: 65 },
  { name: '睡眠の科学', price: 1900, category: 'books', description: '質の良い眠りのために', stock: 50 },
  { name: 'TypeScript実践ガイド', price: 3500, category: 'books', description: 'React/Node.js対応', stock: 45 },
  { name: '哲学入門', price: 1400, category: 'books', description: '古代ギリシャから現代まで', stock: 40 },
  { name: 'Excel 時短術', price: 1600, category: 'books', description: '業務効率化テクニック', stock: 75 },

  // === Food (15) ===
  { name: 'スペシャルティコーヒー豆 200g', price: 1800, category: 'food', description: 'エチオピア産、フルーティな味わい', stock: 100 },
  { name: '有機抹茶 30g', price: 2500, category: 'food', description: '京都宇治産、石臼挽き', stock: 60 },
  { name: 'ナッツミックス 500g', price: 1980, category: 'food', description: '無塩、6種類入り', stock: 80 },
  { name: 'オリーブオイル EXV 500ml', price: 2200, category: 'food', description: 'イタリア産、コールドプレス', stock: 50 },
  { name: '蜂蜜 国産 300g', price: 2800, category: 'food', description: '非加熱、アカシア', stock: 45 },
  { name: 'ダークチョコレート 72%', price: 680, category: 'food', description: 'ベルギー産、100g', stock: 150 },
  { name: 'ドライフルーツセット', price: 1500, category: 'food', description: 'マンゴー・パイン・いちじく', stock: 70 },
  { name: 'グラノーラ 400g', price: 980, category: 'food', description: 'オーツ麦ベース、低糖質', stock: 90 },
  { name: '紅茶アソート 20袋', price: 1200, category: 'food', description: 'アールグレイ他5種', stock: 85 },
  { name: 'パスタソース トマト', price: 580, category: 'food', description: 'イタリアンシェフ監修', stock: 120 },
  { name: 'だし醤油 500ml', price: 780, category: 'food', description: '国産かつお・昆布使用', stock: 100 },
  { name: 'プロテインバー 12本', price: 2400, category: 'food', description: 'タンパク質20g、チョコ味', stock: 65 },
  { name: '玄米 2kg', price: 1580, category: 'food', description: '新潟産コシヒカリ', stock: 40 },
  { name: 'グリーンスムージー粉末', price: 3200, category: 'food', description: '30日分、野菜22種配合', stock: 55 },
  { name: 'クラフトビール 6本', price: 2800, category: 'food', description: '国内醸造所セレクト', stock: 35 },

  // === Home (15) ===
  { name: 'ステンレスマグカップ', price: 1980, category: 'home', description: '真空断熱、保温保冷', stock: 100 },
  { name: 'バンブーまな板', price: 2500, category: 'home', description: '抗菌作用、Lサイズ', stock: 60 },
  { name: 'LEDデスクライト', price: 4800, category: 'home', description: '調光調色、目に優しい', stock: 45 },
  { name: 'アロマディフューザー', price: 3500, category: 'home', description: '超音波式、タイマー付き', stock: 50 },
  { name: '珪藻土バスマット', price: 2980, category: 'home', description: '速乾、吸水性抜群', stock: 70 },
  { name: '収納ボックス 3個セット', price: 1800, category: 'home', description: '折りたたみ可能、布製', stock: 90 },
  { name: 'ガラス保存容器 5個', price: 2200, category: 'home', description: '電子レンジOK、密閉', stock: 80 },
  { name: 'ハンディクリーナー', price: 6800, category: 'home', description: 'コードレス、車内OK', stock: 35 },
  { name: 'スチームアイロン', price: 5500, category: 'home', description: 'ハンガーにかけたまま', stock: 40 },
  { name: 'ウォールクロック', price: 3200, category: 'home', description: '北欧デザイン、静音', stock: 55 },
  { name: 'クッションカバー 2枚', price: 1980, category: 'home', description: 'リネン素材、45cm角', stock: 75 },
  { name: 'ランドリーバスケット', price: 2500, category: 'home', description: '折りたたみ、防水加工', stock: 65 },
  { name: 'キッチンスケール', price: 1800, category: 'home', description: '0.1g単位、タニタ製', stock: 85 },
  { name: 'エコバッグ 3枚セット', price: 1200, category: 'home', description: '大容量、コンパクト収納', stock: 120 },
  { name: 'ガーデニングセット', price: 2800, category: 'home', description: 'スコップ・ハサミ他', stock: 30 },

  // === Sports (15) ===
  { name: 'ヨガマット 6mm', price: 2980, category: 'sports', description: 'TPE素材、滑り止め', stock: 70 },
  { name: 'ダンベル 5kg×2', price: 4500, category: 'sports', description: 'ネオプレンコーティング', stock: 50 },
  { name: 'プッシュアップバー', price: 1580, category: 'sports', description: '手首負担軽減、滑り止め', stock: 80 },
  { name: 'トレーニングウェア上下', price: 5800, category: 'sports', description: '吸汗速乾、ストレッチ', stock: 45 },
  { name: 'ランニングシューズ', price: 9800, category: 'sports', description: 'クッション性◎、軽量', stock: 35 },
  { name: 'スポーツタオル 3枚', price: 1800, category: 'sports', description: 'マイクロファイバー、速乾', stock: 100 },
  { name: 'プロテインシェイカー', price: 980, category: 'sports', description: '600ml、目盛り付き', stock: 90 },
  { name: '腹筋ローラー', price: 1980, category: 'sports', description: 'ダブルホイール、膝パッド付', stock: 60 },
  { name: 'レジスタンスバンド 5本', price: 2200, category: 'sports', description: '強度5段階セット', stock: 75 },
  { name: 'スポーツウォッチ', price: 8900, category: 'sports', description: 'GPS内蔵、心拍計', stock: 30 },
  { name: 'テニスラケット', price: 15800, category: 'sports', description: '中級者向け、ガット張り済み', stock: 20 },
  { name: 'サッカーボール 5号', price: 3500, category: 'sports', description: 'FIFA公認球', stock: 40 },
  { name: 'スイムゴーグル', price: 1800, category: 'sports', description: '曇り止め、UVカット', stock: 65 },
  { name: 'コンプレッションタイツ', price: 4200, category: 'sports', description: '段階着圧、疲労軽減', stock: 55 },
  { name: 'バランスボール 65cm', price: 2500, category: 'sports', description: 'アンチバースト、空気入れ付', stock: 45 },

  // === Toys (15) ===
  { name: 'ボードゲーム カタン', price: 4500, category: 'toys', description: '3-4人用、戦略ゲーム', stock: 40 },
  { name: 'LEGOクラシック 484ピース', price: 5800, category: 'toys', description: '自由に組み立て', stock: 35 },
  { name: '1000ピースパズル 風景', price: 2200, category: 'toys', description: '完成サイズ75×50cm', stock: 50 },
  { name: 'ラジコンカー オフロード', price: 6800, category: 'toys', description: '4WD、防水仕様', stock: 25 },
  { name: 'カードゲーム UNO', price: 980, category: 'toys', description: '定番パーティーゲーム', stock: 100 },
  { name: 'ぬいぐるみ くま', price: 2500, category: 'toys', description: '手触り◎、30cm', stock: 60 },
  { name: 'マグネットブロック 100pcs', price: 4200, category: 'toys', description: '知育玩具、立体図形', stock: 45 },
  { name: 'トランプ プラスチック製', price: 680, category: 'toys', description: '水洗い可能', stock: 90 },
  { name: 'ルービックキューブ', price: 1500, category: 'toys', description: '公式ライセンス品', stock: 70 },
  { name: 'ドローン ミニ', price: 8800, category: 'toys', description: 'カメラ付き、初心者向け', stock: 20 },
  { name: '将棋セット', price: 3800, category: 'toys', description: '木製駒、折りたたみ盤', stock: 35 },
  { name: 'バドミントンセット', price: 2800, category: 'toys', description: 'ラケット2本+シャトル', stock: 55 },
  { name: 'プラモデル 戦車', price: 3500, category: 'toys', description: '1/35スケール、塗装済み', stock: 30 },
  { name: 'けん玉 競技用', price: 2200, category: 'toys', description: '日本けん玉協会認定', stock: 40 },
  { name: 'オセロ 公式サイズ', price: 2500, category: 'toys', description: 'マグネット式', stock: 50 },

  // === Beauty (15) ===
  { name: '化粧水 高保湿 200ml', price: 2800, category: 'beauty', description: 'ヒアルロン酸配合', stock: 80 },
  { name: '乳液 モイスチャー 100ml', price: 2500, category: 'beauty', description: 'セラミド配合', stock: 70 },
  { name: '日焼け止め SPF50+', price: 1800, category: 'beauty', description: 'ウォータープルーフ', stock: 100 },
  { name: 'シャンプー ダメージケア', price: 1980, category: 'beauty', description: 'ノンシリコン、500ml', stock: 90 },
  { name: 'トリートメント 集中補修', price: 2200, category: 'beauty', description: 'ケラチン配合、500g', stock: 85 },
  { name: 'ヘアオイル 100ml', price: 1500, category: 'beauty', description: 'アルガンオイル配合', stock: 75 },
  { name: 'フェイスマスク 30枚', price: 1980, category: 'beauty', description: '毎日使えるプチプラ', stock: 60 },
  { name: 'リップクリーム 3本', price: 980, category: 'beauty', description: 'メンソレータム配合', stock: 120 },
  { name: 'ハンドクリーム 50g', price: 780, category: 'beauty', description: 'シアバター配合', stock: 100 },
  { name: '香水 オードトワレ 30ml', price: 4500, category: 'beauty', description: 'シトラス系、ユニセックス', stock: 40 },
  { name: 'メイクブラシセット 8本', price: 3200, category: 'beauty', description: 'ケース付き、合成毛', stock: 50 },
  { name: 'ネイルポリッシュ 5色', price: 1800, category: 'beauty', description: '速乾タイプ', stock: 65 },
  { name: '電動歯ブラシ', price: 5800, category: 'beauty', description: '音波式、替えブラシ2本付', stock: 45 },
  { name: 'ボディローション 300ml', price: 1600, category: 'beauty', description: 'ベビーパウダーの香り', stock: 70 },
  { name: 'アイクリーム 15g', price: 3800, category: 'beauty', description: 'レチノール配合', stock: 35 },
];

// 既存の商品データをクリア
async function clearProducts() {
  console.log('既存の商品データをクリア中...');
  
  const scanResult = await docClient.send(new ScanCommand({
    TableName: tableName,
    FilterExpression: 'begins_with(SK, :sk)',
    ExpressionAttributeValues: { ':sk': 'PRODUCT#' }
  }));
  
  for (const item of scanResult.Items || []) {
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: { PK: item.PK, SK: item.SK }
    }));
  }
  
  console.log(`${scanResult.Items?.length || 0} 件削除完了`);
}

// カテゴリデータを投入
async function seedCategories() {
  console.log('カテゴリデータを投入中...');
  
  // 既存カテゴリをクリア
  const scanResult = await docClient.send(new ScanCommand({
    TableName: tableName,
    FilterExpression: 'begins_with(PK, :pk)',
    ExpressionAttributeValues: { ':pk': 'CATEGORY#' }
  }));
  
  for (const item of scanResult.Items || []) {
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: { PK: item.PK, SK: item.SK }
    }));
  }
  
  // 新しいカテゴリを投入
  for (const cat of categories) {
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: {
        PK: `CATEGORY#${cat.id}`,
        SK: `CATEGORY#${cat.id}`,
        categoryId: cat.id,
        name: cat.name,
        createdAt: new Date().toISOString()
      }
    }));
  }
  
  console.log(`${categories.length} カテゴリ投入完了`);
}

// 商品データを投入（Single Table Design: PK=CATEGORY#, SK=PRODUCT#）
async function seedProducts() {
  console.log('商品データを投入中...');
  
  let count = 0;
  for (const product of products) {
    const productId = `prod-${String(count + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    
    // カテゴリ別の画像を取得（ローテーション）
    const images = categoryImages[product.category] || [];
    const imageIndex = count % images.length;
    const imageUrl = images[imageIndex] || `https://placehold.co/400x400/eee/333?text=No+Image`;
    
    // Single Table Design: PK = CATEGORY#xxx, SK = PRODUCT#xxx
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: {
        PK: `CATEGORY#${product.category}`,
        SK: `PRODUCT#${productId}`,
        productId,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl,
        stock: product.stock,
        createdAt: now,
        updatedAt: now
      }
    }));
    
    count++;
    if (count % 20 === 0) {
      console.log(`  ${count} 件投入完了...`);
    }
  }
  
  console.log(`合計 ${count} 件の商品を投入完了！`);
}

// 実行
async function main() {
  try {
    await clearProducts();
    await seedCategories();
    await seedProducts();
    console.log('\n✅ シードデータ投入完了！');
  } catch (error) {
    console.error('エラー:', error);
    process.exit(1);
  }
}

main();
