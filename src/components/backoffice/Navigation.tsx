import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "BO", href: "/backoffice" },
  { label: "Dostave", href: "/delivery" },
  { label: "Narudzbe", href: "/order" },
];

const Navigation: React.FC = () => {
  return (
    <div className="flex p-2 gap-4">
      {links.map((item) => (
        <Link key={item.label} href={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
