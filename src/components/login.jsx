import {
    Card,
    CardContent,
    CardDescription,
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
import { login } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"

const Login = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const { data, error, loading, fn: fnLogin } = useFetch(login, formData)
    const { fetchUser } = UrlState();
    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            fetchUser();
        }
    }, [data, error])
    const handleLogin = async () => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid Email")
                    .required("Email is Required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required(" Password is Required"),
            });

            await schema.validate(formData, { abortEarly: false })
            console.log("Logging in with:", formData)
            await fnLogin()
        }
        catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }

    }
    return <TabsContent value="login">
        <Card className={"bg-[#737584] container h-fit"}>
            <CardHeader >
                <CardTitle className={"font-bold text-white text-lg"}>Login</CardTitle>
                <CardDescription className={"text-white font-medium"}>
                    to your account if you already have one
                </CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className="space-y-1">
                <div className="space-y-1">
                    <Label className={"font-semibold"} htmlFor="email">Email</Label>
                    <Input name="email" type="email" placeholder="you@example.com" onChange={handleInputChange} />
                    {errors.email && < Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Label className={"font-semibold"} htmlFor="password">Password</Label>
                    <Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange} />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin} className={"bg-[#41414b] hover:opacity-75 hover:bg-[#41414b]"}>{loading ? <BeatLoader size={10} color="white" /> : "Login"}</Button>
            </CardFooter>
        </Card>
    </TabsContent>

};
export default Login