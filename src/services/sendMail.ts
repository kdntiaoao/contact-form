import { ContactFormInputsType } from 'types/input'

export const sendMail = async (
  { name, email, tel, category, contents }: ContactFormInputsType,
  docId: string
): Promise<void> => {
  await fetch('/api/send', {
    body: JSON.stringify({
      name,
      email,
      tel,
      category,
      contents,
      chatUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/${docId}`,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}
