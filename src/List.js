import React from 'react';
import ListItem from './ListItem';
import { Droppable } from 'react-beautiful-dnd';

const List = ({ data }) => {
  return (
    <div className='list'>
      <h1>Title</h1>
      <Droppable droppableId='1234'>
        {provided => (
          <div
            className='list-content'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((item, index) => (
              <ListItem key={item.id} item={item} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default List;