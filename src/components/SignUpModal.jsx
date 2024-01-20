import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import LogoMain from "../assets/images/LogoMain.png";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAuthorizationContext } from "../pages/Context/AuthorizationContext";
import { toast } from "react-hot-toast";

const P = styled.p`
  font-weight: 700;
  font-size: 25px;
  line-height: 28.75px;
`;

const ErrorText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 17.25px;
  color: #e10000;
  margin-bottom: 2px;
`;

const SignUpBtn = styled.button`
  background-color: #04aa6d;
  width: 389px;
  height: 45.15px;
  color: white;
  border-radius: 22.55px;
  margin-top: 10px;
  @media (max-width: 767px) {
    width: 330px;
  }
`;

const TextDiv = styled.div`
  & p {
    color: #acacac;
    font-weight: 400;
    font-size: 16.59px;
  }

  & button {
    color: #04aa6d;
    border: none;
    background: none;
    font-size: 16.59px;
  }
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const Input = styled.input`
  border: ${({ error }) => (error ? "1px solid #e10000" : "1px solid #ACACAC")};
`;

const Img = styled.img`
  margin-top: 20px;
  margin-bottom: 10px;
  justify-self: flex-start;
`;

const SignUpModal = ({
  setAuthorizationModal,
  authorizationModal,
  handleClick,
}) => {
  const info = {
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  };
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const API_KEY = "WsdKue2LFxsqmdimIkCyvBgbFLHbcQkk8DjiHohkRccDPRcNdg";
  const editValues = { ...info };
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });
  const { response, setTrigger } = useAuthorizationContext();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(errors);

  const onSubmit = async (data) => {
    const { ConfirmPassword, ...dataWithoutConfirmPassword } = data;

    try {
      const response = await fetch(
        "https://crudapi.co.uk/api/v1/Authorization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify([dataWithoutConfirmPassword]),
        }
      );

      if (response.ok) {
        setTrigger(true);
        toast.success(t("SuccessfulRegistration"));
        setAuthorizationModal("");
      } else {
        console.error("Failed to add card");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setAuthorizationModal("");
    }
  };

  useEffect(() => {
    if (authorizationModal === "signUp") {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "visible";
      };
    }
  }, [authorizationModal]);

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  rounded-lg overflow-hidden">
        <form
          className="w-[455px] h-[610px] bg-[white] flex flex-col justify-start items-center gap-5 rounded-lg max-[768px]:w-[365px] max-[768px]:mt-16"
          onSubmit={handleSubmit(onSubmit)}
          ref={modalRef}
        >
          <Img src={LogoMain} alt="" />
          <div className="flex flex-row gap-3 max-[768px]:flex-col">
            <Input
              className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[187px] h-[47px] p-2 max-[768px]:w-[330px]"
              type="text"
              placeholder={t("firstName")}
              disabled={loading}
              defaultValue={info?.Name}
              error={errors.Name}
              narrow={window.innerWidth > 769 ? true : undefined}
              {...register("Name", {
                required: t("fieldRequired"),
              })}
            />

            <Input
              className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[187px] h-[47px] p-2 max-[768px]:w-[330px]"
              type="text"
              placeholder={t("surname")}
              disabled={loading}
              defaultValue={info?.Surname}
              error={errors.Surname}
              narrow={window.innerWidth > 769 ? true : undefined}
              {...register("Surname", {
                required: t("fieldRequired"),
              })}
            />
          </div>
          <div>
            {errors.Email?.message && errors.Email.type !== "required" && (
              <ErrorText>{errors.Email?.message}</ErrorText>
            )}
            <Input
              style={{ position: "relative" }}
              className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[388px] h-[47px] p-2 max-[768px]:w-[330px]"
              type="text"
              placeholder={t("mail")}
              disabled={loading}
              defaultValue={info?.Email}
              error={errors.Email}
              {...register("Email", {
                required: t("fieldRequired"),
                minLength: {
                  value: 10,
                  message: t("minSymbolsRequired") + "10",
                },
                validate: (value) => {
                  const containsAtAndDot =
                    value.includes("@") && value.includes(".");
                  const isUsed = response.items?.find(
                    (user) => user.Email === value
                  );
                  if (!containsAtAndDot) {
                    return t("mailMissingSymbols");
                  }
                  if (isUsed) {
                    return t("mailAlreadyUsed");
                  }
                },
              })}
            />
          </div>
          <div>
            {errors.Password?.message &&
              errors.Password.type !== "required" && (
                <ErrorText>{errors.Password?.message}</ErrorText>
              )}
            <Input
              className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[388px] h-[47px] p-2 max-[768px]:w-[330px]"
              type="password"
              placeholder={t("password")}
              disabled={loading}
              defaultValue={info?.Password}
              error={errors.Password}
              {...register("Password", {
                required: t("fieldRequired"),
                minLength: {
                  value: 6,
                  message: t("minSymbolsRequired") + "6",
                },
              })}
            />
          </div>
          <div>
            {errors.ConfirmPassword?.message &&
              errors.ConfirmPassword.type !== "required" && (
                <ErrorText>{errors.ConfirmPassword?.message}</ErrorText>
              )}
            <Input
              className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[388px] h-[47px] p-2 max-[768px]:w-[330px]"
              type="password"
              placeholder={t("confirmPassword")}
              disabled={loading}
              defaultValue={info?.ConfirmPassword}
              error={errors.ConfirmPassword}
              {...register("ConfirmPassword", {
                required: t("fieldRequired"),
                validate: (value) => {
                  if (value !== getValues("Password"))
                    return t("incorrectConfirm");
                },
              })}
            />
          </div>

          <SignUpBtn>{t("signUp")}</SignUpBtn>
          <TextDiv>
            <p>
              {t("registeredText")}{" "}
              <span>
                <button onClick={() => handleClick("signIn")}>
                  {t("login")}
                </button>
              </span>
            </p>
          </TextDiv>
          <TextDiv>
            <p>
              <span className="ml-4">{t("agreement")}</span> <br />{" "}
              <span>
                <button>{t("terms")}</button>
              </span>{" "}
              <span>{t("and")}</span>{" "}
              <span>
                <button>{t("conditions")}</button>
              </span>
            </p>
          </TextDiv>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
