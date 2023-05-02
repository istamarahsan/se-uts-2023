import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import type {} from "@mui/x-date-pickers/themeAugmentation";
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
