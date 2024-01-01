import {DraggableProvidedDragHandleProps} from "react-beautiful-dnd";

export interface ObjectElement {
  key: string;
  refresh: () => void;
  rename: (oldCollectionName: string) => void;
  isDragging: boolean;
  dragHandle: DraggableProvidedDragHandleProps | null | undefined;
}