import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  // { label: "Poruci", href: "/order" },
  { label: "BO", href: "/backoffice" },
  { label: "Prinos", href: "/backoffice/yield" },
  { label: "Narudzbe", href: "/backoffice/orders" },
  { label: "Dostave", href: "/delivery" },
  { label: "Kupci", href: "/backoffice/users" },
];

const Navigation: React.FC = () => {
  return (
    <div className="flex p-3 gap-4 overflow-auto">
      {links.map((item) => (
        <Link
          className="font-semibold text-xl"
          key={item.label}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
