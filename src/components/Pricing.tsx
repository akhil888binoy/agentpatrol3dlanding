'use client'

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/month',
    agents: 'Up to 5 agents',
    features: ['Kernel-level monitoring', 'Real-time blocking', 'Session reports', 'Email support'],
    highlight: false,
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$1,999',
    period: '/month',
    agents: 'Up to 25 agents',
    features: ['Everything in Starter', 'AI detection engine', 'OWASP ASI mapping', 'Slack alerts', 'Priority support'],
    highlight: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    agents: 'Unlimited agents',
    features: ['Everything in Growth', 'Custom policy rules', 'SOC2 audit package', 'SLA + on-call', 'Dedicated CSM'],
    highlight: false,
    cta: 'Contact Sales',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#EF9F27] font-mono text-xs tracking-[0.2em] uppercase">Pricing</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
            Transparent pricing. No surprises.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative p-8 rounded-2xl flex flex-col"
              style={{
                background: plan.highlight ? 'rgba(74,63,173,0.15)' : 'rgba(255,255,255,0.03)',
                border: plan.highlight ? '1px solid rgba(74,63,173,0.6)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.highlight ? '0 0 40px rgba(74,63,173,0.3)' : 'none',
              }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-[#4a3fad] text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-white/60 text-sm font-medium mb-1">{plan.name}</div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/40 mb-1">{plan.period}</span>}
                </div>
                <div className="text-[#EF9F27] text-sm mt-1">{plan.agents}</div>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <svg className="w-4 h-4 text-[#EF9F27] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-lg font-medium transition-all text-sm text-white"
                style={{ background: plan.highlight ? '#4a3fad' : 'rgba(255,255,255,0.07)' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
