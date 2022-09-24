export type ContactInfo = {
  /**
   * お客様のお名前
   */
  name: string
  /**
   * お客様のメールアドレス
   */
  email: string
  /**
   * お客様の電話番号
   */
  tel: string
  /**
   * 商品種別
   */
  category: string
  /**
   * お問い合わせ内容
   */
  contents: string
  /**
   * サポーターID(担当者がいない場合は"0")
   */
  supporter: string
  /**
   * フォーム送信日時(タイムスタンプ)
   */
  submitTime: number
}

export type Chat = {
  /**
   * 投稿者ID(お客様の場合は"0")
   */
  contributor: string
  /**
   * チャット投稿日時(タイムスタンプ)
   * チャットが投稿された場合はtextにその内容が状態が変更された場合はnewStatusに新しい状態が入る
   */
  postTime: number
  contents: {
    /**
     * チャットのメッセージ
     */
    text?: string
    /**
     * 変更後の状態
     */
    newStatus?: number
  }
}

export type ChatData = Chat[]

export type SupporterData = {
  /**
   * サポーターのお名前
   */
  name: string
  /**
   * サポーターのメールアドレス
   */
  email: string
}
