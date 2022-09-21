export type ContactInfo = {
  name: string // お客様のお名前
  email: string // お客様のメールアドレス
  tel: string // お客様の電話番号
  category: string // 商品種別
  submitTime: number // フォーム送信日時(タイムスタンプ)
}

export type Chat = {
  contributor: string // 投稿者ID(お客様の場合は"0")
  postTime: number // チャット投稿日時(タイムスタンプ)
  // チャットが投稿された場合はtextにその内容が
  // 状態が変更された場合はnewStatusに新しい状態が入る
  contents: {
    text?: string // チャットのメッセージ
    newStatus?: number // 変更後の状態
  }
}

export type ChatData = {
  chatHistory: Chat[] // チャット履歴
  currentStatus: number // 現在の状態
  supporter: string // サポーターID(担当者がいない場合は"0")
}

export type SupporterData = {
  [supporterId: string]: {
    name: string // サポーターのお名前
    email: string // サポーターのメールアドレス
  }
}
