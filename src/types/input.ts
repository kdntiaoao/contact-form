/**
 * お問い合わせフォームの入力フィールド
 */
export type ContactFormInputsType = {
  /**
   * お客様の名前
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
}

/**
 * チャットフォームの入力フィールド
 */
export type ChatFormInputType = {
  /**
   * チャットテキスト
   */
  text: string
}
