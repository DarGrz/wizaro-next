'use client';

import { useTrackVisitor } from '@/app/hooks/useTrackVisitor';

export default function VisitorTracker() {
  useTrackVisitor();
  return null; // Nie renderuje nic widocznego, tylko wywołuje hook
}
