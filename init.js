// #########################################################
        // ダイアログの処理を全てOKにする
const page = await browser.newPage();
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
