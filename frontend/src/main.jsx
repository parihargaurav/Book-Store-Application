import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarContent } from "notistack";
import "react-toastify/ReactToastify.css";
import "./index.css";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarContent>
      <App />
    </SnackbarContent>
  </BrowserRouter>
);
