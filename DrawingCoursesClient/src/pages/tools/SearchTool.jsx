

import { Link } from "react-router-dom"
import { useState } from "react"

export default function SearchTools({  }) {
  return (
    <div className="text-center my-10">
        <form>
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Search Tool..."/>
            <button className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" type="submit">Search</button>
        </form>
    </div>
  )
}
