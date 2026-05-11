const layers = [
  {
    ix: 'L01 · Substrate',
    title: 'Kernel hooks',
    desc: 'eBPF probes and syscall tap intercept every system call before user space sees it. Zero-copy ring buffer delivers events at 480 ns latency.',
    tags: ['eBPF', 'syscall', 'ring-buffer'],
    status: 'ACTIVE',
  },
  {
    ix: 'L02 · Intelligence',
    title: 'Behavioral models',
    desc: 'ONNX inference on-device. 140+ behavioral signals scored against rolling baseline. Anomaly threshold self-calibrates every 30 s.',
    tags: ['ONNX', 'baseline', 'ML'],
    status: 'LEARNING',
  },
  {
    ix: 'L03 · Control',
    title: 'Playbook engine',
    desc: 'TypeScript or YAML playbooks execute autonomously: revoke sessions, rotate keys, rate-limit, isolate process trees — all within one tick.',
    tags: ['playbooks', 'response-API', 'kill-switch'],
    status: 'ARMED',
  },
  {
    ix: 'L04 · Surface',
    title: 'Unified dashboard',
    desc: 'CLI, REST, and dashboard give your SOC team a single pane. SIEM push, PagerDuty, Slack, and Linear ship out of the box.',
    tags: ['CLI', 'SIEM', 'PagerDuty'],
    status: 'LIVE',
  },
]

export function Architecture() {
  return (
    <section id="architecture" className="block" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// Architecture</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Four layers.<br />
              One <span className="accent">kill chain</span>.
            </h2>
          </div>
          <p className="lede">
            Each layer is independently hardened and tamper-evident. Compromise one and the others detect the anomaly and hold the line.
          </p>
        </div>

        <div className="glass" style={{ overflow: 'hidden' }}>
          {layers.map((layer, i) => (
            <div key={i} className="layer">
              <div className="ix">{layer.ix}</div>

              <h3>{layer.title}</h3>

              <div>
                <p>{layer.desc}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                  {layer.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, letterSpacing: '0.1em', padding: '3px 8px',
                      border: '1px solid var(--line-3)', color: 'var(--ink-3)',
                      textTransform: 'uppercase',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="layer-status">
                <span className="dot" />
                {layer.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
