"use client";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- STYLING VARS FOR SWIMLANES ---
const publicStyle = { background: '#f0f9ff', border: '2px solid #0284c7', borderRadius: '8px', padding: '10px', width: 200, color: 'black' };
const buyerStyle = { background: '#fff7ed', border: '2px solid #ea580c', borderRadius: '8px', padding: '10px', width: 200, color: 'black' };
const supplierStyle = { background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '8px', padding: '10px', width: 200, color: 'black' };

// --- INITIAL NODES ---
const initialNodes = [
  // COLUMN 1: The Public / Consumer (The "Stick")
  { id: 'p1', position: { x: 50, y: 50 }, data: { label: 'Public User Visits App' }, style: publicStyle },
  { id: 'p2', position: { x: 50, y: 150 }, data: { label: 'Views "Accountability Scoreboard"' }, style: publicStyle },
  { id: 'p3', position: { x: 50, y: 250 }, data: { label: 'Sees Brand X in the "Red"' }, style: publicStyle },
  { id: 'p4', position: { x: 50, y: 350 }, data: { label: 'Clicks "Demand Better" (Sends Auto-Lobby Email)' }, style: publicStyle },
  { id: 'p5', position: { x: 50, y: 750 }, data: { label: 'Views "Public Impact Ledger" (Brand X turns Green!)' }, style: publicStyle },

  // COLUMN 2: The Buyer Company / The Polluter (The Target)
  { id: 'b1', position: { x: 350, y: 50 }, data: { label: 'Brand X (High Emissions)' }, style: buyerStyle },
  { id: 'b2', position: { x: 350, y: 350 }, data: { label: 'Receives Public Pressure Alert' }, style: buyerStyle },
  { id: 'b3', position: { x: 350, y: 450 }, data: { label: 'Opens "Switch to Mycelium" Calculator' }, style: buyerStyle },
  { id: 'b4', position: { x: 350, y: 550 }, data: { label: 'Sends Contract Request to Match' }, style: buyerStyle },
  { id: 'b5', position: { x: 350, y: 650 }, data: { label: 'Deal Signed! Scope 3 Emissions Reduced.' }, style: buyerStyle },

  // COLUMN 3: The Supplier / The Solution (The "Carrot")
  { id: 's1', position: { x: 650, y: 50 }, data: { label: 'Mushroom Packaging Co.' }, style: supplierStyle },
  { id: 's2', position: { x: 650, y: 150 }, data: { label: 'Gets "Green Verified" Badge' }, style: supplierStyle },
  { id: 's3', position: { x: 650, y: 250 }, data: { label: 'Listed on B2B Matchmaker DB' }, style: supplierStyle },
  { id: 's4', position: { x: 650, y: 550 }, data: { label: 'Receives Contract Request' }, style: supplierStyle },
  { id: 's5', position: { x: 650, y: 650 }, data: { label: 'Accepts Order & Fulfills' }, style: supplierStyle },
];

// --- INITIAL EDGES (Connecting the journey) ---
const initialEdges = [
  // Public Flow
  { id: 'e-p1-p2', source: 'p1', target: 'p2', animated: true },
  { id: 'e-p2-p3', source: 'p2', target: 'p3', animated: true },
  { id: 'e-p3-p4', source: 'p3', target: 'p4', animated: true },
  
  // Public Pressure hits the Buyer
  { id: 'e-p4-b2', source: 'p4', target: 'b2', animated: true, style: { stroke: '#ea580c', strokeWidth: 2 } },
  { id: 'e-b1-b2', source: 'b1', target: 'b2' },
  { id: 'e-b2-b3', source: 'b2', target: 'b3', animated: true },
  
  // Supplier Onboarding
  { id: 'e-s1-s2', source: 's1', target: 's2' },
  { id: 'e-s2-s3', source: 's2', target: 's3' },
  
  // Marketplace Match (Buyer meets Supplier)
  { id: 'e-s3-b3', source: 's3', target: 'b3', animated: true, style: { stroke: '#16a34a', strokeWidth: 2 }, label: 'Marketplace Match' },
  { id: 'e-b3-b4', source: 'b3', target: 'b4', animated: true },
  { id: 'e-b4-s4', source: 'b4', target: 's4', animated: true },
  { id: 'e-s4-s5', source: 's4', target: 's5', animated: true },
  
  // The Deal Closes and hits the Public Ledger
  { id: 'e-s5-b5', source: 's5', target: 'b5', animated: true },
  { id: 'e-b5-p5', source: 'b5', target: 'p5', animated: true, style: { stroke: '#0284c7', strokeWidth: 3 }, label: 'Updates Public Ledger' },
];

export default function AppFlowMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fafafa' }}>
      <h1 style={{ position: 'absolute', zIndex: 10, padding: '20px', fontFamily: 'sans-serif', fontWeight: 'bold', color: 'black' }}>
        Ecosystem Flow: The Circular Accountability Model
      </h1>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}