import React, { useState, useEffect } from 'react'
import { FiFile, FiPlay, FiSave } from 'react-icons/fi'

import { Editor } from '../fragments/Editor'
import { getArgPath, getFileName, readFile, saveFile } from '../../services'
import { isModifyTextKeyboardEvent } from '../../utils/editor'
import { CompileError } from '../../utils/console'

interface ICodeProps {
  errors?: CompileError[]
  onChange?: () => void
  onSave?: () => void
  onLoad?: () => void
}

export const Code: React.VFC<ICodeProps> = ({
  errors = [],
  onChange = () => {},
  onSave = () => {},
  onLoad = () => {}
}) => {
  const [isSaved, setIsSaved] = useState(true)
  const [code, setCode] = useState('')

  useEffect(() => {
    handleLoadFile()
  }, [])

  useEffect(() => {
    onChange()
  }, [code])

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    if (isModifyTextKeyboardEvent(event)) setIsSaved(false)

    if (event.ctrlKey && event.key === 's') handleSaveFile()
  }

  const handleLoadFile = async () => {
    try {
      const path = getArgPath()
      const fileAsBuffer = await readFile(path)
      const fileAsString = fileAsBuffer.toString('utf-8')
      setCode(fileAsString)
      onLoad()
      console.log(path, 'Carregado com sucesso!')
    } catch (error) {
      console.warn(error)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleSaveFile = async () => {
    try {
      const path = getArgPath()
      await saveFile(path, code)
      setIsSaved(true)
      onSave()
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <div
      className="flex flex-col h-full w-full bg-gray-50"
      onKeyDown={handleKeyboardEvent}
    >
      <div className="header">
        <div className="title">
          <FiFile />
          <h2 className={`font-normal ${!isSaved && 'italic'}`}>
            {getFileName()}
          </h2>
        </div>
        <div className="actions">
          <button className="icon-btn" onClick={onSave}>
            <FiPlay />
          </button>
          <button className="icon-btn" onClick={handleSaveFile}>
            <FiSave />
          </button>
        </div>
      </div>
      <Editor value={code} errors={errors} onChange={setCode} />
    </div>
  )
}
