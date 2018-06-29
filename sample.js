// function hello(){
// 	console.log("hello");
// }
// 初期設定
init = function(){
	// #############s############################################
      // ダイアログの処理を全てOKにする
      page.on('dialog', dialog => {
        console.log('◯削除ボタンのダイアログの設定があります');
        dialog.accept();
      });

      // #########################################################
      // 実行したlogをルートディレクトリのdebug.logファイルに吐き出す
      var fs = require('fs');
      var util = require('util');
      var log_file = fs.createWriteStream(__dirname + '/result.log', {flags : 'w'});
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
        // #########################################################
        // ルートページ(トップページ)
        await page.goto(url);
}



// ユーザー登録とか・・・まとめていけばええんじゃないか？？
// function main(num){
// 	console.log("新規投稿のテスト");
//   console.log(num);
// }

main = function(){
	console.log("hello!!")
}


// // 空欄登録
// function empty_user(){
//   await page.waitForSelector('form');
//   await page.type('#user_name', "");
//   await page.type('#user_email', "")
//   await page.type('#user_password', "")
//   await page.type('#user_password_confirmation', "")
//   await page.click('input[type="submit"]');
//   await page.waitFor(1000);
//   await page.screenshot({path: "images/registration1.png"});
// }


// // 名前の文字数が少ない
// function user_error_message(){
//   await page.waitForSelector('form');
//   await page.type('#user_name', "a");
//   await page.type('#user_email', "a@a");
//   await page.keyboard.press('Backspace');
//   await page.keyboard.press('Backspace');
//   await page.type('#user_password', "aaaaaa");
//   await page.type('#user_password_confirmation', "aaaaaa");
//   await page.click('input[type="submit"]');
//   await page.waitFor(1000);
// }

// // ユーザー登録
// function new_user(user){
// 	await page.waitForSelector('form');
//   await page.waitFor(1000);
//   await page.type('#user_name', "aa");
//   await page.type('#user_email', "a@a")
//   await page.type('#user_password', "aaaaaa")
//   await page.type('#user_password_confirmation', "aaaaaa")
//   await page.click('input[type="submit"]');
//   await page.screenshot({path: "images/registration3.png"});
// }



// // ログアウト
// function function_name(argument) {
// 	// body...
// }



// // ログイン
// console.log("============================")
//   console.log("3.ログインテスト")
//   await page.click('.sign_in');
//   await page.waitForSelector('form');
//   await page.type('#user_name', "aa");
//   await page.type('#user_password', "aaaaaa")
//   await page.click('input[type="submit"]');

//   console.log("サクセスメッセージ")
//   var message = await page.$eval('body', el =>{
//       if (el.textContent.match(/successfully/)){
//           return "◎ログイン後のサクセスメッセージが表示されています"
//       }else{
//           return "・ログインのサクセスメッセージをつけるとさらに良いです"
//       }
//   });
//  console.log(message);
