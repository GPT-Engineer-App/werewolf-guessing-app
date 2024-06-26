# werewolf-guessing-app

ワンナイト人狼の人狼を当てるアプリ(ver.07)。

登場人物は6人です。そのうち1名の「たろう」が最初に亡くなり、残った5人はそれぞれ「いちろう」「じろう」「さぶろう」「ななこ」「はなこ」という名前で、1人につき1つ役職を持っています。
「いちろう」「じろう」「さぶろう」「ななこ」「はなこ」の5人の役職は、人狼2人、村人3人、占い師1人、怪盗1人の中からランダムに選ばれます。
この時、人狼が0人になっても、占い師が0人になっても、怪盗が0人になっても問題ありません。
この時点では、誰がどの役職になったかは一切メッセージで表示されることはありません。

昨晩「たろう」が亡くなったことを表示してください。この時、「スタート」ボタンを表示してください。
プレイヤーは「スタート」ボタンを押すことで、ゲームを開始します。
ゲーム開始後、タイマーを3分のカウントダウン形式で表示してください。
この時、「いちろう」「じろう」「さぶろう」「ななこ」「はなこ」のメッセージを、下記に従って全員分表示してください。
役職が占い師の人は、自分が占い師であることと、他の4人のうち1人をランダムで選択して選択した人の名前と役職を表示してください。
役職が村人の人は、自分が村人であることを表示してください。
役職が人狼の人は、①自分が村人であること、もしくは②自分が占い師であることと役職が占い師以外の人の名前とその人が村人であること、もしくは③自分が占い師であることと役職が人狼以外の人の名前とその人が人狼であることを、ランダムにいずれかのみ表示してください。
役職が怪盗の人は、残りの4人のうち1人をランダムで選択し、その人の役職と自分の役職である怪盗の役職を交換します。
このとき、交換後に怪盗となった人は、自分の役職が変わったことに気づいていない設定です。
役職の交換前に怪盗だった人は、役職の交換後の役職が人狼でない場合、自分が怪盗であったことと役職を交換した人の名前と交換後の自分の役職を表示してください。
役職の交換前に怪盗だった人は、役職の交換後の役職が人狼の場合、①自分が村人であること、もしくは②自分が怪盗であったことと役職を交換した人以外の人の名前と交換後に自分の役職が村人であることを、ランダムにどちらかのみ表示してください。
つまり、自分の役職が人狼であると認識している人は人狼以外の役職になりきるという設定です。
プレイヤーは全員分のメッセージを見て、3分以内に誰か1名を吊る、もしくは誰も吊らないかを選択します。

怪盗が役職を交換した後の役職が人狼以外の人を選択した場合は「プレイヤーの敗北」と赤字で表示してください。
怪盗が役職を交換した後の役職が人狼の人を選択した場合は「プレイヤーの勝利！」と黒字で表示してください。
誰も吊らないことを選択した場合は、5人の中に役職が人狼の人がいなかった場合は「プレイヤーの勝利！」と黒字で表示し、5人の中に役職が人狼の人がいた場合は「プレイヤーの敗北」と赤字で表示してください。
選択せずに3分経過した場合は、5人の中に役職が人狼の人がいなかった場合は「プレイヤーの勝利！」と黒字で表示し、5人の中に役職が人狼の人がいた場合は「プレイヤーの敗北」と赤字で表示してください。

この時「誰がどの役職かを確認する」というボタンを表示し、そのボタンを押すと、5人全員の役職を怪盗が役職を交換する前と交換した後で分けて表示されるようにしてください。
この時リトライボタンを表示し、そのボタンを押すとゲームを最初からスタートできるようにしてください。

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/werewolf-guessing-app.git
cd werewolf-guessing-app
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
