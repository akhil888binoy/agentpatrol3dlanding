'use client'
import { useEffect, useRef, useState } from 'react'

const cards = [
  {
    num: '01',
    title: 'No visibility at runtime',
    body: "Your agent runs as a black box once deployed. You have no way to see what it's actually doing during each run.",
  },
  {
    num: '02',
    title: 'No way to stop it',
    body: "Alerts come too late. By the time anyone investigates, the damage is already done. There's no enforcement layer.",
  },
  {
    num: '03',
    title: 'No audit trail',
    body: 'Your CISO, auditor, or enterprise client asks for proof. You have no session reports. Nothing to show.',
  },
]

const ENTER_DURATION = 0.65
const STAGGER = 0.15

export function Problem() {
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const ms = ((cards.length - 1) * STAGGER + ENTER_DURATION) * 1000
    const t = setTimeout(() => setEntered(true), ms)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <section
      id="problem"
      className="hero-theme-section"
      style={{
        padding: '120px 0',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-20% 0 auto 0',
          height: 520,
          background:
            'radial-gradient(55% 65% at 50% 0%, rgba(50,119,255,0.18) 0%, rgba(50,119,255,0.08) 35%, rgba(50,119,255,0) 72%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 700, marginBottom: 72 }}>
          <div className="eyebrow">
            <span className="dot amber" />// Sound Familiar?
          </div>
          <h2 className="section-title" style={{ marginTop: 20, maxWidth: 14 * 40 }}>
            You deployed an AI agent.
            <br />
            <span style={{ color: 'var(--ink-3)' }}>Now what?</span>
          </h2>
          <p className="lede" style={{ marginTop: 20, maxWidth: 620 }}>
            Most organizations have no way to observe, enforce, or audit what their AI agents do after deployment.
          </p>
        </div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {cards.map((card, i) => {
            const isHovered = entered && hovered === i
            return (
              <article
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative',
                  border: `1px solid ${isHovered ? 'rgba(255,77,87,0.45)' : 'rgba(91,120,173,0.28)'}`,
                  background: isHovered
                    ? 'linear-gradient(145deg, rgba(8,18,42,0.92), rgba(5,12,31,0.84))'
                    : 'linear-gradient(145deg, rgba(8,18,42,0.82), rgba(4,10,28,0.72))',
                  boxShadow: isHovered
                    ? '0 18px 44px rgba(1,9,30,0.72), inset 0 1px 0 rgba(130,155,210,0.16)'
                    : '0 10px 30px rgba(1,8,24,0.45), inset 0 1px 0 rgba(130,155,210,0.1)',
                  borderRadius: 18,
                  padding: '28px 24px 24px',
                  cursor: 'default',
                  backdropFilter: 'blur(2px)',
                  opacity: visible ? 1 : 0,
                  transform: `translateY(${!visible ? 28 : isHovered ? -8 : 0}px)`,
                  transition: entered
                    ? 'opacity 0.3s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1), border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease'
                    : `opacity ${ENTER_DURATION}s ease ${i * STAGGER}s, transform ${ENTER_DURATION}s cubic-bezier(0.22,1,0.36,1) ${i * STAGGER}s`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 24,
                    right: 24,
                    top: 0,
                    height: 1,
                    background: isHovered
                      ? 'linear-gradient(90deg, rgba(255,77,87,0), rgba(255,77,87,0.55), rgba(255,77,87,0))'
                      : 'linear-gradient(90deg, rgba(97,147,255,0), rgba(97,147,255,0.45), rgba(97,147,255,0))',
                    transition: 'background 0.22s ease',
                  }}
                />

                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                    fontSize: 11,
                    color: isHovered ? 'var(--red)' : 'rgba(130,165,230,0.72)',
                    letterSpacing: '0.12em',
                    marginBottom: 18,
                    transition: 'color 0.22s ease',
                  }}
                >
                  {card.num}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: 1.24,
                    color: 'var(--ink)',
                    margin: '0 0 12px',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: isHovered ? 'var(--ink-2)' : 'var(--ink-3)',
                    margin: 0,
                    transition: 'color 0.22s ease',
                  }}
                >
                  {card.body}
                </p>
              </article>
            )
          })}
        </div>

        <p
          style={{
            marginTop: 58,
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: '0.1em',
            color: 'var(--ink-3)',
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          // This isn&apos;t a future risk. It&apos;s the current state of AI agent deployment - right now.
        </p>
      </div>
    </section>
  )
}
