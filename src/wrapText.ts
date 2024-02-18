import { WrapTextOptions } from './types'
import { wrap } from './wrap'

export function wrapText(text: string, options?: WrapTextOptions): string {
  return wrap(text, options)
    .map((line) => line.leftFill + line.text + line.rightFill)
    .join('\n')
}
