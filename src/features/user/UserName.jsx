import { useSelector } from "react-redux";

export default function UserName() {
  const userName = useSelector((Store) => Store.user.username);
  console.log(userName);

  if (!userName) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
}
