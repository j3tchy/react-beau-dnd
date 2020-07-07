import React, { useState } from 'react';
import './App.css';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd'

// Initial setup of columns and tasks
const INITIAL_DATA = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage'},
    'task-2': { id: 'task-2', content: 'Watch my favourite show'},
    'task-3': { id: 'task-3', content: 'Charge my phone'},
    'task-4': { id: 'task-4', content: 'Cook dinner'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    }
  },
  //Facilitate reordering of column
  columnOrder: ['column-1']
}

const App = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const onDragEnd = res => {
    const { destination, source, draggableId } = res;

    // If there is no draggable (item is dropped outside of droppable area), do nothing
    if (!draggableId) {
      return;
    }

    // If the location of the droppable item is the same, return nothing
    if (source.droppableId === destination.droppableId &&
        source.index === destination.index) {
        return;
      }

    // Grab the column of the movable tak
    const column = data.columns[source.droppableId];

    // Place into a new array
    const newTaskIds = [...column.taskIds];

    // Start from the location of the item and remove 1
    newTaskIds.splice(source.index, 1);

    // Start from the location of where it was dropped but do not remove any item and add the draggableId
    newTaskIds.splice(destination.index, 0, draggableId);

    // Within the new column setup, update the new column object with the newTaskIds
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    // Create a new state with the new order
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [column.id]: newColumn
      }
    };

    // Set that new state using the useState method that had been set.
    setData(newState);
  }

  return (
    <DragDropContext
      onDragEnd={res => onDragEnd(res)}
    >
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
  
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

export default App;
