import { Add, Check, Upload } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import Container from "@mui/material/Container";
import { DatePicker } from "@mui/x-date-pickers";
import { type NextPage } from "next";
import Head from "next/head";
import { DateTime } from "luxon";
import { useState } from "react";
import MuiPhoneNumber from "mui-phone-number";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import Image from "next/image";
import FormSubmitted from "~/components/FormSubmitted";
import AddNewStudent from "~/components/AddNewStudent";

type FillingForm = {
  type: "EnteringForm";
};

type FormSubmitted = {
  type: "FormSubmitted";
};

type AppState = FillingForm | FormSubmitted;

const MainPage = () => {
  const [state, setState] = useState<AppState>({
    type: "EnteringForm",
  });

  return (
    <>
      {state.type == "FormSubmitted" ? (
        <FormSubmitted
          onReturn={() =>
            setState({
              type: "EnteringForm",
            })
          }
        />
      ) : (
        <AddNewStudent onSubmit={() => setState({ type: "FormSubmitted" })} />
      )}
    </>
  );
};

const Home: NextPage = () => (
  <>
    <Head>
      <title>SE UTS - 2502005181 - Ahsan Imam Istamar</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex min-h-screen flex-col items-center justify-center">
      <MainPage></MainPage>
    </main>
  </>
);

export default Home;
