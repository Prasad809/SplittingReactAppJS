import * as Yup from "yup";
export const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
};

export const validation = Yup.object({
    fullName: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Full Name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be 10 digits")
        .required("Phone number is required"),

    password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
});

export const signInVals = {
    email: "",
    // phone: "",
    password: "",
};

export const signValidation = Yup.object({
     email: Yup.string()
    .required("Email or phone is required")
    .test("email-or-phone", "Invalid input", function (value) {
      if (!value) return false;

      const isAllNumbers = /^[0-9]+$/.test(value);
      const isPhone = /^[0-9]{10}$/.test(value);
      const hasAtSymbol = value.includes("@");
      const startsWithNumber = /^[0-9]/.test(value);

      if (isPhone) return true;

      if (startsWithNumber && !isAllNumbers) return false;

      if (hasAtSymbol && /\d/.test(value)) return false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) return true;

      return false;
    }),

    // phone: Yup.string()
    //     .matches(/^[0-9]{10}$/, "Must be 10 digits")
    //     .required("Phone number is required"),

    password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
});

