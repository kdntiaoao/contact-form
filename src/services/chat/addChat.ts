import { Chat } from 'types/data'

export const addChat = async (contactId: string, chat: Chat): Promise<string> => {
  const res = await fetch(`/api/chat/${contactId}`, {
    body: JSON.stringify({ chat }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return res.json()
}
