import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Select,
  Grid,
  InputLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { addToTable } from "../redux/registration/action";

interface FormData {
  fullName: string;
  age: string;
  sex: string;
  phone: string;
  idType: string;
  id: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

const sexOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const idOptions = [
  { label: "Pan", value: "pan" },
  { label: "Aadhar", value: "aadhar" },
];

const Form: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const formik = useFormik<FormData>({
    initialValues: {
      fullName: "",
      age: "",
      sex: "",
      phone: "",
      idType: "",
      id: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: activeStep === 0
      ? yup.object().shape({
        fullName: yup
          .string()
          .required("Name is required")
          .min(3, "Name must be at least 3 characters"),
        age: yup
          .number()
          .required("The number is required!")
          .positive("The number must be greater than 0"),
        sex: yup.string().required("Sex is required"),
        phone: yup
          .string()
          .matches(/^\d{10}$/, "Contact Number should be exactly 10 digits"),
        idType: yup.string(),
        id: yup.string().when("idType", {
          is: (val: string) => val === "aadhar",
          then: (yup) => yup.matches(
            /^[2-9]\d{11}$/,
            "Aadhar number should be 12 digits and should not start with 0 and 1."
          ),
          otherwise: (yup) => yup.matches(
            /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/,
            "Pan number should be 10 alphanumeric characters like ABCDE1234F"
          ),
        }),
      })
      : yup.object().shape({
        address: yup.string(),
        state: yup.string(),
        city: yup.string(),
        country: yup.string(),
        pincode: yup
          .string()
          .matches(/^\d{6}$/, "Pincode should be exactly 6 digits"),
      }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      if (activeStep === steps.length - 1) {
        dispatch(addToTable(values));
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    },
  });

  const onCountryInputChange = async (inputValue: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${inputValue}`
      );
      const countries = response.data.map((country: any) => ({
        label: country.name.common,
        value: country.name.common,
      }));
      setOptions(countries);
      setApiError(null);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setApiError("Error fetching countries");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (field: any) => (
    <>
      <TextField
        {...field}
        variant="outlined"
        margin="normal"
        size="small"
        fullWidth
        error={!!formik.errors[field.name]}
        helperText={formik.errors[field.name] || ""}
      />
    </>
  );

  const steps = ["Personal Details", "Address Details"];

  const handleStep = (step: number) => {
    switch (step) {
        case 0:
          return (
            <>
              <Box p={2}>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    mb: 2,
                    "@media (max-width: 600px)": {
                      fontSize: "24px",
                    },
                  }}
                  variant="h2"
                >
                  Personal Details
                </Typography>
                <Grid container spacing={2} mt={2}>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                     Full Name
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("fullName")}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      placeholder="Enter the Name"
                      error={!!formik.errors.fullName && formik.touched.fullName}
                      helperText={ formik.touched.fullName && formik.errors.fullName}
                    />
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      Age
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("age")}
                      variant="outlined"
                      margin="normal"
                      placeholder="Enter the Age"
                      fullWidth
                      size="small"
                      error={!!formik.errors.age && formik.touched.age}
                      helperText={ formik.touched.age && formik.errors.age}
                    />
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: 0, fontWeight: "bold" }}>
                      Sex
                    </InputLabel>
                    <Select
                      labelId="sex-label"
                      id="sex"
                      fullWidth
                      {...formik.getFieldProps("sex")}
                      sx={{ fontSize: "14px", width: "100%", height: "40px" }}
                    >
                      {sexOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    
  
                      
                    </Select>
                    {
                      formik.errors?.sex  && formik.touched?.sex  && (
                        <Typography variant="caption" color="red">
                        {formik.errors?.sex}
                        </Typography>
                      )
                    }
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      Phone Number
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("phone")}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      placeholder="Enter Phone Number"
                      fullWidth
                      error={!!formik.errors.phone}
                      helperText={formik.errors.phone || ""}
                    />
                  </Grid>
                  <Grid item sm={6} md={6}>
                    <InputLabel sx={{ marginBottom: 0, fontWeight: "bold" }}>
                      Government ID
                    </InputLabel>
                    <Box sx={{ display: "flex" }}>
                      <Box width="20%" mr={2}>
                        <Select
                          labelId="idType-label"
                          id="idType"
                          fullWidth
                          {...formik.getFieldProps("idType")}
                          sx={{
                            fontSize: "14px",
                            width: "100%",
                            height: "40px",
                          }}
                        >
                          {idOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box width="50%" mt={-2}>
                        <TextField
                          {...formik.getFieldProps("id")}
                          variant="outlined"
                          margin="normal"
                          size="small"
                          placeholder="Enter Government Id"
                          fullWidth
                          error={!!formik.errors.id && formik.touched.id}
                          helperText={ formik.touched.id && formik.errors.id}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          );
        case 1:
          return (
            <>
              <Box p={2}>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    mb: 2,
                    "@media (max-width: 600px)": {
                      fontSize: "24px",
                    },
                  }}
                  variant="h2"
                >
                  Address Details
                </Typography>
                <Grid container spacing={2}>
                 
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      Address
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("address")}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      placeholder="Enter the Address"
                      fullWidth
                      error={!!formik.errors.address}
                      helperText={formik.errors.address || ""}
                    />
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      State
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("state")}
                      variant="outlined"
                      placeholder="Enter State"
                      margin="normal"
                      size="small"
                      fullWidth
                      value={formik.values.state || ""}
                      error={!!formik.errors.state}
                      helperText={formik.errors.state || ""}
                    />
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      City
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("city")}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      placeholder="Enter the city/town/village"
                      fullWidth
                      error={!!formik.errors.city}
                      helperText={formik.errors.city || ""}
                    />
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      Country
                    </InputLabel>
                    <Autocomplete
                      {...formik.getFieldProps("country")}
                      options={options}
                      loading={loading}
                      value={options.find((val) => val.value === formik.values.country)}
                      onInputChange={(_event, newInputValue) => onCountryInputChange(newInputValue)}
                      onChange={(_event, newValue) => {
                        formik.setFieldValue("country", newValue?.value);
                      }
                      }
                      renderInput={renderInput}
                      renderOption={(props, option) => (
                        <MenuItem {...props} key={option.value}>
                          {option.label}
                        </MenuItem>
                      )}
                    />
                  </Grid>
                  <Grid item sm={4} md={4}>
                    <InputLabel sx={{ marginBottom: -2, fontWeight: "bold" }}>
                      Pincode
                    </InputLabel>
                    <TextField
                      {...formik.getFieldProps("pincode")}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      fullWidth
                      error={!!formik.errors.pincode}
                      helperText={formik.errors.pincode || ""}
                    />
                  </Grid>
                </Grid>
              </Box>
            </>
          );
        default:
          return null;
      }
  };

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ mb: 2, ml: 3 }}>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              textDecoration: "underline",
              mb: 2,
              "@media (max-width: 600px)": {
                fontSize: "24px",
              },
            }}
            variant="h1"
          >
            Onito Registration Form
          </Typography>
        </Box>
        <Box sx={{ width: "50%", float: "right" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        {handleStep(activeStep)}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "#fff" }}
            onClick={() => console.log(formik.errors)}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
