'use client'

const steps = [
  {
    num: '01',
    title: 'Pre-flight scan',
    body: 'Before your agent runs, AgentPatrol scans it for supply chain threats, hardcoded credentials, dangerous function calls, and unexpected capabilities. Signed PDF report generated before a single line of agent code executes.',
  },
  {
    num: '02',
    title: 'Runtime sandbox activates',
    body: 'AgentPatrol loads kernel-level enforcement before the agent starts. Tetragon eBPF captures every process, file access, and network connection. seccomp-bpf blocks dangerous syscalls. The agent runs inside a controlled environment it cannot escape.',
  },
  {
    num: '03',
    title: 'LLM proxy intercepts every call',
    body: 'Every request your agent makes to OpenAI or Anthropic passes through AgentPatrol first. The payload guard scans for data being exfiltrated through LLM calls. Every prompt, tool call, and response is captured.',
  },
  {
    num: '04',
    title: 'Threats detected and blocked',
    body: 'AgentPatrol correlates what the agent did at the OS layer with what it was thinking at the reasoning layer. Threats are blocked before they complete. Not after.',
  },
  {
    num: '05',
    title: 'Session report delivered',
    body: 'After every run you receive a signed tamper-evident PDF. Every file accessed. Every network connection made. Every LLM call sent. Every threat detected and blocked. OWASP ASI mapped. Ready for your auditor.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="hero-theme-section" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// How It Works</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              From zero to full enforcement<br />in five steps.
            </h2>
          </div>
          <div>
            {/* Code block right side */}
            <div className="glass" style={{ padding: '20px 24px', marginBottom: 20 }}>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                fontSize: 15, color: 'var(--green)', letterSpacing: '0.02em',
              }}>
                agentpatrol run python your_agent.py
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em',
            }}>
              Install time: 90 seconds · First session report: under 5 minutes
            </p>
          </div>
        </div>

        <div className="glass" style={{ overflow: 'hidden' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr',
              gap: '0 40px',
              padding: '36px 40px',
              borderBottom: i < steps.length - 1 ? '1px solid var(--line)' : 'none',
              transition: 'background .25s ease',
              alignItems: 'start',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(94,179,255,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                fontSize: 32, fontWeight: 500, color: 'var(--ink-4)',
                letterSpacing: '-0.02em', lineHeight: 1,
                paddingTop: 4,
              }}>
                {step.num}
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontWeight: 600, fontSize: 20, color: 'var(--ink)',
                  margin: '0 0 12px', lineHeight: 1.2,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0,
                }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
