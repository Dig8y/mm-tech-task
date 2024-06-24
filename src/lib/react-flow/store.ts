import { create } from "zustand";
import { Edge, Node } from "reactflow";

export type AttributeNodeData = {
  name: string;
  weight?: number;
  choiceScore?: number;
  attributeScores?: { name: string; attributeScore: number }[];
};

export type RFState = {
  nodes: Node<AttributeNodeData>[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeWeight: (name: string, weight: number) => void;
  updateNodeAttributes: (
    name: string,
    attributeScores: { name: string; attributeScore: number }[]
  ) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  updateNodeAttributes: (
    name: string,
    attributeScores: { name: string; attributeScore: number }[]
  ) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === name) {
          const newAttributeScores = [...attributeScores];
          const newChoiceScore = newAttributeScores.reduce(
            (acc, curr) =>
              acc +
              curr.attributeScore *
                (
                  state.nodes.find((n) => n.id === curr.name)?.data as {
                    weight: number;
                  }
                ).weight,
            0
          );

          return {
            ...node,
            data: {
              ...node.data,
              attributeScores: newAttributeScores,
              choiceScore: newChoiceScore,
            },
          };
        }
        return node;
      }),
    }));
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === "winner") {
          const winner = state.nodes
            .filter((node) => node.type === "choice-node")
            .reduce((acc, curr) => {
              if (
                (curr.data.choiceScore &&
                  curr.data.choiceScore === (acc.data.choiceScore ?? 0)) ||
                curr.data.choiceScore === 0
              ) {
                return {
                  ...acc,
                  data: { ...acc.data, name: "Decide a winner" },
                };
              } else if (
                curr.data.choiceScore &&
                curr.data.choiceScore > (acc.data.choiceScore ?? 0)
              ) {
                return curr;
              }
              return acc;
            });
          return {
            ...node,
            data: {
              ...node.data,
              name: winner.data.name,
            },
          };
        }
        return node;
      }),
    }));
  },

  updateNodeWeight: (name: string, weight: number) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === name) {
          return {
            ...node,
            data: { ...node.data, weight },
          };
        }
        return node;
      }),
    }));

    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.type === "choice-node") {
          const newAttributeScores = [...(node.data.attributeScores ?? [])];
          const newChoiceScore = newAttributeScores.reduce(
            (acc, curr) =>
              acc +
              curr.attributeScore *
                (
                  state.nodes.find((n) => n.id === curr.name)?.data as {
                    weight: number;
                  }
                ).weight,
            0
          );

          return {
            ...node,
            data: {
              ...node.data,
              attributeScores: newAttributeScores,
              choiceScore: newChoiceScore,
            },
          };
        }
        return node;
      }),
    }));
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === "winner") {
          const winner = state.nodes
            .filter((node) => node.type === "choice-node")
            .reduce((acc, curr) => {
              if (
                (curr.data.choiceScore &&
                  curr.data.choiceScore === (acc.data.choiceScore ?? 0)) ||
                curr.data.choiceScore === 0
              ) {
                return {
                  ...acc,
                  data: { ...acc.data, name: "Decide a winner" },
                };
              } else if (
                curr.data.choiceScore &&
                curr.data.choiceScore > (acc.data.choiceScore ?? 0)
              ) {
                return curr;
              }
              return acc;
            });
          return {
            ...node,
            data: {
              ...node.data,
              name: winner.data.name,
            },
          };
        }
        return node;
      }),
    }));
  },
}));

export default useStore;
