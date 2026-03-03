// FOUND-02 import verification — this file exists only to confirm TypeScript can resolve all Phase 1 deps.
// Safe to delete after phase verification is complete.
import { useDropzone } from 'react-dropzone';
import { put } from '@vercel/blob';
import { Home } from 'iconsax-react';

// Suppress "declared but never used" lint errors
void (useDropzone as unknown);
void (put as unknown);
void (Home as unknown);
