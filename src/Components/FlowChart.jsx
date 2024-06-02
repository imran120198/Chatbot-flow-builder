import { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialNodes } from "../Constant";
import { getId } from "../Utils";
import NodesPanel from "./NodesPanel";
import Topbar from "./Topbar";
import nodeTypes from "../config/nodeTypes";

const initialEdges = [];

function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDragStop = (event, node) =>
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));

  const onNodesDelete = (selectedNodes) => {
    const newNodes = nodes.filter((node) => !selectedNodes.includes(node.id));
    const newEdges = edges.filter(
      (edge) =>
        !selectedNodes.includes(edge.source) &&
        !selectedNodes.includes(edge.target)
    );
    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNode(null);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const id = getId(nodes);
    const newNode = {
      id,
      type,
      position,
      data: { label: `${type} ${id}` },
    };
    setNodes((prevNodes) => prevNodes.concat(newNode));
  };

  const handleUpdateNodeLabel = (nodeId, label) => {
    const mappedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            label,
          },
        };
      }
      return node;
    });
    setNodes(mappedNodes);
    setSelectedNode(null);
  };

  const handleSave = () => {
    const nodesWithEmptyTargets = nodes.filter((node) => {
      const isSource = edges.some((edge) => edge.source === node.id);
      const isTarget = edges.some((edge) => edge.target === node.id);
      return !isTarget && isSource;
    });

    if (nodesWithEmptyTargets.length > 1) {
      toast.error("Node has empty target handles.", {
        position: "top-center",
      });
      return;
    }

    const textNodes = nodes.filter((node) => node.type === "textNode");
    const connectedTextNodes = textNodes.every((node) =>
      edges.some((edge) => edge.source === node.id || edge.target === node.id)
    );

    if (!connectedTextNodes) {
      toast.error("Node has empty target handles ", {
        position: "top-center",
      });
      return;
    }
    toast.success("Flow Saved", {
      position: "top-center",
    });

    setSelectedNode(null);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Topbar handleSave={handleSave} />
      <div className="flow-builder">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={(event, node) => setSelectedNode(node)}
            onNodesDelete={onNodesDelete}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background />
          </ReactFlow>
          <NodesPanel
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            handleUpdateNodeLabel={handleUpdateNodeLabel}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default FlowChart;
