import React from 'react'
import SimpleCodeEditor from 'react-simple-code-editor'
import { languages } from 'prismjs'
import { highlightWithLineNumbers } from '../../utils/editor'

import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-crystal'
import 'prismjs/themes/prism.css'
import { CompileError } from '../../utils/console'

interface IEditorProps {
  value: string
  errors?: CompileError[]
  onChange: (value: string) => void
}

export const Editor: React.VFC<IEditorProps> = ({
  value,
  errors = [],
  onChange
}) => {
  const adaptErrosToRows = (err: CompileError[]): number[] => {
    const items = err.map(el => el.row)
    const filteredItems = items.filter(el => !!el) as number[]

    return filteredItems
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-6"></div>
      <SimpleCodeEditor
        tabSize={2}
        padding={10}
        textareaId="code"
        className="editor"
        value={value}
        onValueChange={onChange}
        highlight={value =>
          highlightWithLineNumbers(
            value,
            languages.crystal,
            'crystal',
            adaptErrosToRows(errors)
          )
        }
      />
    </div>
  )
}
