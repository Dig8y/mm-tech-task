"use client";

import { Button } from "@/components/ui/button";
import ReactFlowComponent from "./components/react-flow";
import { ListPlus, Trash, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";



export default function Home() {
  const [choices, setChoices] = useState<string[]>([]);
  const [currentChoice, setCurrentChoice] = useState<string>("");
  const [attributes, setAttributes] = useState<string[]>([]);
  const [currentAttribute, setCurrentAttribute] = useState<string>("");
  const [generatedTree, setGeneratedTree] = useState<boolean>(false);
  const { toast } = useToast()

  const isAbleToGenerate = choices.length > 1 && attributes.length > 0;

  return (
    <>
      <div className="grid grid-cols-8 h-screen">
        <div className="col-span-2 flex flex-col p-4 gap-4">
          <h1 className="font-semibold text-2xl"><span className="text-[#ff5e20]">Decision</span> Maker</h1>
          <div className="attributes">
            <h2 className="font-semibold text-xl">Attributes</h2>
            {attributes.length > 0 && <div>
              <div className="flex flex-col space-y-2 pl-1">
                {attributes.map((attribute, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-base">{attribute}</span>
                    <Button variant={"ghost"} disabled={generatedTree} onClick={() => {
                      setAttributes(attributes.filter((_, i) => i !== index));
                    }}>
                      <X className="text-red-500" />
                    </Button>
                  </div>
                ))
                }
              </div>
              < Separator className="my-2" />
            </div>}
            <div className="flex gap-4">
              <Input placeholder="taste, cost..." onChange={(e) => setCurrentAttribute(e.currentTarget.value)} value={currentAttribute} disabled={generatedTree} />
              <Button variant={"secondary"}
                disabled={generatedTree}
                onClick={() => {
                  if (!currentAttribute) {
                    toast({
                      "title": "Error",
                      "description": "Please enter an attribute",
                    })
                    return
                  }
                  if (attributes.find((c) => c === currentAttribute)) {
                    toast({
                      "title": "Error",
                      "description": "Attribute already exists",
                    })
                    return
                  }
                  (setAttributes([...attributes, currentAttribute]), setCurrentAttribute(""));
                }}>
                <ListPlus />
              </Button>
            </div>
          </div>
          <div className="choices">
            <h2 className="font-semibold text-xl">Choices</h2>
            {choices.length > 0 && <div>
              <div className="flex flex-col space-y-2 pl-1">
                {choices.map((choice, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-base">{choice}</span>
                    <Button variant={"ghost"}
                      disabled={generatedTree}
                      onClick={() => {
                        setChoices(choices.filter((_, i) => i !== index));
                      }}>
                      <X className="text-red-500" />
                    </Button>
                  </div>
                ))
                }
              </div>
              < Separator className="my-2" />
            </div>}
            <div className="flex gap-4">
              <Input placeholder="burgers, crisps..." onChange={(e) => setCurrentChoice(e.currentTarget.value)} value={currentChoice} disabled={generatedTree} />
              <Button variant={"secondary"}
                disabled={generatedTree}
                onClick={() => {
                  if (!currentChoice) {
                    toast({
                      "title": "Error",
                      "description": "Please enter a choice",
                    })
                    return
                  }
                  if (choices.find((c) => c === currentChoice)) {
                    toast({
                      "title": "Error",
                      "description": "Choice already exists",
                    })
                    return
                  }
                  setChoices([...choices, currentChoice]), setCurrentChoice("");
                }}>
                <ListPlus />
              </Button>
            </div>
          </div>
          <div className="mt-auto">
            {
              generatedTree ?
                <Button className="w-full mt-2" variant={"secondary"} onClick={() => { setGeneratedTree(false); setChoices([]); setAttributes([]) }}>
                  Reset
                </Button> :
                <Button className="w-full" disabled={!isAbleToGenerate} onClick={() => setGeneratedTree(true)}>
                  Generate Decision Tree
                </Button>
            }

            {
              !isAbleToGenerate ?
                <div>
                  <p className="text-red-500 text-xs mt-1">Please add at least 2 choices and 1 attribute to generate a decision tree</p>
                </div>
                : ""
            }

          </div>
        </div>
        <div className="col-span-6 h-screen">
          {generatedTree && isAbleToGenerate ? <ReactFlowComponent choices={choices} attributes={attributes} /> :
            <div className="h-full w-full flex items-center justify-center">
              <h1>
                Please add at least 2 choices and 1 attribute to generate a decision tree
              </h1>
            </div>
          }
        </div>
      </div>
    </>
  );
}
