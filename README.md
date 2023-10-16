# prisma-example

## 概要

Node.js の [Prisma](https://www.prisma.io/) を用いて、 MySQL のテーブル管理を行います。<br>
本リポジトリで扱っている機能は以下となります。

- スキーマ定義
- マイグレーション管理
- シーダー定義
- ER 図自動生成
- Prisma クライアントのコード自動生成
  - TypeScript 向けの型定義
  - 専用のクエリビルダー
- Private の NPM モジュール化
  - Prisma が自動出力する型定義のファイルを API のリポジトリで参照する想定です。

## 環境

- Node.js
  - 20 系

## 事前準備

Node.js のパッケージ マネージャーは [Yarn](https://yarnpkg.com/) を採用しています。<br>
`yarn` が未インストールであれば、以下のコマンドでインストールしてください。

```bash
npm install -g yarn
```

リポジトリをクローンした直後は `node_modules/` ディレクトリが存在しない為、<br>
以下のパッケージインストールコマンドを実行してください。

```bash
yarn install
```

ローカルのデータベース環境では Docker コンテナを採用しています。<br>
事前に [Docker Desktop](https://www.docker.com/products/docker-desktop/) をインストールし、コマンドが通るか確認してください。

```bash
$ docker-compose -v
Docker Compose version v2.15.1
```

## コマンドについて

- マイグレーション & 各種自動生成

    ```bash
    yarn migrate
    ```

- 各種自動生成

    ```bash
    yarn generate
    ```

- シーディング

    ```bash
    yarn seeds
    ```

- コンテナ起動

    ```bash
    docker-compose up -d
    ```

- コンテナ停止

    ```bash
    docker-compose down
    ```

詳細は `package.json` の `scripts` を参照してください。

## 開発環境構築について

開発環境のデータベースには Docker を利用します。<br>
事前に `Docker Desktop` を起動しておいてください。

### 手順

1. `docker-compose.yml`を作成してください。

1. 開発用のデータベースコンテナを起動します。

    ```bash
    docker-compose up -d
    ```

1. 以下のコマンドを実行し、`schema.prisma`を作成してください。

    ```bash
    npx prisma init
    ```

1. `.env`ファイルにDBの接続情報を入力してください。

1. シーダー用のファイルを作成します。

    ```
    - prisma
        └ seeds
            └ index.ts
    ```

1. 自動生成させるファイルがないため以下のコマンドを実行します。

    ```bash
    yarn generate
    ```

1. テーブルが存在しないのでマイグレーションを実行します。

    ```bash
    yarn migrate
    ```

1. テーブルにレコードがない為、シーダーを実行します。

    ```bash
    yarn seeds
    ```

1. MySQL のクライアントで接続し、テーブルに初期値が入っていれば完了です。

   - 接続情報は [こちら](./docker-compose.yml) を参照してください。
