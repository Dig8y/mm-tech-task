import type { NodeProps } from "reactflow";

import React from "react";
import { Handle, Position } from "reactflow";


export type WinningNodeData = {
  name: string;
};


export function WinningNode({
  data,
}: NodeProps<WinningNodeData>) {

  return (
    <div className="bg-white p-4 border-[1px] rounded-md w-[200px] text-center">
      <h1 className="font-semibold text-gra">Winning Node</h1>
      <h1 className="font-bold text-xl text-[#ff5e20]">
        {data.name}
      </h1>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}