import React, { Children } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

interface DustbinProps {
    name: string,
    children?: React.ReactNode
}

const Dustbin: React.FC<DustbinProps> = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'Dustbin' }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            <span>{props.name}</span><br />
            <span>{isActive ? 'Release to drop' : 'Drag recipe here'}</span>
            {props.children}
        </div>
    )
}

export default Dustbin
