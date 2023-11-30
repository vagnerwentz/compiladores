import { v4 } from 'uuid'
import JsTreeList from 'js-tree-list'

type DepthListItem = {
  depth: number
  name: string
}

type ListTreeNode = {
  id: string | number
  depth: number
  parent: string | number | null
  name: string
}

// const _listLastItem = (list: any[]) => list[list.length - 1]

const _listTreeEntries = (value: string) => value.match(/\t\|\t(\s)*.*/g)

const _convertToDepthList = (list: string[]) =>
  list.map(line => {
    const lineWithoutTabs = line.replace(/\t\|\t/g, '')
    const lineWithoutSpaces = line.replace(/[\t|\s]/g, '')
    const depth = lineWithoutTabs.match(/\s/g)?.length || 0

    return { depth, name: lineWithoutSpaces }
  })

const _convertDepthListToRelationshipList = (list: DepthListItem[]) => {
  const relationshipList: ListTreeNode[] = []

  list.forEach(item => {
    if (!relationshipList.length) {
      return relationshipList.push({ ...item, id: v4(), parent: null }) // Defina parent como null para o nó raiz
    }

    // Encontrar o pai correspondente
    const parent = relationshipList
      .slice()
      .reverse()
      .find(el => el.depth < item.depth)
    if (!parent) {
      console.warn('Parent not found!')
      return
    }

    return relationshipList.push({
      ...item,
      id: v4(),
      parent: parent.id
    })
  })

  return relationshipList
}

export const parseStringToTree = (value: string) => {
  const regex = /(EndOfFileToken[\s\S]*)/
  const result = value.replace(regex, 'EndOfFileToken')

  const treeEntries = _listTreeEntries(result)

  if (!treeEntries) return {}

  const orderedDepthList = _convertToDepthList(treeEntries)

  const relationshipList = _convertDepthListToRelationshipList(orderedDepthList)

  const [tree = {}] = new JsTreeList.ListToTree(relationshipList, {
    key_id: 'id',
    key_parent: 'parent',
    key_child: 'children',
    empty_children: true,
    uuid: true
  }).GetTree()

  return tree
}
