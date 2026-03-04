export default function InstructionsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      {/* PAGE TITLE BLOCK */}
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Instructions</h1>
        <p className="text-tint-700 mt-2 text-lg">Case Brief</p>
      </div>

      {/* BACKGROUND SECTION */}
      <div className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Background
        </h2>
        <p className="mt-4 text-tint-700 leading-relaxed">
          You are working with a fictional financial institution called Meridian Financial. The
          compliance team has been manually reviewing transaction records and flagging anomalies.
          They&apos;ve asked for a dashboard that makes it easier to visualize suspicious activity,
          understand patterns, and communicate findings to leadership.
        </p>
      </div>

      {/* YOUR DATASET SECTION */}
      <div className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Your Dataset
        </h2>
        <p className="mt-4 text-tint-700 leading-relaxed">
          You&apos;ve been provided with a synthetic dataset of approximately 500&ndash;1,000
          transaction records (
          <code className="text-sm bg-tint-100 px-1 py-0.5 rounded font-mono">
            transactions.csv
          </code>
          ). Each row represents a single transaction. Every record has already been reviewed
          &mdash; anomalies are pre-labeled in the{' '}
          <code className="text-sm bg-tint-100 px-1 py-0.5 rounded font-mono">is_anomalous</code>{' '}
          column. A plain-English reason for each flagged transaction is in the{' '}
          <code className="text-sm bg-tint-100 px-1 py-0.5 rounded font-mono">
            anomaly_notes
          </code>{' '}
          column.
        </p>
      </div>

      {/* YOUR DELIVERABLES SECTION */}
      <div className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Your Deliverables
        </h2>
        <ol className="space-y-6 mt-4">
          <li className="flex gap-4 items-start">
            <span className="w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            <div>
              <p className="font-semibold text-crowe-indigo-dark">Standalone HTML Dashboard</p>
              <p className="text-tint-700 mt-1 leading-relaxed">
                A single .html file that can be opened directly in any browser with no server or
                dependencies. It should visualize the transaction data, surface anomalies, and allow
                a viewer to explore patterns.
              </p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <span className="w-8 h-8 rounded-full bg-crowe-indigo-dark text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            <div>
              <p className="font-semibold text-crowe-indigo-dark">2-Page Findings Memo</p>
              <p className="text-tint-700 mt-1 leading-relaxed">
                A written document (PDF, DOCX, or Markdown) summarizing what you found, what
                patterns you observed, and what you recommend. Pretend you are presenting this to
                the institution&apos;s leadership team.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* TOOLS YOU SHOULD USE SECTION */}
      <div className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          Tools You Should Use
        </h2>
        <ul className="space-y-2 mt-4">
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>VS Code (code editor)</span>
          </li>
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>Cursor or GitHub Copilot (AI coding assistant)</span>
          </li>
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>ChatGPT, Claude, or any LLM (for ideation, narrative writing, code generation)</span>
          </li>
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>Any free, publicly accessible UI libraries or chart libraries you find</span>
          </li>
        </ul>
      </div>

      {/* WHAT YOU DO NOT NEED TO DO SECTION */}
      <div className="mt-10 sm:mt-12">
        <h2 className="text-2xl font-bold text-crowe-indigo-dark border-l-4 border-crowe-amber pl-4">
          What You Do NOT Need to Do
        </h2>
        <ul className="space-y-2 mt-4">
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>Build a machine learning model &mdash; anomalies are already labeled</span>
          </li>
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>Deploy anything to a server</span>
          </li>
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>Follow any specific branding guidelines</span>
          </li>
          <li className="flex gap-2 text-tint-700 leading-relaxed">
            <span className="text-crowe-amber font-bold flex-shrink-0 mt-0.5">&mdash;</span>
            <span>Use any particular framework &mdash; plain HTML/CSS/JS is perfectly valid</span>
          </li>
        </ul>
      </div>

      {/* GUIDANCE CALLOUT */}
      <div className="mt-10 sm:mt-12 bg-section-amber border-l-4 border-crowe-amber rounded-r-lg px-6 py-5">
        <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
          Guidance
        </p>
        <p className="italic text-tint-900 leading-relaxed">
          The end deliverables are clear. How you get there is entirely up to you. We encourage you
          to use AI aggressively &mdash; to ideate, to write code, to draft your memo, to debug.
          What we&apos;re evaluating is how well you can direct AI to produce something meaningful,
          polished, and insightful.
        </p>
      </div>
    </div>
  );
}
