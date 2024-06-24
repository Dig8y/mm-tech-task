import type { NodeProps } from "reactflow";

import React from "react";
import { Handle, Position } from "reactflow";
import { Slider } from "@/components/ui/slider";
import useStore from "../store";
import { Separator } from "@/components/ui/separator";


export type AttributeNodeData = {
  name: string;
  weight: number;
};


export function AttributeNode({
  data,
}: NodeProps<AttributeNodeData>) {

  const updateNodeWeight = useStore((state) => state.updateNodeWeight);
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="bg-white p-4 border-[1px] rounded-md w-[200px]">
      <h1 className="font-semibold text-lg">
        {data.name}
      </h1>
      <Separator className="my-2" />
      <div className="flex justify-between items-center text-sm">
        <h3>weighted</h3>
        <span>{data.weight}</span>
      </div>
      <div className="mt-2">
        <Slider max={100} defaultValue={[data.weight * 100]} className={"nodrag"} onValueChange={(value) => updateNodeWeight(data.name, value[0] / 100)} />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}