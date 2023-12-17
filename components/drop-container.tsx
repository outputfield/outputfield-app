"use client"
import React, {CSSProperties, RefObject} from 'react'
import { useMultiDrop } from 'react-dnd-multi-backend';
import { Artist } from './artist-list';
import { DragContent, ItemTypes } from '@/ts/types/dnd.types';
import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';
import { DraggableName } from './draggable-name';
import { DragItem } from '@/app/page';
import { removeProperty } from '@/lib/utils';

const styles: CSSProperties = {
    minWidth: '500px',
    minHeight: '200px',
    height: '50%',
    padding: '2rem 2rem',
    border: '1px solid black',
    margin: '1rem',
    position: 'relative',
    float: 'left'
  }
  
  export interface ContainerProps {
    data?: any,
    transferCard: () => void,
    repositionCard: () => void,
    label?: string,
  }
  
  interface BoxMap {
    [key: string]: { top: number; left: number; title: string }
  }
  
  export const DropContainer: React.FC<ContainerProps> = ({ data, label }) => {
    // const [boxes, setBoxes] = React.useState<BoxMap>({
    //   a: { top: 20, left: 80, title: 'Drag me around' },
    //   b: { top: 180, left: 20, title: 'Drag me too' },
    // })
    const [boxes, setBoxes] = React.useState<BoxMap>({})

    React.useEffect(() => {
        console.log(data)
        if (data) {
            const artistBoxes = data.reduce((acc, curr) => {
                return {
                    ...acc,
                    [curr.email]: {
                        top: 0,
                        left: 0,
                        title: curr.name
                    }
                }
            }, {})
            setBoxes(artistBoxes)
        }
    }, [data])
  
    const moveBox = React.useCallback(
        (id: string, left: number, top: number) => {
            const next = {...boxes}
            next[id].left = left
            next[id].top = top
            setBoxes(next)
        },
        [boxes],
    )

    const [hasDropped, setHasDropped] = React.useState(false)
    const [hasDroppedOnChild, setHasDroppedOnChild] = React.useState(false)
  
    const [, drop] = useDrop(
      () => ({
        accept: ItemTypes.BOX,
        drop(item: DragItem, monitor) {
            console.log('- - - - -')
            const didDrop = monitor.didDrop()
            console.log('didDrop', label, monitor.didDrop(), monitor.getDropResult())

            setHasDropped(true)
            setHasDroppedOnChild(didDrop)

            // if didDrop (on Child), then remove from state
            if (didDrop) {
                const next = removeProperty(boxes, item.id)
                setBoxes(next)
                return
            }
            
            if (!Object.hasOwn(boxes, item.id)) {
                console.log(`${label} got a FOREIGN OBJECT, ${JSON.stringify(item)}`)
                // add item to state
                const next = {...boxes}
                next[item.id] = item
                setBoxes(next)
                return
            } else {
                console.log('initiating move ', label)
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number
                    y: number
                }
        
                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)

                console.log('moving ' + JSON.stringify(item) + ' to ' + left + ' ' + top)
                moveBox(item.id, left, top)

                return undefined
            }
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          isOverCurrent: monitor.isOver({ shallow: true }),
        }),
      }),
      [moveBox, setHasDropped, setHasDroppedOnChild],
    )
  
    return (
      <div ref={drop} style={styles}>
        <h3>{label}</h3>
        {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}

        {boxes && Object.keys(boxes).map((key) => (
          <DraggableName
            key={key}
            id={key}
            {...(boxes[key] as { top: number; left: number; title: string })}
          />
        ))}
      </div>
    )
  }
  

// - - - - - - - - 

// export const DropContainer = ({ data }: {data: Artist[]}) => {
//     const [boxes, setBoxes] = React.useState<{
//     [key: string]: {
//       top: number
//       left: number
//       title: string
//     }
//   }>({
//     a: { top: 20, left: 80, title: 'Drag me around' },
//     b: { top: 180, left: 20, title: 'Drag me too' },
//   })

//   const [_, {html5: [html5Props, html5Drop], touch: [touchProps, touchDrop]}] = useMultiDrop<DragContent, void, {isOver: boolean, canDrop: boolean}>({
//     accept: 'box',
//     drop: (item: DragContent, monitor) => {
//         console.log(`Dropped: ${item.id}`)

//         const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
//         const left = Math.round(item.left + delta.x)
//         const top = Math.round(item.top + delta.y)
//         moveBox(item.id, left, top)
//         return undefined
//     },
//     collect: (monitor) => {
//       return {
//         isOver: monitor.isOver(),
//         canDrop: monitor.canDrop(),
//       }
//     },
//   })

  
//   const moveBox = React.useCallback(
//     (id: string, left: number, top: number) => {
//         console.log('movebox')
//         const next = {...boxes}
//         next[id].left = left
//         next[id].top = top
//         setBoxes(next)
//     },
//     [boxes],
//   )

//   // TODO: replace with autoprefixer+astroturf
//   const containerStyle: CSSProperties = {
//     border: '1px dashed black',
//     display: 'inline-block',
//     margin: '10px',
//     height: 300,
//     width: 300,
//   }
//   const html5DropStyle: CSSProperties = {
//     backgroundColor: (html5Props.isOver && html5Props.canDrop) ? '#f3f3f3' : '#bbbbbb',
//     display: 'inline-block',
//     margin: '5px',
//     width: '90px',
//     height: '90px',
//     textAlign: 'center',
//     userSelect: 'none',
//   }
//   const touchDropStyle: CSSProperties = {
//     backgroundColor: (touchProps.isOver && touchProps.canDrop) ? '#f3f3f3' : '#bbbbbb',
//     display: 'inline-block',
//     margin: '5px',
//     width: '90px',
//     height: '90px',
//     textAlign: 'center',
//     userSelect: 'none',
//   }
//   return (
//     <div style={containerStyle}>
//         <div style={html5DropStyle} ref={html5Drop}>
//         {Object.keys(boxes).map((key) => (
//             <DraggableName
//             key={key}
//             id={key}
//             {...(boxes[key] as { top: number; left: number; title: string })}
//             />
//         ))}

//       </div>
//       {/* <div style={touchDropStyle} ref={touchDrop}>Touch</div> */}
//     </div>
//   )
// }