// src/components/DownloadCard.tsx
// Stub — full Crowe-branded implementation in Plan 02

interface DownloadCardProps {
  fileName: string;
  description: string;
  fileSize: string;
  href: string;
}

export function DownloadCard({ fileName, description, fileSize, href }: DownloadCardProps) {
  return (
    <div>
      <h3>{fileName}</h3>
      <p>{description}</p>
      <p>{fileSize}</p>
      <a href={href} download>
        Download
      </a>
    </div>
  );
}
