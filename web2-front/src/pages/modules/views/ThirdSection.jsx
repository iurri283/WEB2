import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const image = {
  height: 100,
  my: 4,
};

function ProductHowItWorks() {
  const scrollToSection = () => {
    const section = document.getElementById("firstSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="thirdSection"
      component="section"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://www.example.com/path-to-curvy-lines-image.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>
          Sobre CEFET MONEY
        </h2>
        <Typography
          variant="h5"
          align="center"
          paragraph
          sx={{ marginBottom: 15 }}
        >
          CEFET MONEY é um banco de inovação, comprometido em transformar sua
          vida financeira com soluções modernas e eficientes. Conheça nossas
          principais vantagens:
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <img
                src="https://img.icons8.com/cotton/64/000000/money-transfer.png"
                alt="transfer"
                style={image}
              />
              <Typography variant="h5" align="center" gutterBottom>
                Transferências Instantâneas
              </Typography>
              <Typography variant="body" align="center">
                Realize transferências bancárias em tempo real, com total
                segurança e praticidade, em qualquer lugar do mundo.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <img
                src="https://img.icons8.com/cotton/64/000000/online-support.png"
                alt="online support"
                style={image}
              />
              <Typography variant="h5" align="center" gutterBottom>
                Consultoria Financeira Digital
              </Typography>
              <Typography variant="body" align="center">
                Acesse nossa plataforma de consultoria financeira digital e
                obtenha aconselhamento personalizado para suas finanças.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <img
                src="https://img.icons8.com/cotton/64/000000/bank-cards.png"
                alt="cards"
                style={image}
              />
              <Typography variant="h5" align="center" gutterBottom>
                Cartões de Crédito Personalizados
              </Typography>
              <Typography variant="body" align="center">
                Escolha entre uma variedade de cartões de crédito que oferecem
                benefícios exclusivos e recompensas para cada perfil.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          sx={{
            mt: 8,
            bgcolor: "#008C9E",
            "&:hover": {
              bgcolor: "#008C8F",
            },
          }}
          href="#"
        >
          Junte-se a nós
        </Button>
      </Container>
      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <ArrowCircleUpIcon
          alt="arrow up"
          sx={{
            fontSize: "64px",
            color: "#008C9E",
            cursor: "pointer",
          }}
          onClick={scrollToSection}
        />
      </Grid>
    </Box>
  );
}

export default ProductHowItWorks;
