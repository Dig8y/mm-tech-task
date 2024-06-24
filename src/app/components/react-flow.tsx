"use client";

import { edgeTypes, initialEdges } from "@/lib/react-flow/edges";
import { initialNodes, nodeTypes } from "@/lib/react-flow/nodes";
import { useCallback } from "react";
import ReactFlow, { Background, Controls, OnConnect, addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";


export default function ReactFlowComponent() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ ReactFlow>
  );
}
