import { Button } from '@/components/ui/button'
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/use-fetch'
import { Filter, Link2, BarChart2, Star, Activity } from 'lucide-react'
import React, { useState } from 'react'
import { getUrls } from "@/db/apiUrls";
import { BarLoader } from 'react-spinners'
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";
import LinkCard from '@/components/ui/link-card';
import { CreateLink } from '@/components/create-link';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks
  } = useFetch(getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls()
  }, [])
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animated stat (simple count up)
  const AnimatedNumber = ({ value }) => {
    const [display, setDisplay] = React.useState(0);
    React.useEffect(() => {
      let start = 0;
      const end = value || 0;
      if (start === end) return;
      let increment = end / 30;
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setDisplay(end);
          clearInterval(timer);
        } else {
          setDisplay(Math.floor(current));
        }
      }, 15);
      return () => clearInterval(timer);
    }, [value]);
    return <span>{display}</span>;
  };

  // Extra stats
  const now = new Date();
  const activeLinks = urls?.filter(url => {
    const created = new Date(url.created_at);
    const diff = (now - created) / (1000 * 60 * 60 * 24); // days
    return diff <= 7;
  })?.length || 0;

  let mostClicked = null;
  if (urls && clicks) {
    const clickCounts = urls.map(url => ({
      ...url,
      clickCount: clicks.filter(c => c.url_id === url.id).length
    }));
    mostClicked = clickCounts.reduce((max, curr) => curr.clickCount > (max?.clickCount || 0) ? curr : max, null);
  }

  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color='#91939f' />}
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <Card className="flex flex-row items-center gap-4 bg-[#f7f7f8] text-black shadow-md p-3 sm:p-4 w-full">
          <div className="p-3 rounded-full bg-blue-100">
            <Link2 className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg font-bold">Links Created</CardTitle>
            <CardContent className="p-0 text-2xl sm:text-3xl font-extrabold">
              <AnimatedNumber value={urls?.length || 0} />
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 bg-[#f7f7f8] text-black shadow-md p-3 sm:p-4 w-full">
          <div className="p-3 rounded-full bg-green-100">
            <BarChart2 className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg font-bold">Total Clicks</CardTitle>
            <CardContent className="p-0 text-2xl sm:text-3xl font-extrabold">
              <AnimatedNumber value={clicks?.length || 0} />
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 bg-[#f7f7f8] text-black shadow-md p-3 sm:p-4 w-full">
          <div className="p-3 rounded-full bg-yellow-100">
            <Activity className="h-7 w-7 text-yellow-600" />
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg font-bold">Active Links</CardTitle>
            <CardContent className="p-0 text-2xl sm:text-3xl font-extrabold">
              <AnimatedNumber value={activeLinks} />
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 bg-[#f7f7f8] text-black shadow-md p-3 sm:p-4 w-full">
          <div className="p-3 rounded-full bg-purple-100">
            <Star className="h-7 w-7 text-purple-600" />
          </div>
          <div className="truncate max-w-[120px]">
            <CardTitle className="text-base sm:text-lg font-bold">Most Clicked</CardTitle>
            <CardContent className="p-0 text-xs sm:text-base font-semibold truncate">
              {mostClicked ? (
                <>
                  <span className="block truncate">{mostClicked.title}</span>
                  <span className="block text-purple-700 text-lg">{mostClicked.clickCount} clicks</span>
                </>
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
      {/* Filter bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-[#18181b] py-2 px-2 sm:px-4 rounded-lg sticky top-2 z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold w-full sm:w-auto text-center sm:text-left">My Links</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Filter Links..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <CreateLink />
        </div>
      </div>
      {/* Link list or empty state */}
      <div>
        {error && <div className="text-red-500 text-center">{error.message}</div>}
        {filteredUrls && filteredUrls.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <div className="text-2xl mb-2">No links found</div>
            <div className="mb-4">Try creating a new link or adjusting your filter.</div>
            <CreateLink />
          </div>
        )}
        <div className="mt-4">
          <div className="flex flex-col gap-6 w-full">
            {(filteredUrls || []).map((url, i) => (
              <LinkCard key={i} url={url} fetchUrls={fnUrls} showActions />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard