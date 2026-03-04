import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const MAX_HTML_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
const MAX_MEMO_SIZE = 25 * 1024 * 1024; // 25 MB in bytes
const VALID_MEMO_EXTS = ['.pdf', '.docx', '.md'] as const;

function sanitizeName(name: string): string {
  const sanitized = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return sanitized || 'participant';
}

function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? '' : filename.slice(lastDot).toLowerCase();
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const htmlFile = formData.get('htmlFile');
  const memoFile = formData.get('memoFile');

  // Validate fields first
  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json(
      { success: false, error: 'Participant name is required' },
      { status: 400 }
    );
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return NextResponse.json(
      { success: false, error: 'Email address is required' },
      { status: 400 }
    );
  }

  // Validate files after fields
  if (!(htmlFile instanceof File)) {
    return NextResponse.json(
      { success: false, error: 'HTML dashboard file is required' },
      { status: 400 }
    );
  }

  if (getExtension(htmlFile.name) !== '.html') {
    return NextResponse.json(
      { success: false, error: 'HTML file must be .html format' },
      { status: 400 }
    );
  }

  if (htmlFile.size > MAX_HTML_SIZE) {
    return NextResponse.json(
      { success: false, error: 'HTML file exceeds the 10 MB limit' },
      { status: 400 }
    );
  }

  if (!(memoFile instanceof File)) {
    return NextResponse.json(
      { success: false, error: 'Findings memo file is required' },
      { status: 400 }
    );
  }

  const memoExt = getExtension(memoFile.name);

  if (!VALID_MEMO_EXTS.includes(memoExt as (typeof VALID_MEMO_EXTS)[number])) {
    return NextResponse.json(
      { success: false, error: 'Memo file must be .pdf, .docx, or .md format' },
      { status: 400 }
    );
  }

  if (memoFile.size > MAX_MEMO_SIZE) {
    return NextResponse.json(
      { success: false, error: 'Memo file exceeds the 25 MB limit' },
      { status: 400 }
    );
  }

  // Build Blob path prefix
  const sanitized = sanitizeName(name.trim());
  const timestamp = Date.now();
  const prefix = `submissions/${sanitized}-${timestamp}`;

  // Upload both files in parallel
  try {
    const [dashboardBlob, memoBlob] = await Promise.all([
      put(`${prefix}/dashboard.html`, htmlFile, { access: 'public' }),
      put(`${prefix}/memo${memoExt}`, memoFile, { access: 'public' }),
    ]);

    return NextResponse.json({
      success: true,
      submittedAt: new Date().toISOString(),
      files: {
        dashboard: dashboardBlob.url,
        memo: memoBlob.url,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'File upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
