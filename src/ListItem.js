import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ListItem = ({ item, index }) => {
  return (
  <Draggable draggableId={`${item.id}`} index={index}>
    {provided => (
      <div
        className='list-item'
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.dragHandleProps}
      >
        {item.title}
      </div>
    )}
  </Draggable>
)};

export default ListItem;