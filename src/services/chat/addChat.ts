import { Chat } from 'types/data'

export const addChat = async (docId: string, chat: Chat): Promise<void> => {
  await fetch('/api/chat', {
    body: JSON.stringify({ docId, chat }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}
