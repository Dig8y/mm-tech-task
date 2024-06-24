import type { Node, NodeTypes } from "reactflow";

export const initialNodes = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "test" } },
  {
    id: "b",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
] satisfies Node[];

export const nodeTypes = {
  // Add any of your custom nodes here!
} satisfies NodeTypes;
