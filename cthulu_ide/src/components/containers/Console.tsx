import React from 'react'
import { FiTerminal, FiTrash } from 'react-icons/fi'
import { OutputLine } from '../../utils/console'

interface IConsoleProps {
  output?: OutputLine[]
  onClear?: () => void
}

export const Console: React.VFC<IConsoleProps> = ({
  output = [],
  onClear = () => {}
}) => {
  return (
    <div className="console">
      <div className="header text-white">
        <div className="title">
          <FiTerminal />
          <h2>Output</h2>
        </div>
        <div className="actions">
          <button className="icon-btn" onClick={onClear}>
            <FiTrash />
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-shrink flex-grow overflow-auto">
        <div className="px-8 w-auto h-full font-mono text-white text-xs">
          {output.map((el, key) => (
            <span
              className={`block w-full break-words ${el.className}`}
              key={`console-line-${key}`}
            >
              {el.children}
            </span>
          ))}
          <div className="h-1/3"></div>
        </div>
      </div>
    </div>
  )
}
