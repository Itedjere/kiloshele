import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleApolloErrors, loginSchema } from "../utitlities/utils";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN_COMPANY } from "../utitlities/graphql_mutation";
import { useAuthenticatedContext } from "../components/company/Contexts/AuthenticationContext";
import { toast } from "react-toastify";
import ButtonLoading from "../components/company/LoadingSkeletons/ButtonLoading";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const [loginCompany, { loading }] = useMutation(LOGIN_COMPANY);

  const { handleAuthentication } = useAuthenticatedContext();

  const onSubmit = async (formData: FormData) => {
    try {
      // call the signupCompany method
      const { data } = await loginCompany({
        variables: {
          loginInfo: { ...formData },
        },
      });
      if (data) {
        // update the Authentication Context with the signed In user
        handleAuthentication(data.loginCompany);
        // Show a toast message of success
        toast.success("You logged in successfully!");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        // handle Apollo graphql error
        handleApolloErrors(error);
      } else {
        console.error("An error occurred", error);
      }
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <a href="index.html" className="">
                  <h3 className="text-primary">
                    <FaHome className="me-2" />
                    DASHMIN
                  </h3>
                </a>
                <h3>Sign In</h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.username && "is-invalid"
                      }`}
                      id="floatingInput"
                      placeholder="Username"
                      {...register("username")}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  {errors.username && (
                    <div className="invalid-feedback d-block">
                      {errors.username.message}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                      id="floatingPassword"
                      placeholder="Password"
                      {...register("password")}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-end mb-4">
                  <a href="#">Forgot Password</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                  disabled={loading}
                >
                  {loading ? <ButtonLoading /> : "Sign In"}
                </button>
              </form>
              <p className="text-center mb-0">
                Don't have an Account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
