// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// HTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start =  document.getElementById('start');
const count = document.getElementById('count');
const scorefield = document.getElementById('score');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {
    // 文字列のクリア
    typed = '';
    typedfield.textContent = typed;    

    // 配列のインデックス数からランダムな数値を生成
    let random = Math.floor(Math.random() * textLists.length)

    // 配列からランダムにテキストを取得し表示
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    // 誤タイプの場合
    if(e.key !== untyped.substring(0,1)) {
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
        // 関数keyPressを抜ける
    }

    // 正タイプの場合
    // スコアのインクリメント
    score++;
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    
    scorefield.textContent = score;

    // 新しいテキストの表示
    if (untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    // テキストを格納する変数を作る
    let text= '';
    
    // スコアに応じて異なるメッセージをtextに格納
    if(score < 100) {
        text= `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text= `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text= `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`
};

// ゲーム終了
const gameOver = (id) => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    // OKボタンをクリックされたらリロード
    if (result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {
    // タイマー部分のHTML要素を取得
    let time = count.textContent;

    const id = setInterval(() => {
        // カウントダウンする
        time--;
        count.textContent = time;

        // timeでタイマー停止
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時
start.addEventListener('click', () => {
    // カウントダウンタイマーを開始
    timer();

    // ランダムなテキストを表示
    createText();

    // スタートボタンの非表示
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);    
});

untypedfield.textContent = 'スタートボタンで開始'

