import Image from "next/image";

export default function HomePage() {
    return (
        <div className="size-full relative">
            <h1>Home page</h1>
            <div className="h-[100vh]"></div>
            <div className="w-full h-[50vh] bg-yellow"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-white"></div>
            <div className="w-full h-[50vh]"></div>
            <div className="w-full h-[50vh] bg-black"></div>
        </div>
    );
}
