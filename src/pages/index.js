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
    const localUser = localStorage.getItem('user');
    const parseUser = JSON.parse(localUser);
    const { email } = parseUser;
    if (userDetail._id !== '') {
      console.log('utente settato');
      setUser(userDetail);
    } else {
      const getUser = async () => {
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
  console.log(user);
  return (
    <div>
      <Header />
      {user && user._id !== '' ? (
        <div className="mt-5">
          crea note{' '}
          <Link className="bg-orange-500 p-2 rounded-md" href="/form-create">
            clicca qui
          </Link>
          <div className="mt-9">
            <Link
              className="p-2 bg-yellow-400 rounded-md"
              href="/personal-note"
            >
              See all notes
            </Link>
          </div>
        </div>
      ) : (
        <div>id non presente</div>
      )}
    </div>
  );
}
