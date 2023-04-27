import Header from '@/components/header';
import { selectUser, setUserLoginDetails } from '@/slices/userSlice';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const userDetail = useSelector(selectUser);

  useEffect(() => {
    if (userDetail._id !== '') {
      console.log('utente settato');
      setUser(userDetail);
    } else {
      async () => {
        const userFind = await axios.post('/api/auth/login', {
          email,
        });
        dispatch(
          setUserLoginDetails({
            name: userFind.data.existingUser.name,
            email: userFind.data.existingUser.email,
            isAdmin: userFind.data.existingUser.isAdmin,
            _id: userFind.data.existingUser._id,
          })
        );
        setUser(userDetail);
      };
    }
  }, [dispatch, userDetail]);
  // console.log(user);
  return (
    <div>
      <Header />
      {user && user._id !== '' ? (
        <div className="mt-5 flex justify-around items-center h-[50vh]">
          <div>
            <Link
              className="bg-emerald-500 p-2 rounded-md active:bg-emerald-600"
              href="/form-create"
            >
              Crea Note
            </Link>
          </div>
          <div>
            <Link
              className="p-2 bg-yellow-400 rounded-md active:bg-yellow-500"
              href="/personal-note"
            >
              See all notes
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <span className="font-semibold text-2xl text-yellow-400 border-b-2 pb-2 border-yellow-400">
            Loggati o registrati
          </span>
        </div>
      )}
    </div>
  );
}
