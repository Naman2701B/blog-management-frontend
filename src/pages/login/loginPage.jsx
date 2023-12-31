import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
import OAuth from "../../components/OAuth";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return login({ email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });
    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="font-robot text-2xl text-center text-dark-hard mb-8">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label
                                htmlFor="email"
                                className="text-[#5A7184] font-semibold block"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                placeholder="Enter Email ID"
                                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                }`}
                            />
                            {errors.email?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col mb-6 w-full">
                            <label
                                htmlFor="password"
                                className="text-[#5A7184] font-semibold block"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password Length must be atleast 6 characters",
                                    },
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                })}
                                placeholder="Enter Password"
                                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-[#c3cad9]"
                                }`}
                            />
                            {errors.password?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <Link
                            to="/forgotPassword"
                            className="text-sm font-semibold text-primary"
                        >
                            Forgot Password?
                        </Link>
                        <button
                            type="submit"
                            disabled={!isValid || isLoading}
                            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            Sign In
                        </button>
                        <OAuth />
                        <p className="text-sm font-semibold text-[#5a7184]">
                            Don't have an account?
                            <Link to="/register" className="text-primary">
                                Register Now
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default LoginPage;
