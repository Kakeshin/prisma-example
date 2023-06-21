# prisma-example

![](https://img.shields.io/badge/Node.js-20.x-339933)
![](https://img.shields.io/badge/TypeScript-5.x-2C8EBB)
![](https://img.shields.io/badge/Prisma-4.x-2D3748)

## 目次

- [prisma-example](#prisma-example)
  - [目次](#目次)
  - [概要](#概要)
  - [環境](#環境)
    - [推奨 VSCode 拡張機能](#推奨-vscode-拡張機能)
  - [事前準備](#事前準備)
  - [ディレクトリ構成](#ディレクトリ構成)
  - [コマンドについて](#コマンドについて)
  - [ER 図について](#er-図について)
  - [開発環境構築について](#開発環境構築について)
    - [手順](#手順)

## 概要

I-FACE 用のデータベース管理用のリポジトリです。

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
  - 18 系を採用 (2023/4 時点で 最新のLTSである為)
    - ⚠️ 18 のサポート期間は 2025/4 まで
    - 🔖 Node.js 20 が 2023/10 からLTSに入る為、その辺りの時期に Node.js 20 へ移行を検討してください。

### 推奨 VSCode 拡張機能

|#|項目|備考|
|-|-|-|
|1|[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)|ESLintで検出された警告をVSCode上で表示してくれる|
|2|[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)|コードを自動整形してくれるプラグイン|
|3|[vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)|VSCodeのファイルツリーに拡張子に合ったアイコンを表示してくれる|
|4|[Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)|VSCode上でDockerコンテナを管理できるようにしてくれる|
|5|[Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)|Prismaスキームのシンタックスハイライトやフォーマットをサポートしてくれる|

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

## ディレクトリ構成

```
.
├── docker-compose.yml      ... ローカル環境用のDockerコンテナ定義
├── mysql
│   └── conf
│
├── erDiagram.svg           ... ER 図
│
├── prisma
│   ├── migrations          ... マイグレーションファイル（migrateコマンド実行すると自動生成される）
│   ├── schema.prisma       ... スキームファイル
│   └── seeds               ... シーダーファイル
└── src
    └── client              ... prisma が自動生成するファイル
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

- ESLint

    ```bash
    yarn lint
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

## ER 図について

自動生成された ER 図はこちらをご参照してください。

- [プレビュー](erDiagram.svg)

GitLab のバージョンによっては正常にプレビューが保証できない為、<br>
VSCode で開くことを推奨します。

また ER 図は mermaid の erDiagram を用いて表現しております。<br>
VSCode でプレビュー表示する場合は、以下の拡張機能をインストールしてください。

- [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)

## 開発環境構築について

開発環境のデータベースには Docker を利用します。<br>
事前に `Docker Desktop` を起動しておいてください。

### 手順

1. 開発用のデータベースコンテナを起動します。

    ```bash
    docker-compose up -d
    ```

1. 以下のコマンドを実行し、開発環境用の `.env` ファイルを作成してください。

    ```bash
    cp .env.local .env
    ```

1. テーブルが存在しないのでマイグレーションを実行します。

    ```bash
    yarn migrate
    ```

1. マスタ系テーブルにレコードがない為、シーダーを実行します。

    ```bash
    yarn seeds
    ```

1. MySQL のクライアントで接続し、マスタ系テーブルに初期値が入っていれば完了です。

   - 接続情報は [こちら](./docker-compose.yml) を参照してください。
