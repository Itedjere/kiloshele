export default function ImageGallery({ imgUrls }: { imgUrls: string[] }) {
  if (imgUrls.length === 0) return null;

  return (
    <div>
      {imgUrls.map((url) => (
        <li key={url}>
          <img src={url} />
        </li>
      ))}
    </div>
  );
}
