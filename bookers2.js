// ヘッドレスブラウザ読み込み(読込先のパスが/home/vagrant/node_modules以下のpuppeteerのため)
// const puppeteer = require('puppeteer');

// class MyClass {
//     function hello(name){
//         console.log(name + "hello");
//     }

//     hello();
// }

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
        // require('./sample.js')
        page.waitFor(3000);
        // await hello;

        // const message = ""

        // #########################################################
        // ダイアログの処理を全てOKにする
        page.on('dialog', dialog => {
          console.log('◯削除ボタンのダイアログの設定があります');
          dialog.accept();
        });

         // #########################################################
        // 実行したlogをルートディレクトリのdebug.logファイルに吐き出す
        var fs = require('fs');
        var util = require('util');
        var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
        var log_stdout = process.stdout;

        console.log = function(d) {
          log_file.write(util.format(d) + '\n');
          log_stdout.write(util.format(d) + '\n');
        };

        // #########################################################
        // 引数が渡されれば引数のパスに飛ぶ
        // プライベートIPアドレスに飛ぶ
        var path = process.argv[2];
        var rootPath = function(path){
          if(path == null){
            return "http://localhost:3000"
          }else{
            return "http://localhost:3000/" + path ;
          }
        }

        // #########################################################
        // rootパス定義
        var url = rootPath(path);
        console.log("1.トップページのテスト");
        console.log(url);
        if (url == "http://localhost:3000"){
          console.log("============================")
        }else{
          console.log("============================")
          console.log("△ルートパスの設定をしましょう")
        }

        // 本当は外部ファイルに切り出したい。。
        // const init = require('init.js');
        // var fs = require('fs');
        // fs.readFile('./init.js', 'utf8', function (err, text) {
        //     console.log(text);
        // });

        // #########################################################
        // ルートページ(トップページ)
        await page.goto(url);
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
                console.log('◯トップページが作成されています');
                // await page.click('.home');
                // await page.click('.about');
                // await page.waitFor(1000);
                // await page.click('.sign_up');
                // await page.waitFor(1000);
                // await page.click('.sign_in');
                // await page.waitFor(1000);
                await page.click('.sign_up');
                await page.waitFor(1000);

                await hello;


                // #############################################################
                // 新規登録

                // 空欄登録
                // await page.waitForSelector('form');
                // await page.type('#user_name', "");
                // await page.type('#user_email', "")
                // await page.type('#user_password', "")
                // await page.type('#user_password_confirmation', "")
                // await page.click('input[type="submit"]');
                // await page.waitFor(1000);
                // await page.screenshot({path: "images/registration1.png"});

                // 名前の文字数が少ない
                // await page.waitForSelector('form');
                // await page.type('#user_name', "a");
                // await page.type('#user_email', "a@a");
                // await page.keyboard.press('Backspace');
                // await page.keyboard.press('Backspace');
                // await page.type('#user_password', "aaaaaa");
                // await page.type('#user_password_confirmation', "aaaaaa");
                // await page.click('input[type="submit"]');
                // await page.waitFor(1000);


                // エラーメッセージが表示されているか
                // var data = await page.$eval('body', el =>{
                //     if (el.textContent.match(/Email can't be blank/) || el.textContent.match(/メール/) && el.textContent.match(/Password can't be blank/) || el.textContent.match(/パスワードが空欄です/) && el.textContent.match(/Name can't be blank/) || el.textContent.match(/名前が空欄です/) && el.textContent.match(/Name is too short/) ||　el.textContent.match(/2文字/)){
                //         return "◯エラーメッセージが表示されます"
                //     }
                // });

                // console.log(data);
                // await page.screenshot({path: "images/registration2.png"});


                // 新規登録
                await page.waitForSelector('form');
                await page.waitFor(1000);
                await page.type('#user_name', "aa");
                await page.type('#user_email', "a@a")
                await page.type('#user_password', "aaaaaa")
                await page.type('#user_password_confirmation', "aaaaaa")
                await page.click('input[type="submit"]');
                await page.screenshot({path: "images/registration3.png"});


                // 新規登録サクセスメッセージ
                // console.log("サクセスメッセージ")
                // var message = await page.$eval('body', el =>{
                //     if (el.textContent.match(/successfully/)){
                //         return "◎新規登録後のサクセスメッセージが表示されています"
                //     }else{
                //         return "・新規登録後のサクセスメッセージをつけるとさらに良いです"
                //     }
                // });
                // console.log(message);
                // module.exports = MyClass;

                // ログアウト
                console.log("============================")
                console.log("2.ログアウトテスト")
                await page.click('.logout');
                await page.waitFor(1000);
                var top = await page.$eval('body', el =>{
                    if (el.textContent.match(/welcome to/)){
                        return "◯ログアウト後にトップページにリダイレクトされています"
                    }else{
                        return "△ログアウト後のリファイレクト先が間違えています"
                    }
                });
                console.log(top);

                // ログインテスト
                console.log("============================")
                console.log("3.ログインテスト")
                await page.click('.sign_in');
                await page.waitForSelector('form');
                await page.type('#user_name', "aa");
                await page.type('#user_password', "aaaaaa")
                await page.click('input[type="submit"]');

                console.log("サクセスメッセージ")
                var message = await page.$eval('body', el =>{
                    if (el.textContent.match(/successfully/)){
                        return "◎ログイン後のサクセスメッセージが表示されています"
                    }else{
                        return "・ログインのサクセスメッセージをつけるとさらに良いです"
                    }
                });
                console.log(message);

                // 新規投稿のテスト
                console.log("============================")
                console.log("4.新規投稿のテスト")
                await page.waitFor(1000);
                await page.type('#book_title', "");
                await page.type('#book_body', "");
                await page.click('input[type="submit"]');

                var empty = await page.$eval('body', el =>{
                    if (el.textContent.match(/can't be blank/) || el.textContent.match(/空欄/)){
                        return "◎空欄投稿後後のエラーメッセージが表示されています"
                    }else{
                        return "・空欄投稿後のエラーメッセージをつけるとさらに良いです"
                    }
                });
                console.log(empty);

                await page.type('#book_title', "100文字投稿");
                await page.type('#book_body', "テキストボックスに入力された文字の数をカウントします。 Twitter投稿やレポート作成など、文字数制限のある文章を作成するときに便利です。入力するとすぐに文字数がカウントされます。これで100文字。");
                await page.click('input[type="submit"]');

                await page.waitFor(1000);
                var book_after = await page.$eval('body', el =>{
                    if (el.textContent.match(/100文字投稿/) || el.textContent.match(/テキストボックスに入力された文字の数をカウントします。/)){
                        return "◎新規投稿ができます"
                    }else{
                        return "×新規投稿ができません"
                    }
                });
                console.log(book_after);



                 console.log("============================")
                console.log("5.詳細画面の確認")
                // var show = await page.$eval('body', el => {
                //     if (el.textContent.match(/Edit/) || el.textContent.match(/編集/) && el.textContent.match(/Destroy/) || el.textContent.match(/削除/)){
                //         return "○正しくリンクが表示されています"
                //     }else{
                //         return "×編集・削除のリンクが見つかりません"
                //     }
                // });
                // console.log(show);
                // var show = await page.$eval('body', el => {
                    await page.waitFor(1000);
                    if (await page.waitForSelector('.edit_1') || await page.waitForSelector('.deatroy_1')){
                        console.log("◯正しくリンクが表示されています")
                    }else if(await page.waitForSelector('.edit_1')){
                        console.log("△削除のボタンがありません。またはクラス名が間違えています")
                    }else if(await page.waitForSelector('.deatroy_1')){
                        console.log("△編集ボタンがありません。またはクラス名が間違えています")
                    }else{
                        console.log("×編集・削除ボタンが見つかりません")
                    }
                // });
                // console.log(show);


                console.log("============================")
                console.log("6.編集のテスト")
                await page.click('.edit_1');
                await page.waitForSelector('form');
                await page.type('#book_title', "から200文字投稿のテスト");
                await page.type('#book_body', "テキストボックスに入力された文字の数をカウントします。 Twitter投稿やレポート作成など、文字数制限のある文章を作成するときに便利です。入力するとすぐに文字数がカウントされます。これで201文字。！");
                await page.click('input[type="submit"]');

                var edit = await page.$eval('body', el =>{
                    if (el.textContent.match(/too long/) || el.textContent.match(/長すぎ/)){
                        console.log("○投稿の200文字バリデーションがかかっています")
                    }else{
                        console.log("△エラーメッセージを表示するとさらに良いです")
                    }
                });

                await page.waitForSelector('form');
                await page.type('#book_title', "");
                await page.focus('#book_body');
                await page.keyboard.press('Backspace');
                await page.click('input[type="submit"]');


                console.log("7.更新のテスト")
                await page.$('fonm');
                await page.screenshot({path: 'images/top.png'});

                await main("hello!!!");
            }

        }else{
            console.log('×トップページに各種リンクがありません')
            await page.goto("http://localhost:3000/users/sign_up");
            // process.exit(1)
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

