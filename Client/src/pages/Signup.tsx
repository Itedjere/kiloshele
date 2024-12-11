import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router";
import { handleApolloErrors, registerSchema } from "../utitlities/utils";
import { ApolloError, useMutation } from "@apollo/client";
import { SIGNUP_COMPANY } from "../utitlities/graphql_mutation";
import ButtonLoading from "../components/company/LoadingSkeletons/ButtonLoading";
import { useAuthenticatedContext } from "../components/company/Contexts/AuthenticationContext";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  username: string;
  email?: string | undefined;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const [signupCompany, { loading }] = useMutation(SIGNUP_COMPANY);

  const { handleAuthentication } = useAuthenticatedContext();

  const onSubmit = async (formData: FormData) => {
    try {
      // call the signupCompany method
      const { data } = await signupCompany({
        variables: {
          signupInfo: { ...formData },
        },
      });
      if (data) {
        // update the Authentication Context with the signed In user
        handleAuthentication(data.signupCompany);
        // Show a toast message of success
        toast.success("You registered successfully!");
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
                <h3>Sign Up</h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.name && "is-invalid"}`}
                      id="floatingText"
                      placeholder="Company Name"
                      {...register("name")}
                    />
                    <label htmlFor="floatingText">Company Name</label>
                  </div>
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.username && "is-invalid"
                      }`}
                      id="floatingText"
                      placeholder="Username"
                      {...register("username")}
                    />
                    <label htmlFor="floatingText">Username</label>
                  </div>
                  {errors.username && (
                    <div className="invalid-feedback d-block">
                      {errors.username.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                      id="floatingInput"
                      placeholder="Email Address (optional)"
                      {...register("email")}
                    />
                    <label htmlFor="floatingInput">
                      Email address (optional)
                    </label>
                  </div>
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email.message}
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
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                  disabled={loading}
                >
                  {loading ? <ButtonLoading /> : "Sign Up"}
                </button>
              </form>
              <p className="text-center mb-0">
                Already have an Account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
