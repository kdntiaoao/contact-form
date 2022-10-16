import useSWR from 'swr'

import { ChatData } from 'types/data'
import { fetcher } from 'utils/fetcher'

/**
 * チャットデータのカスタムフック
 * @param id お問い合わせID
 * @param fallbackData 初期データ
 * @returns チャットデータ
 */
export const useChatData = (id: string | undefined, fallbackData?: ChatData) => {
  const { data, error, mutate } = useSWR<ChatData>(`/api/chat/${id}`, fetcher, { fallbackData })

  return { chatData: data, loading: !error && !data, error, mutate }
}
