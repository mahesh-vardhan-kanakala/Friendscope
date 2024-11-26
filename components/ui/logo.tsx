'use client';

import { Users } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Users className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl">FriendScope</span>
    </div>
  );
}