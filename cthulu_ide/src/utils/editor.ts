import React from 'react'
import { Grammar, highlight } from 'prismjs'

export const isModifyTextKeyboardEvent = (event: React.KeyboardEvent) =>
  !event.key.match(/ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Alt|Control/g)
    ?.length

const withLineNumber = (index: number) =>
  `<span class="editor-line-number">${index + 1}</span>`

const withErrorHighlight =
  (index: number, errors: number[]) => (children: string) => {
    const line = index + 1
    const isError = !!errors.filter(error => error === line).length

    return `<span class="${!isError ? '' : 'error-line'}">${children}</span>`
  }
export const highlightWithLineNumbers = (
  value: string,
  grammar: Grammar,
  lang: string,
  errors: number[] = []
) =>
  highlight(value, grammar, lang)
    .split('\n')
    .map((line, index) =>
      withErrorHighlight(index, errors)(`${withLineNumber(index)}${line}`)
    )
    .join('\n')
