import { Upload } from "@mui/icons-material";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Fab,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import MuiPhoneNumber from "mui-phone-number";
import Image from "next/image";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: DateTime | undefined;
  placeOfBirth: string;
  phoneNumber: string;
  profileImageFilePath: string | undefined;
};

const isValidFirstName = (str: string) => str.length <= 50;
const isValidLastName = (str: string) => str.length <= 50;
const isValidEmail = (str: string) =>
  str.length <= 50 &&
  str.includes("@") &&
  !str.startsWith("@") &&
  !str.endsWith("@");
const isPhoneNumberValidLength = (str: string) => str.length < 13;

const isFormValid = (data: FormData) =>
  isValidFirstName(data.firstName) &&
  data.firstName.length > 0 &&
  isValidLastName(data.lastName) &&
  data.lastName.length > 0 &&
  isValidEmail(data.emailAddress) &&
  data.emailAddress.length > 0 &&
  data.dateOfBirth != undefined &&
  data.placeOfBirth.length > 0 &&
  isPhoneNumberValidLength(data.phoneNumber) &&
  data.phoneNumber.length > 0 &&
  data.profileImageFilePath != undefined;

const formInitialData: FormData = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  dateOfBirth: undefined,
  placeOfBirth: "",
  phoneNumber: "",
  profileImageFilePath: undefined,
};

export type AddNewStudentProps = {
  onSubmit: () => void;
};

const AddNewStudent = ({ onSubmit }: AddNewStudentProps) => {
  const [data, setData] = useState(formInitialData);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Add New Student
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!isValidFirstName(data.firstName)}
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
                value={data.firstName}
                onChange={(event) => {
                  setData({
                    ...data,
                    firstName: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!isValidLastName(data.lastName)}
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={(event) => {
                  setData({
                    ...data,
                    lastName: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  !isValidEmail(data.emailAddress) && data.emailAddress != ""
                }
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={data.emailAddress}
                onChange={(event) => {
                  setData({
                    ...data,
                    emailAddress: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Date of Birth*"
                onChange={(newValue, _) => {
                  if (newValue instanceof DateTime) {
                    setData({
                      ...data,
                      dateOfBirth: newValue,
                    });
                  }
                  return;
                }}
                disableFuture
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Place of Birth"
                name="placeOfBirth"
                onChange={(event) => {
                  setData({
                    ...data,
                    placeOfBirth: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPhoneNumber
                error={!isPhoneNumberValidLength(data.phoneNumber)}
                label="Phone Number"
                defaultCountry="id"
                onlyCountries={["id"]}
                variant="outlined"
                onChange={(event) => {
                  if (typeof event.toString() == "string") {
                    setData({
                      ...data,
                      phoneNumber: event.toString(),
                    });
                  }
                }}
                required
                helperText={
                  isPhoneNumberValidLength(data.phoneNumber)
                    ? ""
                    : "12 digits maximum"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <div className="flex flex-col gap-3">
                <label className="">Student Photo</label>
                <div
                  className={`relative grid aspect-[4/5] w-full place-items-center border-4 border-slate-100 border-opacity-100 p-4 ${
                    data.profileImageFilePath == undefined ? "bg-slate-50" : ""
                  }`}
                >
                  {data.profileImageFilePath != undefined ? (
                    <Image
                      width={472}
                      height={591}
                      alt="student photo preview"
                      src={data.profileImageFilePath ?? ""}
                    />
                  ) : (
                    <></>
                  )}

                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        setData({
                          ...data,
                          profileImageFilePath: URL.createObjectURL(
                            event.target.files[0]
                          ),
                        });
                      }
                    }}
                  />
                  <label className="absolute" htmlFor="contained-button-file">
                    <Fab component="span">
                      <Upload color="primary" fontSize="large" />
                    </Fab>
                  </label>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="py-5">
            <Button
              disabled={!isFormValid(data)}
              fullWidth
              variant="outlined"
              size="large"
              onClick={onSubmit}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default AddNewStudent;
