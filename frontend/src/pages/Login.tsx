import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user: {
    _id: string;
    username: string;
    role: string;
  };
  token: string
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({
    email,
    password,
  }) => {
    setError(null);

    try {
      console.log({ email, password }); // Log the payload
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );

      if (response.data?.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        const {role} = response.data.user;

        if (role === "agent") {
          navigate("/agent-dashboard");
        } else if (role === "supervisor") {
          navigate("/supervisor-dashboard");
        } else {
          navigate("/")
        }
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error: ", error)

        if (error.response) {
          if (error.response.status === 404) {
            setError("Login endpoint not found. Check the API URL");
          } else if (error.response.status === 401) {
            setError("Invalid email or password");
          } else {
            setError(`Error: ${error.response.statusText}`)
          }
        } else if (error.request) {
          setError("No response from the server. Is it running?");
        }else {
          setError("Unexpected error occurred. Try again later.");
        }
      } else {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred.")
      }

      
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Job Scheduler System
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters." },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full p-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
