import fs from 'fs'
import { isAbsolute, join } from 'path'
import { remote } from 'electron'
import childProcess from 'child_process'
import {
  getErrors,
  separateOutputFromTreeSection,
  transformIntoOutputLine
} from './utils/console'

export const getFileName = () => {
  const path = remote.getGlobal('path')
  return path
}

export const getArgPath = () => {
  const path = remote.getGlobal('path')

  if (isAbsolute(path)) return path

  return join(process.cwd(), path)
}

export const readDir = (path: string) =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (!err) return resolve(files)
      return reject(err)
    })
  })

export const readFile = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, files) => {
      if (!err) return resolve(files)
      return reject(err)
    })
  })

export const saveFile = (path: string, data: any): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (!err) return resolve()
      return reject(err)
    })
  })

export const runCode = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const sourcePath =
      '/Users/vagnerwentz/Documents/learning/cthulu_ide/examples/hello.ms'
    const destinationPath = '/Users/vagnerwentz/Projects/compiler/samples/hello'

    const cpFiles = `cp ${sourcePath} ${destinationPath}`
    childProcess.exec(cpFiles, (error, stdout, stderr) => {
      try {
        if (error) {
          console.error(`Erro: ${error.message}`)
          return
        }
        if (stderr) {
          console.error(`Erro padrão: ${stderr}`)
          return
        }

        childProcess.exec(
          '/Users/vagnerwentz/Projects/compiler/src/Inputer/bin/Debug/Inputer',
          (err, out: string) => {
            if (!err) resolve(out)
            return reject(err)
          }
        )
        console.log(`Arquivo copiado com sucesso para ${destinationPath}`)
      } catch (ex) {
        console.log('erro' + ex)
      }
    })
  })

export const compile = async (path: string) => {
  const rawOutput = await runCode(path)

  const [consoleSection, tree] = separateOutputFromTreeSection(rawOutput)

  const output = transformIntoOutputLine(consoleSection)
  const errors = getErrors(output)

  console.log(errors)

  if (!errors.length) {
    output.push({
      className: 'success',
      children: 'Sucesso ao compilar'
    })
  } else {
    output.push({
      className: 'error',
      children: 'Falha ao compilar'
    })
  }

  return { output, tree, errors }
}
