"use client"
import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const onFinish = useCallback(async (formData: FormData) => {
        const res = await signIn("credentials", {
            // email: formData.get("email"),
            // password: formData.get("password"),
            ...formData,
            redirect: false,
        });

        if (res && !res.error) {
            router.push("/");
        } else {
            console.log(res);
        }
    }, [router])

    return (
        // <SignInForm/>
        <Form onFinish={onFinish} layout={"vertical"}>
            <Form.Item name={"email"}>
                <Input placeholder={"E-mail"} value={"v@email.com"}/>
            </Form.Item>
            <Form.Item name={"password"}>
                <Input placeholder={"Password"} type={"password"} value={"123"}/>
            </Form.Item>
            <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>Login</Button>
            </Form.Item>
        </Form>
    );
}