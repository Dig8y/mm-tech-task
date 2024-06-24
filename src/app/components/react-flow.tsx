"use client";

import { useEffect,} from "react";
import "reactflow/dist/style.css";
import type { EdgeTypes, NodeTypes } from "reactflow";
import { AttributeNode } from "@/lib/react-flow/nodes/AttributeNode";

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import ReactFlow, { Background, Controls } from 'reactflow';

import 'reactflow/dist/style.css';

import useStore, { RFState } from "@/lib/react-flow/store";
import { ChoiceNode } from "@/lib/react-flow/nodes/ChoiceNode";
import { WinningNode } from "@/lib/react-flow/nodes/WinningNode";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const nodeTypes = {
  "attribute-node": AttributeNode,
  "choice-node": ChoiceNode,
  "winning-node": WinningNode
} satisfies NodeTypes;

const edgeTypes = {} satisfies EdgeTypes
  ;
export default function ReactFlowComponent({
  attributes,
  choices
}: {
  attributes: string[],
  choices: string[],
}) {
  const { nodes, edges, setEdges, setNodes } = useStore(
    useShallow(selector)
  );



  useEffect(() => {

    const totalWidth = Math.max(attributes.length, choices.length) * 225;
    const newNodes = [...attributes.map((attribute, index) => ({
      id: attribute,
      type: "attribute-node",
      position: { x: (index * 225), y: 0 },
      data: { name: attribute, weight: 0 },
    })), ...choices.map((choice, index) => ({
      id: choice,
      type: "choice-node",
      position: { x: (index * 225), y: 200 },
      data: { name: choice, choiceScore: 0, attributeScores: attributes.map((attribute) => ({ name: attribute, attributeScore: 0 })) },
    })), {
      id: "winner",
      type: "winning-node",
      position: { x: (((totalWidth / 225) - 1) / 2) * 225, y: 450 },
      data: { label: "winner", name: "Select a winner" }
    }]

    const newEdges = [
      ...attributes.flatMap(attribute => choices.map(choice => ({
        id: `${attribute}-${choice}`,
        source: attribute,
        target: choice,
      }))),
      ...choices.map(choice => ({
        id: `${choice}-winner`,
        source: choice,
        target: "winner",
      }))
    ];

    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ ReactFlow>
  );
}


export type ScoredChoiceNodeData = { name: string, choiceScore: number, attributeScores: { name: string, attributeScore: number }[] }