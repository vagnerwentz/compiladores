import './styles/global.css'
import React, { useState } from 'react'

import { Tree } from './components/containers/Tree'
import { Code } from './components/containers/Code'
import { Console } from './components/containers/Console'
import { Template } from './components/Template'
import { compile, getArgPath } from './services'
import { parseStringToTree } from './utils/tree'
import { CompileError, OutputLine } from './utils/console'

export const App = () => {
  const [output, setOutput] = useState<OutputLine[]>([])
  const [errors, setErrors] = useState<CompileError[]>([])
  const [tree, setTree] = useState({})

  const handleClear = () => {
    setOutput([])
    setErrors([])
    setTree({})
  }

  const handleRun = async () => {
    try {
      const path = getArgPath()
      const response = await compile(path)

      setErrors(response.errors)
      console.log('to mlauco')
      console.log('d' + response.errors)
      if (response.errors.length === 0) {
        console.log('eroooooo')
        setTree(parseStringToTree(response.tree))
      }

      if (response.errors.length !== 0) {
        setTree({})
      }

      setOutput(response.output)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Template>
      <Code errors={errors} onSave={handleRun} />
      <Console output={output} onClear={handleClear} />
      <Tree data={tree} />
    </Template>
  )
}
