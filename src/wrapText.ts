import { WrapTextOptions } from './types'
import { wrap } from './wrap'

export function wrapText(text: string, width: number, options?: WrapTextOptions): string {
  return wrap(text, width, options)
    .map((line) => line.leftFill + line.text + line.rightFill)
    .join('\n')
}
