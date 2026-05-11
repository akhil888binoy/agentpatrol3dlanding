const plans = [
  {
    tier: '// Tier 01',
    name: 'Indie',
    price: '$0',
    period: '/ forever',
    featured: false,
    features: [
      '1 active agent',
      '10 K events / month',
      '7-day log retention',
      'Community channel',
    ],
    cta: 'Start free',
  },
  {
    tier: '// Tier 02',
    name: 'Team',
    price: '$49',
    period: '/ agent / mo',
    featured: true,
    features: [
      'Unlimited events',
      '90-day replay buffer',
      'Custom playbooks',
      'SOC 2 Type II evidence',
      '24 / 7 paging',
    ],
    cta: 'Deploy patrol →',
  },
  {
    tier: '// Tier 03',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    featured: false,
    features: [
      'Air-gapped deploy',
      'On-prem control plane',
      'Dedicated SRE liaison',
      'Federal & HIPAA add-ons',
      'FedRAMP roadmap',
    ],
    cta: 'Contact ops',
  },
]

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// Deployment tiers</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Pick a<br />patrol size.
            </h2>
          </div>
          <p className="lede">
            Start with one agent, scale to a global swarm. Every tier ships with the full detection engine — only the volume changes.
          </p>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass price-card${plan.featured ? ' featured' : ''}`}
            >
              <div style={{
                fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: plan.featured ? 'var(--green)' : 'var(--ink-3)',
                fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              }}>
                {plan.tier}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif',
                fontWeight: 500, fontSize: 28, letterSpacing: '-0.01em',
                margin: '14px 0 0', color: 'var(--ink)',
              }}>
                {plan.name}
              </h3>

              <div style={{ margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif',
                  fontWeight: 700, fontSize: 52, lineHeight: 1, letterSpacing: '-0.02em',
                  color: plan.featured ? 'var(--green)' : 'var(--ink)',
                  textShadow: plan.featured ? '0 0 30px rgba(94,179,255,0.4)' : 'none',
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul style={{
                listStyle: 'none', padding: 0, margin: '0 0 28px',
                display: 'flex', flexDirection: 'column', gap: 10,
                fontSize: 13, color: 'var(--ink-2)', flex: 1,
                fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#cta" className="cta-link">{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
