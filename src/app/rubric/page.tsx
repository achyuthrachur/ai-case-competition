export default function RubricPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Rubric</h1>
        <p className="text-tint-700 mt-2 text-lg">Grading Criteria</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Data Analysis Depth — 40% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Data Analysis Depth</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">40%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Did they go beyond listing anomalous rows? Are there trend analyses, pattern clusters,
            time-series observations, or forward-looking insights?
          </p>
        </div>

        {/* Dashboard UI Quality — 35% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Dashboard UI Quality</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">35%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[35%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Does the dashboard look polished and intentional? Did they use UI libraries, animations,
            or charts that go beyond default AI-generated output?
          </p>
        </div>

        {/* Memo Quality — 15% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Memo Quality</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">15%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[15%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Is the written narrative clear, accurate, and actionable? Does it read like a real
            compliance memo or like a summary of what the code does?
          </p>
        </div>

        {/* Extra Credit — up to 15% */}
        <div className="bg-white shadow-crowe-card rounded-xl p-6">
          <h3 className="text-lg font-bold text-crowe-indigo-dark">Extra Credit</h3>
          <div className="mt-3">
            <p className="text-sm font-semibold text-crowe-indigo-dark mb-1.5">up to 15%</p>
            <div className="h-2 bg-tint-100 rounded-full overflow-hidden">
              <div className="h-full w-[15%] bg-crowe-indigo-dark rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="mt-4 text-tint-700 leading-relaxed text-sm">
            Did they go above and beyond? Unique chart types, external data context, custom
            animations, creative layout, unexpected insight?
          </p>
        </div>
      </div>

      {/* Grading Notes callout */}
      <div className="mt-10 sm:mt-12 bg-section-amber border-l-4 border-crowe-amber rounded-r-lg px-6 py-5">
        <p className="text-sm font-semibold text-crowe-amber uppercase tracking-wide mb-3">
          Grading Notes
        </p>
        <p className="italic text-tint-900 leading-relaxed">
          Grading is field-and-feel based. There is no formula. We&apos;re looking for evidence of
          critical thinking, intentional design decisions, and genuine engagement with the data
          &mdash; not just the volume of output.
        </p>
      </div>
    </div>
  );
}
