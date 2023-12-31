import React, { FC, ReactNode } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface DNDElement {
  children: ReactNode;
  onDragEnd: (result: DropResult) => void;
}

export const DNDList = ({ children, onDragEnd }: DNDElement) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="collections">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

