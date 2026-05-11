const features = [
  {
    num: '01',
    title: <>Kernel-Level<br /><span className="accent">Enforcement</span></>,
    desc: 'seccomp-bpf syscall filters and Tetragon eBPF sit between your agent and the operating system. An agent that tries to read your credentials file, spawn an unauthorized shell, or connect to an unexpected endpoint gets stopped before the action completes. Not logged after. Stopped before.',
    label: 'OWASP ASI04',
  },
  {
    num: '02',
    title: <>LLM Proxy<br /><span className="accent">Intercept</span></>,
    desc: 'Your agent thinks it is talking directly to OpenAI or Anthropic. It is actually talking to AgentPatrol first. Every prompt is inspected for data exfiltration. Every tool call is logged. Every response is captured. The complete reasoning chain visible for every session.',
    label: 'Reasoning Layer Visibility',
  },
  {
    num: '03',
    title: <>Pre-Flight<br /><span className="accent">Gate</span></>,
    desc: 'Run agentpatrol scan on any agent codebase before it touches production. Dependency vulnerabilities, hardcoded secrets, dangerous code patterns, and unexpected capabilities all caught before deployment. Works on your own agent code and on code written by others.',
    label: 'Supply Chain Protection',
  },
  {
    num: '04',
    title: <>AI Detection<br /><span className="accent">Engine</span></>,
    desc: 'Two streams run simultaneously. Stream A captures what the agent did at the OS layer. Stream B captures what the agent was reasoning. Both correlated by Claude to produce a unified threat verdict that no single-layer tool can replicate.',
    label: 'Claude Haiku + Sonnet',
  },
  {
    num: '05',
    title: <>Behavioral<br /><span className="accent">Baseline</span></>,
    desc: 'AgentPatrol learns what normal looks like for each individual agent over time. When behavior deviates: new file paths accessed, unusual network destinations, oversized LLM payloads. You know immediately. Even slow-burn attacks spanning multiple sessions are caught.',
    label: 'Anomaly Detection',
  },
  {
    num: '06',
    title: <>Signed Session<br /><span className="accent">Report</span></>,
    desc: 'Every agent run produces a signed compliance report. Tamper-evident. Cryptographically sealed. Every action mapped to OWASP Agentic AI Top 10 categories. Show it to your auditor. Attach it to your SOC-2 evidence package. Send it to your enterprise client.',
    label: 'Audit Ready',
  },
]

export function Features() {
  return (
    <section id="features" className="hero-theme-section" style={{ padding: '130px 0 80px', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// What AgentPatrol Does</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Every layer of your agent<br />monitored and enforced.
            </h2>
          </div>
          <p className="lede">
            AgentPatrol operates at four layers simultaneously: kernel, network, LLM proxy, and session. No evasion path exists.
          </p>
        </div>

        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
          {features.map((f, i) => (
            <div key={i} className="feature">
              <div className="num">// {f.num}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="glyph">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
