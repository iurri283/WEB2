import { Link } from "react-router-dom";
import Button from "../components/Button";
import Typography from "../components/Typography";
import FirstSectionLayout from "./FirstSectionLayout";

export default function FirstSection() {
  return (
    <FirstSectionLayout
      sxBackground={{
        backgroundColor: "#008C9E", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}

      <Typography color="inherit" align="center" variant="h2">
        CEFET MONEY
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Aproveita as MELHORES oportunidades do MELHOR banco digital!
      </Typography>
      <Link to="/cadastro">
        <Button
          variant="contained"
          size="large"
          component="a"
          sx={{ minWidth: 200, bgcolor: "#008C9E" }}
        >
          Cadastrar
        </Button>
      </Link>
    </FirstSectionLayout>
  );
}
