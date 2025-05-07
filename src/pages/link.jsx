import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const cardBase = "bg-[#5d5e6c] text-white rounded-xl shadow-md p-6";
const cardHeader = "mb-2 text-lg font-semibold";

const LinkPage = () => {
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

  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Left: Link Details */}
        <div className="col-span-1 space-y-4 sm:space-y-6">
          <div className={cardBase + " w-full p-4 sm:p-6"}>
            <h1 className="text-xl sm:text-2xl font-bold mb-4 break-words">{url?.title}</h1>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                <span className="font-semibold text-base sm:text-lg">Short URL:</span>
                <a
                  href={`https://trimmly.vercel.app/${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all text-sm sm:text-base"
                >
                  https://trimmly.vercel.app/{link}
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText(`https://trimmly.vercel.app/${link}`)}
                  className="w-full sm:w-auto"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                <span className="font-semibold text-base sm:text-lg">Original URL:</span>
                <a
                  href={url?.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1 break-all text-sm sm:text-base"
                >
                  <LinkIcon className="h-4 w-4" />
                  {url?.original_url}
                </a>
              </div>
              <div className="text-xs sm:text-sm text-white">
                Created: {new Date(url?.created_at).toLocaleString()}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                <Button variant="outline" onClick={downloadImage} className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    fnDelete().then(() => {
                      navigate("/dashboard");
                    })
                  }
                  disabled={loadingDelete}
                  className="w-full sm:w-auto"
                >
                  {loadingDelete ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    <>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className={cardBase + " flex justify-center items-center py-6 sm:py-8 w-full"}>
            <img
              src={url?.qr}
              className="w-40 h-40 sm:w-64 sm:h-64 object-contain ring-2 ring-blue-500 p-2 rounded-lg bg-white"
              alt="QR Code"
            />
          </div>
        </div>
        {/* Right: Stats */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className={cardBase + " flex flex-col justify-center items-center w-full p-4 sm:p-6"}>
              <div className={cardHeader + " text-base sm:text-lg"}>Total Clicks</div>
              <p className="text-2xl sm:text-3xl font-bold text-center">{stats?.length || 0}</p>
            </div>
            <div className={cardBase + " sm:col-span-1 md:col-span-2 w-full p-4 sm:p-6"}>
              <div className="w-full max-w-full h-56 sm:h-72 overflow-x-auto">
                <Location stats={stats || []} />
              </div>
            </div>
          </div>
          <div className={cardBase + " w-full p-4 sm:p-6"}>
            <div className="w-full max-w-full h-60 sm:h-80 overflow-x-auto">
              <DeviceStats stats={stats || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;