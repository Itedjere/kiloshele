export default function Greeting({ name }: { name?: string }) {
  if (name) {
    return <h1>Hello {name}</h1>;
  }
  return <button>Please login</button>;
}
