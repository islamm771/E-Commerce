import PathElement from "@/components/PathElement"
import Link from "next/link"


const NotFound = () => {
  return (
    <div className="container mx-auto px-8 xl:px-24">
      <PathElement indexPath="404 Error" />
      <div className="flex flex-col items-center justify-center gap-5 py-20">
        <h1 className="text-7xl text-center font-bold mb-4">404 Not Found</h1>
        <p className="text-sm text-center max-w-62.5 md:max-w-full mb-12">Your visited page not found. You may go home page.</p>
        <Link className="bg-red-500 px-4 py-2 text-sm rounded-sm text-white" href={"/"}>Back to home page</Link>
      </div>
    </div>
  )
}

export default NotFound