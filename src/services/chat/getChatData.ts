import { ChatData } from 'types/data'

export const getChatData = async (chatId: string): Promise<ChatData | null> => {
  const res = await fetch(`/api/chat/${chatId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  const chatData = (await res.json()) as ChatData
  return chatData
}
