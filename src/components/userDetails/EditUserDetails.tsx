import { Controller, useForm } from "react-hook-form";
import { IUser } from "../../interfaces/User";
import ReactDatePicker from "react-datepicker";
import { useEffect, useRef } from "react";
import { FaRegCalendarMinus } from "react-icons/fa";
import "./EditUserDetails.css";
import {
  countries,
  countryCodes,
  ethnicities,
  genders,
  raceList,
  states,
  zipCodes,
} from "../../assets/MockData";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import BackButton from "../backButton/BackButton";
import Button from "../Button";
import { Link } from "react-router-dom";
import { Button as PrimeButton } from "primereact/button";

const EditUserDetails = ({ user }: { user: IUser }) => {
  const datePickerRef = useRef<ReactDatePicker<never, undefined>>(null);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const handleFormSubmit = (data: IUser) => {
    console.log(data);
  };
  return (
    <div className="px-6 ">
      <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
        <div className="flex flex-row justify-between pb-6">
          <BackButton
            previousPage="Personal"
            currentPage="Edit Profile"
            backLink="/profile"
          />
          <div>
            <div className="flex py-2 justify-between items-center">
              <Link to="/">
                <Button
                  className="ml-3 font-primary text-purple-800"
                  variant="primary"
                  type="reset"
                  style="link"
                >
                  <i className="p" />
                  <i className="pi pi-times me-2"></i>Cancel
                </Button>
              </Link>
              <PrimeButton
                onClick={() => handleSubmit}
                className="ml-3 font-primary text-purple-800 border px-4 py-2 rounded-full border-purple-700 shadow-none"
                outlined
                type="submit"
              >
                <i className="pi pi-check me-2"></i>Save
              </PrimeButton>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 px-6 rounded-xl">
          <div className="font-primary text-xl">Basic Details</div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <div className="pt-4 relative">
              <label className="block input-label" htmlFor="firstName">
                First Name*
              </label>
              <input
                {...register("firstName", {
                  required: "First name can not be empty.",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Name must contain letters, spaces, or hyphens only",
                  },
                })}
                name={`firstName`}
                onChange={(event) =>
                  setValue("firstName", event?.target?.value || "")
                }
                className="cimpar-input focus:outline-none"
                type="text"
                id="firstName"
                placeholder="First name"
              />
            </div>
            <div className="pt-4">
              <label className="block input-label" htmlFor="middleName">
                Middle Name
              </label>
              <input
                {...register("middleName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Name must contain letters, spaces, or hyphens only",
                  },
                })}
                name={`middleName`}
                onChange={(event) =>
                  setValue("middleName", event?.target?.value || "")
                }
                className="cimpar-input focus:outline-none"
                type="text"
                id="middleName"
                placeholder="Middle Name"
              />
            </div>
            <div className="pt-4">
              <label className="block input-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should only contain letters",
                  },
                })}
                name={`lastName`}
                onChange={(event) =>
                  setValue("lastName", event?.target?.value || "")
                }
                className="cimpar-input focus:outline-none"
                type="text"
                id="lastName"
                placeholder="Last name"
              />
            </div>
            <div className="pt-4">
              <label className="block input-label" htmlFor="gender">
                Gender*
              </label>
              <Controller
                name="gender"
                control={control}
                defaultValue={user.gender}
                rules={{
                  required: "Date of appointment is required",
                }}
                render={({ field }) => (
                  <Dropdown
                    inputId="gender"
                    {...field}
                    onChange={(e) => setValue("gender", e.target.value)}
                    options={genders}
                    optionLabel="name"
                    placeholder="Select a City"
                    className="dropdown w-full md:w-14rem border border-gray-300 !py-[0.4rem]"
                  />
                )}
              />
            </div>
            <div className="pt-4 d-flex relative">
              <label htmlFor="dob" className="block input-label">
                Date of Birth*
              </label>
              <div className="absolute left-0 right-0">
                <Controller
                  name="dob"
                  control={control}
                  defaultValue={user.dob}
                  rules={{
                    required: "Date of appointment is required",
                  }}
                  render={({ field }) => (
                    <ReactDatePicker
                      placeholderText="Select date of birth"
                      required={true}
                      ref={datePickerRef}
                      wrapperClassName="w-full"
                      calendarIconClassname="right-0 mt-2"
                      id="dob"
                      dateFormat={"dd MMMM, yyyy"}
                      onChange={(date) => setValue("dob", date)}
                      selected={new Date(field.value)}
                      className="h-[2.5rem] ps-2 border border-gray-300 px-1 block w-[100%] mt-1 md:text-sm rounded-md right-0 left-0 focus:outline-none"
                    />
                  )}
                />
                <span
                  className="absolute top-[1rem] right-[1rem]"
                  onClick={() => datePickerRef?.current?.setOpen(true)}
                >
                  <FaRegCalendarMinus />
                </span>
              </div>
            </div>
            <div className="pt-4 relative">
              <label htmlFor="height" className="block input-label pb-1">
                Height*
              </label>
              <div className="p-inputgroup flex-1 border h-[2.5rem] rounded-lg border-gray-300">
                <span className="relative !w-[50%] border-r relative border-gray-300">
                  <Controller
                    name="height.feet"
                    control={control}
                    defaultValue={user.height.feet}
                    rules={{
                      required: "Height is required",
                      min: {
                        value: 1,
                        message: "Height must be greater than 0",
                      },
                      max: {
                        value: 10,
                        message: "Height can not exceed 10",
                      },
                    }}
                    render={({ field }) => (
                      <InputNumber
                        onChange={(event: any) =>
                          event.value && setValue("height.feet", event.value)
                        }
                        placeholder="Feet"
                        value={field.value}
                        className="w-full h-full"
                      />
                    )}
                  />
                  <span className="absolute top-[.5rem] right-5">ft</span>
                </span>
                <span className="p-inputgroup-addon w-[50%] relative">
                  <Controller
                    name="height.inches"
                    control={control}
                    defaultValue={user.height.inches}
                    rules={{
                      min: {
                        value: 0,
                        message: "Height must be greater than or equal to 0",
                      },
                      max: {
                        value: 11,
                        message: "Height must be less than or equal to 100",
                      },
                    }}
                    render={({ field }) => (
                      <InputNumber
                        onChange={(e) => {
                          e.value && setValue("height.inches", e.value);
                        }}
                        value={field.value}
                        placeholder="inches"
                      />
                    )}
                  />
                  <span className="absolute top-[.5rem] text-black right-5">
                    in
                  </span>
                </span>
              </div>
            </div>
            <div className="pt-4  relative">
              <label className="block input-label pb-1" htmlFor="weight">
                Weight*
              </label>
              <input
                {...register("weight")}
                name={`weight`}
                onChange={(event) =>
                  setValue("weight", Number(event?.target?.value) || 0)
                }
                className="cimpar-input focus:outline-none"
                type="number"
                id="weight"
                placeholder="weight"
              />
              <span className="absolute right-2 top-[3rem] z-100">Lbs</span>
            </div>
            <div className="pt-4">
              <label className="block input-label pb-1" htmlFor="race">
                Race*
              </label>
              <Controller
                name="race"
                control={control}
                defaultValue={user.race}
                rules={{
                  required: "Race is required",
                }}
                render={({ field }) => (
                  <Dropdown
                    id="race"
                    value={field.value}
                    onChange={(e: any) => e.value && setValue("race", e.value)}
                    options={raceList}
                    optionLabel="name"
                    placeholder="Select"
                    className="border p-0 w-full border-border-gray-300 text-xs px-0 shadow-none"
                  />
                )}
              />
            </div>
            <div className="pt-4  relative">
              <label className="block input-label pb-1" htmlFor="ethnicity">
                Ethnicity*
              </label>
              {/* <input
                {...register("ethnicity")}
                name={`ethnicity`}
                onChange={(event) =>
                  setValue("ethnicity", event?.target?.value)
                }
                className="cimpar-input focus:outline-none"
                type="text"
                id="ethnicity"
                placeholder="Ethnicity"
              /> */}
              <Controller
                name="ethnicity"
                control={control}
                defaultValue={user.ethnicity}
                rules={{
                  required: "Ethnicity is required",
                }}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    value={field.value}
                    options={ethnicities}
                    placeholder="Select"
                    className="border p-0 w-full border-border-gray-300 text-xs px-0 shadow-none"
                  />
                )}
              />
            </div>
          </div>
          <div className="py-6 font-primary text-xl">Contact Details</div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 pb-[5rem]">
            <div className="pt-4">
              <label className="block input-label pb-1" htmlFor="phoneNumber">
                Phone Number*
              </label>
              <div className="p-inputgroup buttonGroup  flex-1 w-full">
                <span className="country-code w-[40%] p-inputgroup-addon">
                  <Controller
                    name="countryCode"
                    control={control}
                    defaultValue={{ name: "+55-BR", value: "+55-BR" }}
                    rules={{
                      required: "Country code is required",
                    }}
                    render={({ field }) => (
                      <Dropdown
                        {...field}
                        options={countryCodes}
                        optionLabel="name"
                        placeholder="Select"
                        className="border p-0 w-full border-border-gray-300 text-xs px-0 shadow-none !border-r-0"
                      />
                    )}
                  />
                </span>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue={user.phoneNumber}
                  rules={{
                    required: "Phone number is required",
                  }}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      onChange={(e) =>
                        e.value && setValue("phoneNumber", e.value)
                      }
                      placeholder="Phone Number"
                      useGrouping={false}
                      className="border border-gray-300 w-[60%]"
                    />
                  )}
                />
              </div>
            </div>
            <div className="pt-4">
              <label
                className="block input-label pb-1"
                htmlFor="alternateNumberCode"
              >
                Alternate Number*
              </label>
              <div className="p-inputgroup buttonGroup  flex-1 w-full">
                <span className="country-code w-[40%] p-inputgroup-addon">
                  <Controller
                    name="alternateNumberCode"
                    control={control}
                    defaultValue={user.alternateNumberCode}
                    rules={{
                      required: "Country code is required",
                    }}
                    render={({ field }) => (
                      <Dropdown
                        {...field}
                        onChange={(e: any) =>
                          e.value && setValue("alternateNumberCode", e.value)
                        }
                        options={countryCodes}
                        optionLabel="name"
                        placeholder="Select"
                        className="border p-0 w-full border-border-gray-300 text-xs px-0 shadow-none !border-r-0"
                      />
                    )}
                  />
                </span>
                <Controller
                  name="alternativeNumber"
                  control={control}
                  defaultValue={user.alternativeNumber}
                  rules={{
                    required: "Phone number is required",
                  }}
                  render={({ field }) => (
                    <InputNumber
                      value={Number(field.value)}
                      onChange={(e) =>
                        e.value && setValue("alternativeNumber", e.value)
                      }
                      placeholder="Phone Number"
                      useGrouping={false}
                      className="border border-gray-300 w-[60%]"
                    />
                  )}
                />
              </div>
            </div>

            <div className="pt-4">
              <label className="block input-label pb-1" htmlFor="city">
                City*
              </label>
              <input
                {...register("city", {
                  required: "City can not be empty.",
                })}
                name={`city`}
                onChange={(event) => setValue("city", event?.target?.value)}
                className="cimpar-input focus:outline-none"
                type="text"
                id="city"
                placeholder="City"
              />
            </div>
            <div className="pt-4">
              <label className="block input-label pb-1" htmlFor="zipCode">
                Zip code*
              </label>
              <Controller
                name="zipCode"
                control={control}
                defaultValue={user.zipCode}
                rules={{
                  required: "ZipCode can not be empty",
                }}
                render={({ field }) => (
                  <Dropdown
                    onChange={(e) => setValue("zipCode", e.target.value)}
                    options={zipCodes}
                    placeholder="Select a ZipCode"
                    optionLabel="name"
                    className="dropdown w-full md:w-14rem border border-gray-300 !py-[0.4rem]"
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="pt-4 col-span-2">
              <label className="block input-label pb-1" htmlFor="fullAddress">
                Full Address*
              </label>
              <input
                {...register("fullAddress", {
                  required: "Address can not be empty.",
                })}
                name={`fullAddress`}
                onChange={(event) =>
                  setValue("fullAddress", event?.target?.value)
                }
                className="cimpar-input focus:outline-none"
                type="text"
                id="fullAddress"
                placeholder="Full address"
              />
            </div>
            <div className="pt-4">
              <label className="block input-label pb-1" htmlFor="state">
                State*
              </label>
              <Controller
                name="state"
                control={control}
                defaultValue={user.state}
                rules={{
                  required: "State can not be empty",
                }}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    onChange={(e) => setValue("state", e.target.value)}
                    options={states}
                    optionLabel="value"
                    placeholder="Select a State"
                    className="dropdown w-full md:w-14rem border border-gray-300 !py-[0.4rem]"
                  />
                )}
              />
            </div>
            <div className="pt-4">
              <label className="block input-label pb-1" htmlFor="country">
                Country*
              </label>
              <Controller
                name="country"
                control={control}
                defaultValue={user.country}
                rules={{
                  required: "Country can not be empty",
                }}
                render={({ field }) => (
                  <Dropdown
                    onChange={(e) => setValue("country", e.target.value)}
                    options={countries}
                    optionLabel="name"
                    placeholder="Select a Country"
                    className="dropdown w-full md:w-14rem border border-gray-300 !py-[0.4rem]"
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditUserDetails;
