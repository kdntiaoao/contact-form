import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: req.body.email,
      from: 'supporter@example.com',
      subject: 'お問い合わせありがとうございました。',
      text: `お問い合わせを受け付けました。

----------------------------------------

◆お問い合わせ情報
＜お名前＞
${req.body.name}
＜メールアドレス＞
${req.body.email}
＜電話番号＞
${req.body.tel}
＜商品種別＞
${req.body.category}
＜お問い合わせ内容＞
${req.body.contents}

----------------------------------------

翌営業日までに下記のリンク先にてサポーターがご対応いたしますので、
今しばらくお待ち下さい。

▼連絡用チャットリンク
${req.body.chatUrl}`,
      html: `お問い合わせを受け付けました。<br>
<br>
----------------------------------------<br>
<br>
◆お問い合わせ情報<br>
＜お名前＞<br>
${req.body.name}<br>
＜メールアドレス＞<br>
${req.body.email}<br>
＜電話番号＞<br>
${req.body.tel}<br>
＜商品種別＞<br>
${req.body.category}<br>
＜お問い合わせ内容＞<br>
${req.body.contents}<br>
<br>
----------------------------------------<br>
<br>
翌営業日までに下記のリンク先にてサポーターがご対応いたしますので、<br>
今しばらくお待ち下さい。<br>
<br>
▼連絡用チャットリンク<br>
${req.body.chatUrl}`,
    }

    ;(async () => {
      try {
        await sgMail.send(msg)
      } catch (error) {
        console.error(error)
      }
    })()
  }

  res.status(200).end()
}

export default handler
