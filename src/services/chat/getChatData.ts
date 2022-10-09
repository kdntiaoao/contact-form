import { ChatData } from 'types/data'

export const getChatData = async (contactId: string): Promise<ChatData> => {
  const res = await fetch(`/api/chat/${contactId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  const chatData = await res.json()
  return chatData
}
