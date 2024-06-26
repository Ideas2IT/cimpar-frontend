import { InputText } from "primereact/inputtext";
import ReyaIcon from "../../assets/reya-logo.svg?react";
import { MESSAGE, PATH_NAME, PATTERN } from "../../utils/AppConstants";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Button } from "primereact/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forgotPassword.css";
import { IForgotPassword } from "../../interfaces/UserLogin";

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: {} as IForgotPassword });

  const handleFormSubmit = (data: IForgotPassword) => {
    setIsSubmitted(true);
    console.log(data);
  };

  const email = watch("email");

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
        <div className="header-wrapper relative">
          <div className="logo">
            <ReyaIcon className="block" />
          </div>
          {!isSubmitted ? (
            <>
              <label className="font-primary text-2xl py-2">
                Forgot Password
              </label>
              <label className="input-label py-2 block">
                {MESSAGE.PASSOWRD_RESET}
              </label>
              <div className="col-span-2 w-full my-3">
                <label className="input-label" htmlFor="email">Email*</label>
                <div className="relative h-[2.5rem] my-1">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      pattern: PATTERN.EMAIL,
                      required: true,
                    }}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        id="email"
                        keyfilter="email"
                        className="signup-input"
                        placeholder="Enter Email"
                      />
                    )}
                  />
                  <span className="absolute right-2 top-[0.7rem] pi pi-envelope" />
                  {errors.email && <ErrorMessage message="Invalid Email Id" />}
                </div>
              </div>
            </>
          ) : (
            <>
              <label className="font-primary text-2xl py-2 block">
                Check your email
              </label>
              <label className="input-label">
                We have sent you an email at
                <span className="text-lg font-primary px-1"> {email}</span>
                Check your inbox and follow the instructions to reset your
                account password.
              </label>
            </>
          )}

          <div className="flex absolute bottom-[1rem] left-[1rem] right-[1rem] items-end h-[10rem] justify-end pb-3">
            {!isSubmitted ? (
              <>
                <Button
                  onClick={() => {
                    navigate(PATH_NAME.HOME);
                  }}
                  type="button"
                  className="button font-primary"
                  label="Cancel"
                />
                <Button
                  disabled={false}
                  type="submit"
                  className="link-button font-primary"
                  label="Request a reset link"
                />
              </>
            ) : (
              <div className="button-wrapper font-primary">
                <Link to={PATH_NAME.HOME}>
                  <Button label="Back to Login" />
                </Link>
                <Button
                  onClick={() => {
                    window.open("https://mail.google.com/", "_blank");
                    navigate(PATH_NAME.HOME);
                  }}
                  type="button"
                  className="button font-primary"
                  label="Got it"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
