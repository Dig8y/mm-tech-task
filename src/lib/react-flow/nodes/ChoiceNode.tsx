"use client"
import type { NodeProps } from "reactflow";

import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { Slider } from "@/components/ui/slider";
import useStore from "../store";
import { Separator } from "@/components/ui/separator";


export type ScoredChoiceNodeData = {
  name: string,
  choiceScore: number,
  attributeScores: { name: string, attributeScore: number }[]
}


export function ChoiceNode({
  data,
}: NodeProps<ScoredChoiceNodeData>) {
  const [attributeScores, setAttributeScores] = useState(data.attributeScores);

  const updateNodeAttributes = useStore((state) => state.updateNodeAttributes);

  return (
    <div className="bg-white p-4 border-[1px] rounded-md w-[200px]">
      <Handle type="target" position={Position.Top} />
      <h1 className="font-semibold text-lg">
        {data.name}
      </h1>
      <div className="w-full space-y-2">
        {
          data.attributeScores.map((attribute, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between items-center text-xs">
                <p>{attribute.name}</p>
                <span>{attribute.attributeScore}</span>
              </div>
              <Slider max={100} defaultValue={[attribute.attributeScore * 100]}
                className={"nodrag"} onValueChange={(value) => { setAttributeScores(attributeScores.map((score) => score.name === attribute.name ? { ...score, attributeScore: value[0] } : score)); updateNodeAttributes(data.name, attributeScores) }} />
            </div>
          ))
        }
      </div>
      <Separator className="my-2" />
      <div className="mt-2 flex justify-between items-center">
        <p className="font-semibold text-gray-600 text-xs">Total Score</p>
        {Math.round(data.choiceScore * 10) / 10}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
