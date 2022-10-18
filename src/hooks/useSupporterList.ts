import useSWR from 'swr'

import { SupporterList } from 'types/data'
import { fetcher } from 'utils/fetcher'

/**
 * チャットデータのカスタムフック
 * @param fallbackData 初期データ
 * @returns {Object} { サポーターリスト, ローディングフラグ, エラー, ミューテーション }
 */
export const useSupporterList = (fallbackData?: SupporterList) => {
  const { data, error, mutate } = useSWR<SupporterList>('/api/supporter', fetcher, { fallbackData })

  return { supporterList: data, loading: !error && !data, error, mutate }
}
