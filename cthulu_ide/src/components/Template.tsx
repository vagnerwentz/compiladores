import React from 'react'

interface ITemplateProps {
  children: React.ReactElement[]
}

export const Template: React.FC<ITemplateProps> = ({ children = [] }) => {
  return (
    <main className="flex flex-col md:flex-row h-screen w-screen">
      <div className="w-full md:w-2/3 lg:w-3/4 md:flex md:flex-row">
        <div className="w-1/2">{children[0]}</div>
        <div className="w-1/2">{children[1]}</div>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4">{children[2]}</div>
    </main>
  )
}
