import { WrapTextOptions } from './types'
import { synthesizeWrappedLine } from './utils'
import { wrap } from './wrap'

export function wrapText(text: string, options?: WrapTextOptions): string {
  return wrap(text, options).map(synthesizeWrappedLine).join('\n')
}
