import { UserType } from "../utitlities/utils";

export default function User({ user }: { user: UserType }) {
  console.log("User props:", user);
  return (
    <div>
      <h2>User Profile</h2>
      {user.isAdmin && <button className="btn btn-primary">Edit</button>}
      <div>
        <strong>Name: </strong> {user.name}
      </div>
    </div>
  );
}
