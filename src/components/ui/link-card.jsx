import React from 'react'
import { Link } from "react-router-dom"
import { Copy, Download, LinkIcon, Trash } from 'lucide-react'
import { Button } from './button'
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from 'react-spinners';
const LinkCard = ({ url, fetchUrls }) => {
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);
    };

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);
    return (
        <div className="flex justify-center items-center mt-3">
            <div className='flex  mt-1.5 w-2/3 flex-col md:flex-row gap-5 border p-4 bg-[#454548b6] rounded-lg'>
                <img src={url?.qr}
                    className='h-32 object-contain ring ring-red-200 self-start'
                    alt="qr code" />
                <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
                    <span className="text-3xl font-extrabold hover:underline cursor-pointer">
                        {url?.title}
                    </span>
                    <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
                        https://trimrr.in/{url?.custom_url ? url?.custom_url : url.short_url}
                    </span>
                    <span className="flex items-center gap-1 hover:underline cursor-pointer">
                        <LinkIcon className="p-1" />
                        {url?.original_url}
                    </span>
                    <span className="flex items-end font-extralight text-sm flex-1">
                        {new Date(url?.created_at).toLocaleString()}
                    </span>
                </Link>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)
                        }
                        className="hover:bg-primary/20"
                    >
                        <Copy />
                    </Button>
                    <Button variant="ghost" className="hover:bg-primary/20" onClick={downloadImage}>
                        <Download />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => fnDelete().then(() => fetchUrls())}
                        disable={loadingDelete}
                        className="hover:bg-primary/20"
                    >
                        {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LinkCard