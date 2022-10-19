import { hslToRgb, rgbToHex } from '@mui/material'

export const generateRandomColor = (): string => {
  const h: number = Math.random() * 360
  const rgb = hslToRgb(`hsl(${h}, 80, 60)`)
  const hex = rgbToHex(rgb)
  return hex
}
