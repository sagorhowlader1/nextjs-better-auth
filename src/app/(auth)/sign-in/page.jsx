'use client';

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { signIn } from '@/lib/auth-client';
import { useState } from "react";
import Link from "next/link";

const SignInPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/"
        });

        console.log(resData, error)
    };
    return (
        <div className='flex items-center justify-center mt-15'>
            <Form
                className="flex w-96 flex-col gap-4"
                render={(props) => <form {...props} data-custom="foo" />}
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                 isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                        // className="w-full max-w-[280px]" name="password"
                    >
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            // className="w-full max-w-[280px]"
                            name="password"
                            type={isVisible ? "text" : "password"}
                        />
                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>

                
                <div className="flex gap-2">
                    <Button type="submit">
                        {/* <Check /> */}
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>

                <div>
                    <p className="text-2xl font-bold  text-[#9564DD]"><small>Forgot Password? 
                    <Link
                    className="text-blue-500 hover:underline text-2xl font-bold"
                     href="/forgot-password" > click here</Link></small></p>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;