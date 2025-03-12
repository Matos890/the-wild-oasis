import Link from "next/link";
import { getServerSession } from "next-auth";
import { auth, authOptions } from "../_lib/auth"; // Importa le opzioni di autenticazione

export default async function Navigation() {
const session = auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              <img className='h-8 rounded-full flex item-center gap-4'
               src={session.user.image} alt=""  referrerPolicy="no-referrer"/>
              <span>Guest Area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
        {/* {session?.user ? (
          <li className="font-bold text-green-500">
            Logged in as {session.user.name}
          </li>
        ) : (
          <li className="text-red-500">Not logged in</li>
        )} */}
      </ul>
    </nav>
  );
}
