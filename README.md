# Text Wrap

[![npm version](https://badge.fury.io/js/@universal-packages%2Fworkflows.svg)](https://www.npmjs.com/package/@universal-packages/text-wrap)
[![Testing](https://github.com/universal-packages/universal-text-wrap/actions/text-wrap/testing.yml/badge.svg)](https://github.com/universal-packages/universal-text-wrap/actions/text-wrap/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-text-wrap/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-text-wrap)

## Install

```shell
npm install @universal-packages/text-wrap
```

## Global methods

#### **`wrap(text: string, width: number, [options: Object])`**

Wraps a string to a given width.

```js
import { wrapText } from '@universal-packages/text-wrap'

const wrappedText = wrapText('This is some super long text', 10)

console.log(wrappedText)
// > This is
// > some super
// > long text
```

##### Options

- **`align`** `'left' | 'right' | 'center' | 'justify'` `default: 'left'`
  Aligns the text within the width.

  ```js
  const wrappedTextCenter = wrapText('This is some super long text', 9, { align: 'center' })

  console.log(wrappedTextCenter)
  // >  This is
  // >   some
  // >   super
  // > long text

  const wrappedTextRight = wrapText('This is some super long text', 10, { align: 'right' })

  console.log(wrappedTextRight)
  // >    This is
  // > some super
  // >  long text

  const wrappedTextJustify = wrapText('This is some super long text', 10, { align: 'justify' })

  console.log(wrappedTextJustify)
  // > This    is
  // > some super
  // > long  text
  ```

- **`fillBlock`** `boolean` `default: false`
  Fills the block with spaces to the width.

  ```js
  const wrappedTextFillBlock = wrapText('This is some super long text', 10, { fillBlock: true })

  console.log(wrappedTextFillBlock)
  // > This is°°°
  // > some super
  // > long text°
  ```

- **`hyphenate`** `'always' | 'word' | 'never'` `default: 'never'`
  Breaks words to fit the width, and adds a hyphen to the end of the line. Use `always` to always hyphenate to fit the width on each line that needs it. Use `word` to only hyphenate words that are too long to fit the width. Use `never` or do not pass the option to disable hyphenation. The hyphenation follows just a few simple rules, like we don't break words smaller than 4 characters, and we only hyphenate text aligned to the left.

  ```js
  const wrappedTextHyphenate = wrapText('This is some super long text', 10, { hyphenate: 'always' })

  console.log(wrappedTextHyphenate)
  // > This is s-
  // > ome super
  // > long text

  const wrappedTextHyphenateWord = wrapText('This is some large text and a very ultramegalarge word', 10, { hyphenate: 'word' })

  console.log(wrappedTextHyphenateWord)

  // > This is
  // > some large
  // > text and a
  // > very ultr-
  // > amegalarg-
  // > e word
  ```

- **`padding`** `number | [number. number, number. number]` `default: 0`
  Adds padding to the wrapped lines. You can pass a single number to add the same padding to all sides, or an array with 4 numbers to add padding to each side in the following order: top, right, bottom, left.

  ```js
  const wrappedTextPadding = wrapText('This is some super long text', 10, { padding: 2 })

  console.log(wrappedTextOnFinishLine)
  // > °°°°°°°°°°°°°°
  // > °°°°°°°°°°°°°°
  // > °°This is°°°°°
  // > °°some super°°
  // > °°long text°°°
  // > °°°°°°°°°°°°°°
  // > °°°°°°°°°°°°°°
  ```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
