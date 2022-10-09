import { Chat } from 'types/data'

export const addChat = async (chatId: string, chat: Chat): Promise<void> => {
  await fetch('/api/chat', {
    body: JSON.stringify({ chatId, chat }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}
