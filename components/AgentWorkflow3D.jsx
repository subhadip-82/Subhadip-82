'use client';
import { useState } from 'react';
import TiltCard from './TiltCard';
import styles from './AgentWorkflow3D.module.css';

const WORKFLOW_NODES = [
  {
    id: 'node-1',
    step: '01',
    name: 'Vulnerability Radar',
    tech: 'Async Python / CVE Ingestion',
    status: 'COMPLETED',
    icon: '🛡️',
    summary: 'Scans infrastructure endpoints, ingesting telemetry & CVE security alerts.',
    detail: {
      action: 'Fetch active CVE vulnerability metrics across 20,000+ endpoints',
      input: '{ scan_depth: "enterprise", target_os: ["Windows", "Linux"] }',
      output: '21 Vulnerable packages identified (3 High Risk, 18 Medium)',
    },
  },
  {
    id: 'node-2',
    step: '02',
    name: 'MCP Tool Connector',
    tech: 'Model Context Protocol',
    status: 'ACTIVE',
    icon: '🔌',
    summary: 'Query CMDB & live system state without hardcoded integrations.',
    detail: {
      action: 'Invoke custom MCP tool `get_cmdb_server_telemetry` via standardized protocol',
      input: '{ protocol: "MCP/1.0", query: "CMDB_asset_health", asset_id: "SRV-BANK-882" }',
      output: 'Live Status: ONLINE | CPU: 18% | RAM: 42% | Criticality: High Tier-1',
    },
  },
  {
    id: 'node-3',
    step: '03',
    name: 'LangGraph State Engine',
    tech: 'LangGraph StateGraph & Pydantic',
    status: 'PROCESSING',
    icon: '🤖',
    summary: 'Evaluates patch compatibility, dependency tree, and risk score.',
    detail: {
      action: 'LangGraph conditional routing node evaluates state matrix',
      input: '{ state: "EVALUATING", patch_kb: "KB5034111", risk_score: 8.8 }',
      output: 'Decision: Patch valid. Risk Score 8.8 > threshold (7.0) -> Escalating to Human Gate',
    },
  },
  {
    id: 'node-4',
    step: '04',
    name: 'Human-in-the-Loop Gate',
    tech: 'Approval Escalation Workflow',
    status: 'GATEWAY',
    icon: '✋',
    summary: 'Mandatory human sign-off before executing high-risk remediation.',
    detail: {
      action: 'Pause state execution, send approval request payload to SysAdmin dashboard',
      input: '{ gate: "REQUIRE_HUMAN_APPROVAL", risk_level: "HIGH", approver_role: "SecOps Lead" }',
      output: 'APPROVED by subhadip.chowdhury @ 21:34:41 • Ticket #SEC-9921',
    },
  },
  {
    id: 'node-5',
    step: '05',
    name: 'PostgreSQL Checkpoint Store',
    tech: 'PostgreSQL Run History & Time-Travel',
    status: 'CHECKPOINT',
    icon: '💾',
    summary: 'Node-by-node execution state saved for replayability and full auditability.',
    detail: {
      action: 'Persist state snapshot into PostgreSQL table `agent_checkpoint_history`',
      input: '{ run_id: "run_88f91a2", checkpoint_id: "chk_05", state_hash: "0x892a..." }',
      output: 'State persisted successfully. Audit history queryable via SQL',
    },
  },
  {
    id: 'node-6',
    step: '06',
    name: 'Automated Remediation',
    tech: 'PowerShell / Agentic Execution',
    status: 'EXECUTING',
    icon: '⚡',
    summary: 'Applies patch across target endpoints with automated fallback retry logic.',
    detail: {
      action: 'Dispatch silent patch installation script to target CMDB endpoints',
      input: '{ script: "Install-PatchRemediation.ps1", rollback_on_fail: true }',
      output: '100% Endpoints patched cleanly. Zero downtime recorded.',
    },
  },
];

export default function AgentWorkflow3D() {
  const [selectedNode, setSelectedNode] = useState(WORKFLOW_NODES[2]); // Default node 3 (LangGraph)
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <span className={styles.liveBadge}>
            <span className={styles.livePulse} />
            LIVE AGENTIC ARCHITECTURE DEMO
          </span>
          <h3 className={styles.title}>
            LangGraph &amp; MCP <em>Infrastructure Remediation Agent</em>
          </h3>
          <p className={styles.subtitle}>
            Interactive 3D visualization of Subhadip&apos;s production Agentic AI System. Click any node below to inspect execution state, MCP payloads, and PostgreSQL checkpoints.
          </p>
        </div>
      </div>

      {/* 3D Interactive Node Flow Row */}
      <div className={styles.flowGrid}>
        {WORKFLOW_NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <TiltCard
              key={node.id}
              className={`${styles.nodeCard} ${isSelected ? styles.nodeCardSelected : ''}`}
              max={15}
              glowColor={isSelected ? 'rgba(34, 211, 238, 0.4)' : 'rgba(167, 139, 250, 0.2)'}
            >
              <div
                className={styles.nodeInner}
                onClick={() => setSelectedNode(node)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.nodeTop}>
                  <span className={styles.nodeStep}>{node.step}</span>
                  <span className={`${styles.statusDot} ${styles[`status_${node.status}`]}`} />
                </div>
                <div className={styles.nodeIcon}>{node.icon}</div>
                <div className={styles.nodeName}>{node.name}</div>
                <div className={styles.nodeTech}>{node.tech}</div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Selected Node Details Box (Glassmorphic Terminal Card) */}
      <TiltCard className={styles.detailCard} max={6} glowColor="rgba(34, 211, 238, 0.2)">
        <div className={styles.detailInner}>
          <div className={styles.detailHeader}>
            <div className={styles.detailTitleWrap}>
              <span className={styles.detailIcon}>{selectedNode.icon}</span>
              <div>
                <h4 className={styles.detailTitle}>
                  Step {selectedNode.step}: {selectedNode.name}
                </h4>
                <span className={styles.detailTechTag}>{selectedNode.tech}</span>
              </div>
            </div>
            <div className={styles.tabGroup}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'summary' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Overview
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'input' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('input')}
              >
                MCP / State Payload
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'output' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('output')}
              >
                Execution Result
              </button>
            </div>
          </div>

          <div className={styles.detailBody}>
            {activeTab === 'summary' && (
              <div className={styles.tabContent}>
                <p className={styles.summaryText}>{selectedNode.summary}</p>
                <div className={styles.actionBox}>
                  <strong>Executed Action:</strong> {selectedNode.detail.action}
                </div>
              </div>
            )}

            {activeTab === 'input' && (
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>// Input JSON Payload (Model Context Protocol / LangGraph State)</div>
                <pre>{selectedNode.detail.input}</pre>
              </div>
            )}

            {activeTab === 'output' && (
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>// Execution Result Log (PostgreSQL Audit Stream)</div>
                <pre>{selectedNode.detail.output}</pre>
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
