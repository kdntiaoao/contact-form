import useSWR from 'swr'

import { ContactInfoList } from 'types/data'
import { fetcher } from 'utils/fetcher'

/**
 * お問い合わせ情報リストのカスタムフック
 * @param fallbackData 初期データ
 * @return {Object} { お問い合わせ情報リスト, ローディングフラグ, エラー, ミューテーション }
 */
export const useContactInfoList = (fallbackData?: ContactInfoList) => {
  const { data, error, mutate } = useSWR<ContactInfoList>('/api/contact', fetcher, { fallbackData })

  return { contactInfoList: data, loading: !error && !data, error, mutate }
}
