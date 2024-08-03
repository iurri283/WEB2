import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../componentsCefetMoney/Typography";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function SecondSection() {
  const scrollToSection = () => {
    const section = document.getElementById("thirdSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="betterConditions"
      component="section"
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        bgcolor: "#008C9E",
        color: "#fff",
        py: 8,
      }}
    >
      <Container
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <h2
          style={{ fontSize: "40px", textAlign: "center", marginBottom: 150 }}
        >
          Melhores Condições
        </h2>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://img.icons8.com/cotton/64/000000/money-box.png"
                alt="savings"
                sx={{ height: 100 }}
              />
              <Typography
                variant="h4"
                sx={{ my: 5, fontWeight: "bold", textAlign: "center" }}
              >
                Poupança e Investimentos
              </Typography>
              <Typography variant="h6" align="center">
                {
                  "Proteja seu futuro com nossas opções de poupança e investimentos. Rentabilidade garantida para seu dinheiro crescer."
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://img.icons8.com/cotton/64/000000/bank-building.png"
                alt="loan"
                sx={{ height: 100 }}
              />
              <Typography
                variant="h4"
                sx={{ my: 5, fontWeight: "bold", textAlign: "center" }}
              >
                Empréstimos Facilitados
              </Typography>
              <Typography variant="h6" align="center">
                {
                  "Aproveite nossas condições especiais para obter o empréstimo que você precisa, com juros baixos e prazos flexíveis."
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <br></br>
            <Box sx={item}>
              <Box
                component="img"
                src="https://img.icons8.com/cotton/64/000000/customer-support.png"
                alt="support"
                sx={{ height: 100 }}
              />
              <Typography
                variant="h4"
                sx={{ my: 5, fontWeight: "bold", textAlign: "center" }}
              >
                Atendimento 24/7
              </Typography>
              <Typography variant="h6" align="center">
                {
                  "Nosso suporte está disponível 24 horas por dia, 7 dias por semana, para ajudá-lo com qualquer dúvida ou problema."
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid sx={{ textAlign: "center", marginTop: 25 }}>
          <ArrowCircleDownIcon
            alt="arrow down"
            large
            sx={{
              bottom: 32,
              fontSize: "64px",
              color: "white",
              "&": {
                cursor: "pointer",
              },
            }}
            onClick={scrollToSection}
          />
        </Grid>
      </Container>
    </Box>
  );
}

export default SecondSection;
