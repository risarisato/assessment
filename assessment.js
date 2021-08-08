'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
    while (element.firstChild) { //何かタグがある限りループ
        element.removeChild(element.firstChild);
    }
}

/**
 * 指定した要素に診断結果用のタグを表示する。
 * @param {HTMLElement} element HTMLの要素
 */

function appendAssessmentResult(element, result){
    // result-area に h3 タグで診断結果は…という文字を表示
    const h3 = document.createElement('h3'); // h3 タグを作る
    h3.innerText = '〇〇の診断結果は・・・'; // h3タグに〇〇の診断結果の文字列
    element.appendChild(h3);                // result-areaに h3 変数を設定

    // result-areaにpタグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    element.appendChild(p);
}


/**
 * 指定した要素にツイートボタンを表示する。
 * @param {HTMLElement} element HTMLの要素
 * @param {string} message ツイート本文
 */

// aタグを関数にした
function apendTweetButton(elemnt, message) {     // 引数をelemnt
 // tweetボタンの表示
    // aタグを作って属性を設定する　aタグを関数にするとすっきりする
    const a = document.createElement('a');
    // anchorタグにはhrefValue属性が必要
    const href = 
        +'https://twitter.com/intent/tweet?button_hashtag='
        // URLが長いので＋で改行して、encodeで日本語の文字化けを防ぐ
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
    a.setAttribute('href', href); //HTMLの「href」のhref属性を追加する
    a.className = 'twitter-hashtag-button';
    a.setAttribute('data-text', message);   //ここも外から引数でmessageで
    a.innerText = 'Tweet #あなたのいいところ';
    
    // aタグをHTMLとして追加する
    elemnt.appendChild(a);      // 外から追加できるようにここもelemnt
    
    // scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

    // scriptタグをHTMLとして追加する
    elemnt.appendChild(script);
}   

assessmentButton.onclick = () => {  // 無名関数でいらない
    userNameInput.size = 10; // userNameInputの中身をvalueで取ってくる
    let userName = userNameInput.value;
    if(userName.length === 0){
        return;                 // 名前の入力がなかったので=無名関数の文字列が0なら終了させる
    }
/* 
    // 入力欄にEnterキーが押されても診断する
    // 無名関数を使わない場合
    userNameInput.onkeydown = function execAssessment (event) {
        if(event.key === 'Enter'){
            // TODO ボタンのonclick() の処理を呼び出す
            assessment.onclick();
        };
    }
 */
        // 入力欄にEnterキーが押されても診断する
    // 無名関数を使わない場合
    userNameInput.onkeydown = event => {
        if(event.key === 'Enter'){
            // TODO ボタンのonclick() の処理を呼び出す
            assessment.onclick();
        };
    }

    // 診断結果の表示
    removeAllChildren(resultDivided);　// 診断結果エリアの初期化

    //すでにある診断結果を削除
    const result = assessment(userName);
    appendAssessmentResult(resultDivided, result);

    //　Tweetボタンの表示
    removeAllChildren(tweetDivided);
    apendTweetButton(tweetDivided, result);
    }

   

    console.log("ボタンが押されました"); // コンソールで表示されるだけ
    console.log(userNameInput.value); // 同じ
    //TODO 診断結果の実装

/* ここ関数にする
        //すでにある診断結果を削除
        while(resultDivided.firstChild) {       // result.area に何かタグある限りループ
            resultDivided.removeChild(resultDivided.firstChild);
        }
 

    // result.areaにh3タグで ”診断結果” という文字を表示
    const h3 = document.createElement('h3');        // h3タグを作る
    h3.innerText = '診断結果は・・・（　＾ω＾）・・・'; // h3タグに表示したい文字を設定はinnertext
    resultDivided.appendChild(h3);                  // result.area にh3 のタグはappendChild



    // 診断処理を実行
    const result = assassment(userName);

    //result.areaにpタグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = '診断結果は・・・（　＾ω＾）・・・' + result;
    resultDivided.appendChild(p);
    */


const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザの名前
 * @return {string} 診断結果



function assassment(userName) {
    // userName(文字列)を数値に変換（漢字だと5桁）
    let userNameNumber = userName.charCodeAt(0);
    // 5桁の数値を回答結果の範囲0（0~15）に変換
    let answerNumber = userNameNumber % answers.length;
    //診断結果
    let result = answers[answerNumber];
    // 置換した結果をreturnで返す
    // {userName}は強調したいため波括弧にしているが、
    // userNameにすれば\エスケープシ\がいらないだけ。
    // return result.replace(/userName/g, userName); //ただの置換で｛__｝は残る
    return result.replace(/\{userName\}/g, userName); // 正規表現
    // return result.replace('{userName}', userName); // 「g」ないので1つ{userName}のみ置換
}
console.log(assassment('太郎'));
console.log(assassment('次郎'));
console.log(assassment('三郎'));
console.log(assassment('りさ'));

 */
 //上記だと1文字目だけ判定している
 //下記＞＞2文字.3文字目まで合計して判定しているようなプログラミング


function assessment(userName) {
    // userName(文字列)を数値に変換（漢字だと5桁）
    // すべての文字を足し算する>>標準で配列のすべての文字足す機能ないため
    let userNameNumber = 0;
    for (let i =0; i < userName.length; i++) {
        userNameNumber += userName.charCodeAt(i);
    }
    let answerNumber = userNameNumber % answers.length;
    // 5桁の数値を回答結果の範囲0（0~15）に変換
    //診断結果
    let result = answers[answerNumber];
    // 置換した結果をreturnで返す
    // {userName}は強調したいため波括弧にしているが、
    // userNameにすれば\エスケープシ\がいらないだけ。
    // return result.replace(/userName/g, userName); //ただの置換で｛__｝は残る
    return result.replace(/\{userName\}/g, userName); // 正規表現
    // return result.replace('{userName}', userName); // 「g」ないので1つ{userName}のみ置換
}

console.assert(
    assessment('三郎')=== '三郎のいいところは見た目です。内側から溢れ出る三郎の良さに皆が気を惹かれます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
    /**確認したいこｔ
     * エラー時のコメント
     */
);

//入力が同じ名前なら、同じ診断結果を出力する
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。',
);

