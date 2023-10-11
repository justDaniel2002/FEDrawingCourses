

export default function SearchCourses({  }) {
  return (
    <div className="text-center my-20">
        <form>
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Search Course..."/>
            <button className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" type="submit">Search</button>
        </form>
    </div>
  )
}
