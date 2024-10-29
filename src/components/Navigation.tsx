import { useRouter } from "next/router";
import Link from "next/link";

const navItems = [
  { href: "/wikilist", label: "모든 위키" },
  { href: "/boards", label: "자유 게시판" },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <ul className="flex items-center gap-10">
      {navItems.map((item) => (
        <li
          key={item.href}
          className={`${
            router.pathname === item.href ? "font-bold" : "text-gray-400"
          } text-md hover:font-bold Mobile:hidden`}
        >
          <Link href={item.href} aria-label={item.label}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
