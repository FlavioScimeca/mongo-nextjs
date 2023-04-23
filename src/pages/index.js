import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [access, setAccess] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, []);
  console.log(user);
  return (
    <div>
      ciao
      <Link className="ml-5 p-2 bg-yellow-400 rounded-md" href="/register">
        register
      </Link>
      {access ? (
        <div>
          utente presente {user.name} {user.email}
        </div>
      ) : (
        <div>utente assente</div>
      )}
    </div>
  );
}
