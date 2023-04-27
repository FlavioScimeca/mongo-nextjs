import { selectUser, setUserLoginDetails } from '@/slices/userSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const userDetail = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickLogo = () => {
    router.push('/');
  };

  const onLogout = () => {
    dispatch(
      setUserLoginDetails({
        name: '',
        email: '',
        isAdmin: '',
        _id: '',
      })
    );
    router.push('/login');
  };
  return (
    <div className="py-2 px-5 flex justify-around items-center shadow-lg bg-emerald-600">
      <div
        className=" cursor-pointer flex gap-4 items-center"
        onClick={() => onClickLogo()}
      >
        <Image
          src="/mongodb_logo.svg"
          alt="mongodb-logo"
          width="50"
          height="50"
        />
        <div className="text-zinc-700 font-semibold underline">
          <Link
            target="blank"
            href="https://github.com/FlavioScimeca/mongo-nextjs"
          >
            Link Repo
          </Link>
        </div>
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
