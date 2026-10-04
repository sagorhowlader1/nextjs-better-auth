'use client';

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, InputGroup, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn, signUp } from '@/lib/auth-client';
import { useState } from "react";


const SignUpPage = () => {


    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: resData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password
        });

        console.log('after sign up', resData, error)
    };


    const handleGoogleSignIn = async () => {
        const resData = await signIn.social({
            provider: 'google'
        })
        console.log('afer google sign in', resData);

    }

    const handleGithubSignIn = async () => {
        const resData = await signIn.social({
            provider: 'github'
        })
        console.log('after github sign in', resData);
    }

    return (
        <div>
            <div className='flex items-center justify-center mt-15'>
                <Form
                    className="flex w-96 flex-col gap-4"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label>Name</Label>
                        <Input placeholder="John Doe" />
                        <FieldError />
                    </TextField>

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
                </Form>
            </div>

            <div className='flex items-center justify-center mt-2'>
                <p>OR</p>
                <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
                <Button onClick={handleGithubSignIn}>Sign In with Github</Button>
            </div>
        </div>
    );
};

export default SignUpPage;