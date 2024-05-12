import React from 'react';


import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
     

      {session?.user?.name && (
        <h1 className='mb-2.5 text-3xl font-bold'>Welcome {session.user.name}</h1>
      )}


      <Button variant={session ? 'destructive' : 'default'} className='mt-5' asChild>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </Button>
    </main>
  );
}