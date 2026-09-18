import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPreset } from '@aequus/curve-presets';
import { CurveChart } from '../../../components/CurveChart';
import { FeeChart } from '../../../components/FeeChart';
import { LaunchPanel } from '../../../components/LaunchPanel';

export default function PresetDetailPage({ params }: { params: { id: string } }) {
  const preset = getPreset(params.id);
  if (!preset) return notFound();

  const { meta, sim } = preset;

  return (
    <main>
      <Link href="/" className="text-sm text-white/50 hover:text-white/80">
        ← All presets
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="text-3xl font-bold">{meta.name}</h1>
        <p className="mt-2 max-w-2xl text-white/60">{meta.description}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Price curve</h2>
          <CurveChart sim={sim} />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-3 text-sm font-semibold text-white/70">
            {sim.baseFee.mode === 'rate-limiter' ? 'Fee vs. buy size' : 'Fee vs. time'}
          </h2>
          <FeeChart sim={sim} />
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-3 text-sm font-semibold text-white/70">Why this shape</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-white/70">
          {meta.rationale.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-white/40">Migration fee</dt>
            <dd className="font-medium">{sim.migrationFeeBps / 100}%</dd>
          </div>
          <div>
            <dt className="text-white/40">Post-migration fee</dt>
            <dd className="font-medium">{sim.migratedPoolFeeBps / 100}%</dd>
          </div>
          <div>
            <dt className="text-white/40">Base fee mode</dt>
            <dd className="font-medium capitalize">{sim.baseFee.mode.replace('-', ' ')}</dd>
          </div>
          <div>
            <dt className="text-white/40">Total supply</dt>
            <dd className="font-medium">{sim.totalTokenSupply.toLocaleString()}</dd>
          </div>
        </dl>
      </section>

      <LaunchPanel preset={preset} />
    </main>
  );
}
