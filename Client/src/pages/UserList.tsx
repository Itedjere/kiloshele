import { UserType } from "../utitlities/utils";

export default function UserList({ users }: { users: UserType[] }) {
  if (users.length === 0) return <p>No users available</p>;

  return (
    <div>
      {users.map((user) => (
        <a href={`/users/${user.id}`} key={user.id}>
          {user.name}
        </a>
      ))}
    </div>
  );
}
