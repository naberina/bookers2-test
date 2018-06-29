スクショ
await page.screenshot({path: 'images/画像名.png'});

待ち時間
await page.waitFor(1000);

セレクタの読み込みまで待機
await page.waitForSelector('form');

セレクタがあるかどうか
await page.waitForSelector('edit_1');

if (await page.$('.edit_1')){
}

投稿
await page.type('.book_title', "50文字投稿");

送信
await page.click('input[type="submit"]');

クリック
await page.click('.show_1');

画面遷移
await page.goBack();
await page.goto("url~~~");

更新
await page.reload();

プロセスを止める
process.exit(1);

ブラウザ終了
await browser.close();

バックスペースのクリック
await page.keyboard.press('Backspace');


ページに反映されているか
var data = await page.$eval('body', el => {
    if (el.textContent.match(/福沢諭吉/) && el.textContent.match(/天は人の上に人を造らず人の下に人を造らず」と言えり。/) && el.textContent.match(/successfully/)){
        return "◎編集内容が正しく表示され、サクセスメッセージが表示されています"
    }else if (el.textContent.match(/福沢諭吉/) && el.textContent.match(/天は人の上に人を造らず人の下に人を造らず」と言えり。/)){
        return "◯編集内容が正しく表示されています"
    }else if (el.textContent.match(/福沢諭吉/)){
        return "×編集後に感想文が保存されていません"
    }else if (el.textContent.match(/天は人の上に人を造らず人の下に人を造らず」と言えり。/)){
        return "×編集後にタイトルが保存されていません"
    }else{
        return "×編集後のリダイレクト先が設定されていません。コントローラの記述等確認して下さい"
    }
});




cssの修正・追加
await page.evaluate(({}) => {
    $('#slider').css("display", "block");
},{});