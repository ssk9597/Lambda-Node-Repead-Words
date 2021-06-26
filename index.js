'use strict';

// パッケージのインストール
const line = require('@line/bot-sdk');

// LINEアクセストークンの設定
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// インスタンス化
const client = new line.Client(config);

exports.handler = async (event, context) => {
  // eventを出力
  console.log(event);

  // JSONとして解析して値やオブジェクトを構築する
  const body = JSON.parse(event.body);
  console.log(`【body】: ${JSON.stringify(body)}`);

  // LINE Eventを取得
  const response = body.events[0];
  console.log(`【response】: ${JSON.stringify(response)}`);

  // メッセージ送信のために必要な情報
  const replyToken = response.replyToken;
  const post = {
    type: 'text',
    text: response.message.text,
  };

  try {
    await client.replyMessage(replyToken, post);
  } catch (err) {
    console.log(err);
  }
};
