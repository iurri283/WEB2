import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.black,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "100vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

function FirstSectionLayout(props) {
  const { children } = props;

  const scrollToSection = () => {
    const section = document.getElementById("betterConditions");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ProductHeroLayoutRoot id="firstSection">
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <ArrowCircleDownIcon
          alt="arrow down"
          large
          sx={{
            position: "absolute",
            bottom: 80,
            fontSize: "64px",
            color: "#008C9E",
            "&": {
              cursor: "pointer",
            },
          }}
          onClick={scrollToSection}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}

FirstSectionLayout.propTypes = {
  children: PropTypes.node,
};

export default FirstSectionLayout;
