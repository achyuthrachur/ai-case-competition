import { DocumentDownload } from 'iconsax-react';

interface DownloadCardProps {
  fileName: string;
  description: string;
  fileSize: string;
  href: string;
}

export function DownloadCard({ fileName, description, fileSize, href }: DownloadCardProps) {
  return (
    <div className="bg-white shadow-crowe-card rounded-xl p-6 flex flex-col gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-crowe-indigo-dark">{fileName}</h3>
        <p className="mt-2 text-sm text-tint-700 leading-relaxed">{description}</p>
        <p className="mt-3 text-xs text-tint-500 font-medium">{fileSize}</p>
      </div>
      <a
        href={href}
        download
        className="inline-flex items-center justify-center gap-2 rounded-md bg-crowe-indigo-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-crowe-indigo"
      >
        <DocumentDownload variant="Bold" size={18} />
        Download
      </a>
    </div>
  );
}
