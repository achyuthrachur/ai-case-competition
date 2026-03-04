import { DownloadCard } from '@/components/DownloadCard';

const DOWNLOAD_CARDS = [
  {
    fileName: 'transactions.csv',
    description: 'Synthetic transaction records for Meridian Financial. ~75,000 rows. Anomalies pre-labeled.',
    fileSize: '~10–12 MB',
    href: '/transactions.csv',
  },
  {
    fileName: 'data_dictionary.md',
    description: 'Plain-language description of every column in the dataset.',
    fileSize: '< 5 KB',
    href: '/data_dictionary.md',
  },
  {
    fileName: 'setup_guide.md',
    description: 'Step-by-step instructions for setting up VS Code and AI tools before you start.',
    fileSize: '< 5 KB',
    href: '/setup_guide.md',
  },
] as const;

export default function DownloadsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16">
      <div className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold text-crowe-indigo-dark">Downloads</h1>
        <p className="text-tint-700 mt-2 text-lg">Everything you need to get started</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {DOWNLOAD_CARDS.map((card) => (
          <DownloadCard key={card.fileName} {...card} />
        ))}
      </div>
    </div>
  );
}
