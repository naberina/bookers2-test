const sample = require('./sample')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, //trueにするとchromeが裏で立ち上がる
    // devtools: true, //デバッグ用
    timeout: 3000, //タイムアウトの時間変更
    slowMo: 20, //少し遅めに設定
    args: ['--no-sandbox', '--disable-setuid-sandbox'] //プロトコルエラー解消のため、不正に操作させない
  });

  // pageはページ全体を示すメソッド
  const page = await browser.newPage();

    // 例外処理の場合け
    try {
    	await init;

        // await page.waitFor(2000);
        // // #########################################################
        // // rootパス定義
        // var url = rootPath(path);
        // console.log("1.トップページのテスト");
        // console.log(url);
        // if (url == "http://localhost:3000"){
        //   console.log("============================")
        // }else{
        //   console.log("============================")
        //   console.log("△ルートパスの設定をしましょう")
        // }
        // // #########################################################
        // // ルートページ(トップページ)
        // await page.goto(url);
        await page.waitFor(2000);
        if (await page.$('a')){
            await page.waitForSelector('body');
            await page.screenshot({path: 'images/1-top-page.png'});

            // トップページがあるか確認
            var start_button = await page.$eval('a', element =>{
                 // Railsのトップページの場合
                if (element.textContent.match('\n')){
                    return true
                // トップページにリンクが作成されている場合
                }else{
                    return false
                }
            })

            if (start_button == true){
                console.log('×トップページが作成されていません');
            }else if (start_button == false){
                console.log('◯ルートパスの設定があります')
                console.log('◯トップページが作成されています');
                await page.click('.sign_up');
                await page.waitFor(1000);
            }

            await main("hello!!!");

        }


        // #########################################################
        // 閉じる
        await page.close();
        await browser.close();
    } catch (error) {
          console.log("×テストの途中でエラーになりました。該当するテストの処理やclass名・スペルミスがないかもう一度確認してから再提出して下さい。");
          console.log(error);
          process.exit(1) //サーバーの停止
        }
})();

