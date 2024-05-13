import ReyaIcon from "../../assets/reya-logo.svg?react";
import CheckMark from "../../assets/icons/bluetick.svg?react";
import { MESSAGE } from "../../utils/AppConstants";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Password } from "primereact/password";
import "./SetPassword.css";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";

const SetPassword = () => {
  interface ISetPassword {
    newPassword: string;
    confirmPassword: string;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} as ISetPassword });

  const handleSetPassowrd = (data: ISetPassword) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300">
      <form onSubmit={handleSubmit((data) => handleSetPassowrd(data))}>
        <div className="rounded-lg bg-white w-[30rem] h-[25rem] p-6">
          <div className="flex flex-row justify-center w-full h-[3rem]">
            <ReyaIcon className="block" />
          </div>
          <div className="w-full flex flex-row">
            <CheckMark />
            <label className="color-success font-primary px-2">
              Email Verified
            </label>
          </div>
          <label className="input-label">{MESSAGE.PASSWORD_VERIFIED}</label>
          <div className="font-primary text-2xl py-3">Set Password</div>
          <div className="w-full relative">
            <label className="input-label">New Password*</label>
            <div className="h-[2.5rem]">
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  minLength: {
                    value: 8,
                    message: MESSAGE.PASSWORD_LENGTH_ERROR,
                  },
                  required: "New Password can't be empty",
                }}
                render={({ field }) => (
                  <Password
                    {...field}
                    inputClassName="reset-input"
                    className="w-full h-full"
                    toggleMask
                  />
                )}
              />
            </div>
            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword.message} />
            )}
          </div>
          <div className="w-full py-4 relative">
            <label className="input-label">Confirm Password*</label>
            <div className="card justify-center h-[2.5rem]">
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  minLength: {
                    value: 8,
                    message: MESSAGE.PASSWORD_LENGTH_ERROR,
                  },
                  required: " Confirm Password can't be empty",
                }}
                render={({ field }) => (
                  <Password
                    {...field}
                    inputClassName="reset-input"
                    className="w-full h-full"
                    toggleMask
                  />
                )}
              />
            </div>
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </div>
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              className="bg-purple-800 text-white px-4 py-1 rounded-full font-primary"
              label="Set Passowrd"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SetPassword;
