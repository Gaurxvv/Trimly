import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    TabsContent,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BeatLoader } from "react-spinners";
import Error from "./error"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import useFetch from "@/hooks/use-fetch"
import { signup } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"


const Signup = () => {

    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const { fetchUser } = UrlState();
    const { data, error, loading, fn: fnSignup } = useFetch(signup, formData)
    useEffect(() => {
        if (data && !error) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            fetchUser();
        }
    }, [data, error])
    const handleSignup = async () => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                    .email("Invalid Email")
                    .required("Email is Required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required(" Password is Required"),
            });

            await schema.validate(formData, { abortEarly: false })
            await fnSignup()
            console.log("Signup successful, redirecting...");

        }
        catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }
    return (
        <TabsContent value="signup">
            <Card className={"bg-[#737584] container h-fit"} >
                <CardHeader  >
                    <CardTitle className={"font-bold text-white text-lg"}>Signup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                    <div className="space-y-1">
                        <Label className={"font-semibold"} htmlFor="name">Name</Label>
                        <Input name="name" placeholder="Your full name" onChange={handleInputChange} />
                        {errors.name && < Error message={errors.name} />}
                    </div>
                    <div className="space-y-1">
                        <Label className={"font-semibold"} htmlFor="email-signup">Email</Label>
                        <Input name="email" type="email" placeholder="you@example.com" onChange={handleInputChange} />
                        {errors.email && < Error message={errors.email} />}
                    </div>
                    <div className="space-y-1">
                        <Label className={"font-semibold"} htmlFor="signup-password">Password</Label>
                        <Input name="password" type="password" placeholder="Set password" onChange={handleInputChange} />
                        {errors.password && < Error message={errors.password} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignup} className={"bg-[#41414b] hover:opacity-75 hover:bg-[#41414b]"}>{loading ? <BeatLoader size={10} color="white" /> : "Signup"}</Button>                    </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default Signup;