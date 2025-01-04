
import { Link } from '@remix-run/react';

import { Button } from '~/components/ui/button';

export default function Index() {
  return (
    <div className="flex justify-center items-center h-screen p-10 flex-col gap-4">
      <h1 className="text-5xl font-bold">Productivity</h1>
      <div className="flex flex-row gap-2">
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
        {/* <Link to="/dashboard">Dashboard</Link> */}
      </div>
    </div>
  );
}
