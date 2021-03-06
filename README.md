# よく使うgulpの記述まとめ

- reload-only
- sftp
- scss
- compass
- custom
- sequence
- once
- browserify  -> **[NEW]**

## reload-only
- 指定ディレクトリ以下のhtml, css, jsの変更を感知し、ライブリロードを行う
- とりあえずさっと確認・作成したい時によく使う

## ssi
- ssiインクルードを使えるようにする
- インクルード以外のことができるかどうは未確認

## sftp
- ローカルファイルをどこかサーバー上へアップ
- 現在制作中のディレクトリ以下、もしくはdocumentRoot以下を一括送信
- ここでは送り先はvagrantを指定
- ローカルとホストのpathはgulpfile.jsで適宜指定
- 同名ファイルは上書きされるので注意

> 項目を分けはしたものの、実際にはタスクの一つとして行うことが多い

## scss
- scssのコンパイル
- html, css, jsのライブリロード

## compass
- compassのコンパイル
- html, css, jsのライブリロード

## custom
- scssのコンパイル
- jsの圧縮結合
- htmlテンプレートエンジンの利用（jade）
- 少しパフォーマンスや効率化を意識したときに使用することが多い

### 以下は除外

- altjs
- png画像の圧縮、CSSスプライト
	- タスクランナーとは別のツールを使うことが多いため

## sequence
- 並列ではなく直列（同期的）で処理を行う
- これをやってからこの処理を行う、という場合に有効

## once
- 連続イベントの発生を抑制
- 例えばwatch時に複数ファイルの変更を（ほぼ）同時に感知した時に、何度も同じ処理をさせないようにする


## browserify
- browserifyの実行
- html, css, jsのライブリロード
- エラーが出てもwatchは止めない
- 圧縮することも可能
