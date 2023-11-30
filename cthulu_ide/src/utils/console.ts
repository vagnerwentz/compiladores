const PARSE_SECTION_TOKEN = 'Parse tree\n'
// const ERROR_TOKEN = '> Encontrado:'

export type OutputLine = {
  className: string
  children: string
}

export type CompileError = {
  row?: number
  col?: number
}

export const separateOutputFromTreeSection = (value: string) => {
  // eslint-disable-next-line no-unused-vars
  const [_ = '', tree = ''] = value.split(PARSE_SECTION_TOKEN)
  const trimmedTree = value.replace(/^([\s\S]*?EndOfFileToken\s*)/, '')
  return [trimmedTree, tree]
}

export const transformIntoOutputLine = (out: string): OutputLine[] =>
  out.split(/\n/g).map(children => ({ className: '', children }))

export const getErrors = (lines: OutputLine[]): CompileError[] => {
  return lines
    .filter(el => {
      const regex = /\(\d+,\d+,\d+,\d+\):.*/
      return el.children.match(regex)
    })
    .map(error => {
      const positionAsString = error.children
        .replace(/.*\((\d+,\d+,\d+,\d+)\).*/, '$1')
        .replace(/[^\d,]/g, '')

      const position = positionAsString.split(',')
      console.log('position ' + position)

      const row = Number.parseInt(position[0])
      const col = Number.parseInt(position[1])
      console.log('row ' + row)
      console.log('col ' + col)

      return { row, col }
    })
}
