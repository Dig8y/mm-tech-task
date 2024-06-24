"use client";

import { Button } from "@/components/ui/button";
import ReactFlowComponent from "./components/react-flow";
import { ListPlus, Trash, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";



export default function Home() {
  const [choices, setChoices] = useState<string[]>([]);
  const [currentChoice, setCurrentChoice] = useState<string>("");
  const [attributes, setAttributes] = useState<string[]>([]);
  const [currentAttribute, setCurrentAttribute] = useState<string>("");

  const isAbleToGenerate = choices.length > 1 && attributes.length > 0;

  

  return (
    <>
      <div className="grid grid-cols-7 h-screen">
        <div className="col-span-2 flex flex-col p-4 gap-4">
          <h1 className="font-semibold text-2xl">Micheals Decision Maker</h1>
          <div className="choices">
            <h2 className="font-semibold text-xl">Choices</h2>
            {choices.length > 0 && <div>
              <div className="flex flex-col space-y-2 px-1">
                {choices.map((choice, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-lg">{choice}</span>
                    <div className="cursor-pointer" onClick={() => {
                      setChoices(choices.filter((_, i) => i !== index));
                    }}>
                      <X className="text-red-500" />
                    </div>
                  </div>
                ))
                }
              </div>
              < Separator className="my-2" />
            </div>}
            <div className="flex gap-4">
              <Input placeholder="add a choice..." onChange={(e) => setCurrentChoice(e.currentTarget.value)} value={currentChoice} />
              <Button variant={"secondary"} onClick={() => {
                currentChoice && (setChoices([...choices, currentChoice]), setCurrentChoice(""));
              }}>
                <ListPlus />
              </Button>
            </div>
          </div>
          <div className="attributes">
            <h2 className="font-semibold text-xl">Attributes</h2>
            {attributes.length > 0 && <div>
              <div className="flex flex-col space-y-2 px-1">
                {attributes.map((attribute, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-lg">{attribute}</span>
                    <div className="cursor-pointer" onClick={() => {
                      setAttributes(attributes.filter((_, i) => i !== index));
                    }}>
                      <X className="text-red-500" />
                    </div>
                  </div>
                ))
                }
              </div>
              < Separator className="my-2" />
            </div>}
            <div className="flex gap-4">
              <Input placeholder="add an attribute..." onChange={(e) => setCurrentAttribute(e.currentTarget.value)} value={currentAttribute} />
              <Button variant={"secondary"} onClick={() => {
                currentAttribute && (setAttributes([...attributes, currentAttribute]), setCurrentAttribute(""));
              }}>
                <ListPlus />
              </Button>
            </div>
          </div>
          <div className="mt-auto">
            <Button className="w-full" disabled={!isAbleToGenerate} >
              Generate Decision Tree
            </Button>
            {
              !isAbleToGenerate && <p className="text-red-500 text-xs mt-1">Please add at least 2 choices and 1 attribute to generate a decision tree</p>
            }
          </div>
        </div>
        <div className="col-span-5 h-screen">
          <ReactFlowComponent />
        </div>
      </div>
    </>
  );
}
