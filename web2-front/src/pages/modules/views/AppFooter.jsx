import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="/">
        CEFET MONEY
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  color: "black",
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  borderRadius: 1,
  boxShadow: 3,
  alignItems: "center",
  backgroundColor: "#008C9E",
  mr: 1,
  "&:hover": {
    bgcolor: "white",
  },
};

export default function AppFooter() {
  return (
    <Typography component="footer" sx={{ display: "flex", bgcolor: "#008C9E" }}>
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <FacebookOutlinedIcon fontSize="large" />
                </Box>
                <Box component="a" href="https://x.com/MUI_hq" sx={iconStyle}>
                  <InstagramIcon fontSize="large" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Typography href="/premium-themes/onepirate/terms/">
                  Terms
                </Typography>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Typography href="/premium-themes/onepirate/privacy/">
                  Privacy
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item>
            <Typography variant="caption" sx={{ textDecoration: "none" }}>
              {"Icons made by Freepik from www.flaticon.com CC 3.0 BY"}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
