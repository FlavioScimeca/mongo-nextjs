import { selectUser, setUserLoginDetails } from '@/slices/userSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const userDetail = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(userDetail);

  const onLogout = () => {
    dispatch(
      setUserLoginDetails({
        name: '',
        email: '',
        isAdmin: '',
        _id: '',
      })
    );
  };
  return (
    <div className="py-2 px-5 flex justify-between items-center shadow-lg bg-emerald-600">
      <div>
        <Image
          src="/mongodb_logo.svg"
          alt="mongodb-logo"
          width="50"
          height="50"
        />
      </div>
      {userDetail._id == '' ? (
        <div>
          <Link
            className="ml-5 p-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-zinc-700 hover:text-zinc-500 font-semibold"
            href="/register"
          >
            register
          </Link>
          <Link
            className="ml-5 p-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-zinc-700 hover:text-zinc-500 font-semibold"
            href="/login"
          >
            login
          </Link>
        </div>
      ) : (
        <div>
          <button
            className="p-2 bg-red-600 hover:bg-red-700 rounded-md text-zinc-200 hover:text-zinc-300 font-semibold"
            onClick={() => onLogout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
