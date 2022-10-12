import { Supporter } from 'types/data'

export const addSupporter = async (uid: string, supporter: Supporter) => {
  await fetch('/api/supporter', {
    body: JSON.stringify({ uid, supporter }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}
