import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LineChart, LinkIcon, Shield, Sparkles, Zap, QrCode, Users, Code2, Star } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: <Zap className="h-7 w-7" />, title: 'Lightning Fast',
    desc: 'Create shortened URLs in milliseconds with our optimized infrastructure.'
  },
  {
    icon: <LineChart className="h-7 w-7" />, title: 'Detailed Analytics',
    desc: 'Track clicks, location data, devices, and more with real-time analytics.'
  },
  {
    icon: <Shield className="h-7 w-7" />, title: 'Secure & Private',
    desc: 'All links are securely processed with enterprise-grade encryption.'
  },
  {
    icon: <Sparkles className="h-7 w-7" />, title: 'Custom Links',
    desc: 'Create branded, memorable links with custom domains and aliases.'
  },
  {
    icon: <QrCode className="h-7 w-7" />, title: 'QR Codes',
    desc: 'Generate QR codes for every short link for easy offline sharing.'
  },
  {
    icon: <Users className="h-7 w-7" />, title: 'Team Collaboration',
    desc: 'Invite team members and manage links together with shared analytics.'
  },
  {
    icon: <Code2 className="h-7 w-7" />, title: 'API Access',
    desc: 'Integrate Trimly with your own apps using our robust API.'
  },
  {
    icon: <Star className="h-7 w-7" />, title: 'Custom Branding',
    desc: 'Add your logo and brand colors to every short link and QR code for a professional touch.'
  },
];

const LandingPage = () => {
    const [longUrl, setlongUrl] = useState()
    const navigate = useNavigate()
    const handleShorten = (e) => {
        e.preventDefault();
        if (longUrl) navigate(`/auth?createNew=${longUrl}`)
    };
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#23232b] via-[#18181b] to-[#23232b] flex flex-col">
            <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 md:py-24">
                <section className="w-full px-4 text-center pt-12 pb-8 flex-1 flex flex-col justify-center sm:pt-16 sm:pb-10">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in leading-tight">
                        <span>Make your links </span>
                        <span className="gradient-text text-[#6f6f7c]">trimly</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
                        Transform long, complex URLs into short, memorable links that are easy to share and track.
                    </p>
                    <form onSubmit={handleShorten} className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto mb-8 w-full">
                        <div className="relative w-full md:w-2/3 mb-2 md:mb-0">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-trimly-500" />
                            </div>
                            <Input
                                type="text"
                                value={longUrl}
                                placeholder="Paste your long URL here..."
                                onChange={(e) => setlongUrl(e.target.value)}
                                className="pl-10 h-12 border-2 border-trimly-100 focus:border-trimly-400 focus:ring-trimly-400 text-base w-full"
                            />
                        </div>
                        <Button className="h-12 w-full md:w-auto px-8 text-base font-semibold bg-gradient-to-r from-[#41414b] to-[#6f6f7c] hover:from-[#6f6f7c] hover:to-[#41414b] transition">
                            Shorten URL
                        </Button>
                    </form>
                </section>
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Why choose Trimly?</h2>
                    <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                        Our platform offers more than just link shortening. Get powerful features to enhance your link management.
                    </p>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {features.map((f, i) => (
                        <Card key={i} className="h-60 sm:h-64 w-full bg-[#f7f7f8] border-0 shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle>
                                    <div className="mb-4 p-3 rounded-full w-14 h-14 flex items-center justify-center bg-trimly-50 text-trimly-600 mx-auto">
                                        {f.icon}
                                    </div>
                                    <span className="block text-base sm:text-lg font-bold text-center mt-2">{f.title}</span>
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm text-center mt-2">
                                    {f.desc}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LandingPage