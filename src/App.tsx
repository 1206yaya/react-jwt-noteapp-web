import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./components/AuthFormPage";
import axios from "axios";
import { CsrfToken } from "./types";
import { NoteListPage } from "./components/NoteListPage";

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true;
    const setCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.NOTE_APP_API_URL}/csrf`
      );
      axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token;
    };
    setCsrfToken();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/note" element={<NoteListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
