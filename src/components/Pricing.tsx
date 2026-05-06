'use client'

const monoFont = 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace'
const orbFont = 'var(--font-orbitron), "Orbitron", sans-serif'

const plans = [
  {
    tier: 'Tier 01',
    name: 'Recon',
    price: '$0',
    period: '/forever',
    featured: false,
    badge: null,
    features: [
      '1 active agent',
      '10K events / month',
      '7-day log retention',
      'Community channel',
    ],
    cta: 'Start free',
    ctaClass: 'btn-ghost',
  },
  {
    tier: 'Tier 02',
    name: 'Patrol',
    price: '$79',
    period: '/agent / mo',
    featured: true,
    badge: 'RECOMMENDED',
    features: [
      'Unlimited events',
      '90-day replay buffer',
      'Custom playbooks',
      'SOC 2 Type II evidence',
      '24/7 paging',
    ],
    cta: 'Deploy patrol',
    ctaClass: 'btn-primary',
    ctaArr: true,
  },
  {
    tier: 'Tier 03',
    name: 'Garrison',
    price: 'Custom',
    period: '',
    featured: false,
    badge: null,
    features: [
      'Air-gapped deploy',
      'On-prem control plane',
      'Dedicated SRE liaison',
      'Federal & HIPAA add-ons',
      'FedRAMP roadmap',
    ],
    cta: 'Contact ops',
    ctaClass: 'btn-ghost',
  },
]

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 0', position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="sec-eyebrow">// DEPLOYMENT TIERS</div>
            <h2
              className="sec-title-lg"
              style={{
                fontFamily: orbFont,
                fontWeight: 800,
                fontSize: 56,
                letterSpacing: '.02em',
                margin: '8px 0 0',
                lineHeight: 1,
                color: 'var(--ink)',
              }}
            >
              Pick a patrol size.
            </h2>
          </div>
          <p
            style={{
              fontFamily: monoFont,
              color: 'var(--ink-dim)',
              maxWidth: 480,
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            Start with one agent, scale to a global swarm. Every tier ships with the full detection engine — only the volume changes.
          </p>
        </div>

        {/* Pricing grid */}
        <div
          className="price-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.featured ? '#0e0e12' : 'var(--bg-2)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'relative',
                borderTop: plan.featured ? '2px solid var(--amber)' : undefined,
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 24,
                    transform: 'translateY(-50%)',
                    background: 'var(--amber)',
                    color: '#111',
                    fontFamily: orbFont,
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: '.2em',
                    padding: '6px 10px',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 11,
                  color: 'var(--amber)',
                  letterSpacing: '.3em',
                  textTransform: 'uppercase',
                }}
              >
                {plan.tier}
              </div>

              <h3
                style={{
                  fontFamily: orbFont,
                  fontWeight: 800,
                  fontSize: 28,
                  margin: 0,
                  letterSpacing: '.04em',
                  color: 'var(--ink)',
                }}
              >
                {plan.name}
              </h3>

              <div
                style={{
                  fontFamily: orbFont,
                  fontWeight: 800,
                  fontSize: 56,
                  lineHeight: 1,
                  letterSpacing: '.02em',
                  color: '#fff',
                }}
              >
                {plan.price}
                {plan.period && (
                  <small
                    style={{
                      fontFamily: monoFont,
                      fontSize: 13,
                      fontWeight: 400,
                      color: 'var(--ink-dim)',
                      letterSpacing: '.04em',
                      marginLeft: 6,
                    }}
                  >
                    {plan.period}
                  </small>
                )}
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  fontFamily: monoFont,
                  fontSize: 13,
                  color: 'var(--ink-dim)',
                  flex: 1,
                }}
              >
                {plan.features.map((f) => (
                  <li key={f} className="plan-list-item">{f}</li>
                ))}
              </ul>

              <a
                href="#"
                className={`btn ${plan.ctaClass}`}
                style={{ justifyContent: 'center' }}
              >
                {plan.cta}
                {plan.ctaArr && (
                  <span style={{ fontFamily: monoFont, fontWeight: 400 }}>→</span>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
