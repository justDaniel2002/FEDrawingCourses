export default function Courses({ Courses }) {
  return (
    <>
      <ul className="grid grid-cols-4 mx-auto max-w-[1260px] gap-10">
        {Courses.map((Course) => (
          <li key={Course.uuid} className="flex flex-col">
            <img
              src={Course.iconUrl}
              alt={Course.name}
              width={70}
              height={70}
              priority
            />
            <h3>{Course.name}</h3>
            <p>{Course.symbol}</p>
            <p>{Course.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
