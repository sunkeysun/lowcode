/**
 * nodes entity
 */
import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
  type EntityState,
} from '@reduxjs/toolkit'
import { type RootState } from '..'
import { type Props } from '../../types'

export interface NodeEntity {
  id: string
  title: string
  componentName: string
  props: Props
  childIds: string[]
  parentId: string | null
  documentId: string
  childNodes?: NodeEntity[]
  isLocked: boolean
  hidden: boolean
}

const adapter = createEntityAdapter<NodeEntity>()

function insert(
  state: EntityState<NodeEntity>,
  payload: { refId: string; node: NodeEntity },
  location: 'before' | 'after',
) {
  const {
    node: { childNodes, ...insertNode },
    refId,
  } = payload
  const { parentId } = insertNode
  if (!parentId || !refId) {
    return
  }
  const refNode = state.entities[refId]
  if (!refNode || !refNode.parentId) return

  const refParentNode = state.entities[refNode.parentId]
  const parentNode = state.entities[parentId]
  if (!refParentNode || !parentNode) return

  const refIndex = refParentNode.childIds?.findIndex(
    (childId) => childId === refId,
  )
  if (refIndex < 0) return

  if (state.entities[insertNode.id]) {
    parentNode.childIds = parentNode.childIds.filter(
      (childId) => childId !== insertNode.id,
    )
    adapter.updateOne(state, {
      id: insertNode.id,
      changes: { ...insertNode, parentId: refNode.parentId },
    })
  } else {
    adapter.addOne(state, {
      ...insertNode,
      parentId: refNode.parentId,
    })
  }
  const targetIndex = location === 'before' ? refIndex : refIndex + 1
  refParentNode.childIds.splice(targetIndex, 0, insertNode.id)

  if (childNodes) {
    adapter.addMany(state, childNodes)
  }
}

export const name = 'node'
export const slice = createSlice({
  name,
  initialState: adapter.getInitialState(),
  reducers: {
    remove(state, action: PayloadAction<string>) {
      const { payload: nodeId } = action
      function removeTree(nodeId: string) {
        const parentId = state.entities[nodeId]?.parentId
        const childrenIds = state.entities[nodeId]?.childIds ?? []
        if (parentId) {
          const parentNode = state.entities[parentId]
          if (parentNode) {
            const childIndex = parentNode.childIds.findIndex(
              (childId) => childId === nodeId,
            )
            parentNode.childIds.splice(childIndex, 1)
          }
        }
        if (childrenIds?.length > 0) {
          childrenIds.forEach((childId) => removeTree(childId))
          adapter.removeMany(state, childrenIds)
        }
        adapter.removeOne(state, nodeId)
      }
      removeTree(nodeId)
    },

    appendChild(state, action: PayloadAction<NodeEntity>) {
      const { payload } = action
      const { childNodes, ...node } = payload
      adapter.addOne(state, node)

      if (node.parentId) {
        state.entities[node.parentId]?.childIds.push(node.id)
      }
      if (childNodes) {
        adapter.addMany(state, childNodes)
      }
    },

    insertBefore(
      state,
      action: PayloadAction<{
        node: NodeEntity
        refId: string
      }>,
    ) {
      insert(state, action.payload, 'before')
    },

    insertAfter(
      state,
      action: PayloadAction<{
        node: NodeEntity
        refId: string
      }>,
    ) {
      insert(state, action.payload, 'after')
    },
  },
})

const entitySelectors = adapter.getSelectors(
  (state: RootState) => state.entities[name],
)

export const reducer = slice.reducer
export const actions = slice.actions
export const selectors = {
  selectById: (state: RootState, id: string) =>
    entitySelectors.selectById(state, id),
}
