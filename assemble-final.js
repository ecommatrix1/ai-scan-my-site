const fs = require('fs');
const swc = require('./node_modules/next/dist/build/swc');

const code = fs.readFileSync('AIScanMySite.tsx', 'utf8');
const lines = code.split('\n');

const pricingOpening = `
      {/* ALWAYS-VISIBLE PRICING */}
      <section id="pricing" className="relative z-10 border-t border-border bg-surface-2 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-info text-xs font-mono mb-4"><CreditCard className="w-3.5 h-3.5" /><span>PLANS & PRICING</span></div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">Simple, Transparent Pricing</h2>
            <div className="text-base text-ink-3 mt-3 max-w-xl mx-auto leading-relaxed">Start free — no credit card required. Upgrade anytime for more scans, unlimited fix guides, and priority support.</div>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl badge-success text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" /><span>Secure payments via <strong>UPI · Cards · Net Banking</strong> — Razorpay India</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FREE */}
            <div className="card p-6 flex flex-col">`;

const fullCode = [
  ...lines.slice(0, 1430),
  pricingOpening,
  ...lines.slice(1430)
].join('\n');

swc.transform(fullCode, {
  filename: 'AIScanMySite.tsx',
  jsc: { parser: { syntax: 'typescript', tsx: true } }
}).then(res => {
  console.log('🎉🎉🎉 BOOM! PERFECT FULL SWC TRANSFORM PASSED WITH ZERO ERRORS! 🎉🎉🎉');
  fs.writeFileSync('AIScanMySite.tsx', fullCode, 'utf8');
  fs.writeFileSync('app/AIScanMySite.tsx', fullCode, 'utf8');
}).catch(err => console.error('FAILED:', err.message));
