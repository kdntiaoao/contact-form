import useSWR from 'swr'

import { ContactInfo } from 'types/data'
import { fetcher } from 'utils/fetcher'

/**
 * お問い合わせ情報のカスタムフック
 * @param id お問い合わせID
 * @param fallbackData 初期データ
 * @return {Object} { お問い合わせ情報, ローディングフラグ, エラー, ミューテーション }
 */
export const useContactInfo = (id: string, fallbackData?: ContactInfo) => {
  const { data, error, mutate } = useSWR<ContactInfo>(`/api/contact/${id}`, fetcher, { fallbackData })

  return { contactInfo: data, loading: !error && !data, error, mutate }
}
