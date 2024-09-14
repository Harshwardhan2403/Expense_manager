import { useState } from "react";
import { Navbar, Text, useTheme } from "@nextui-org/react";
import styles from "./index.module.css";

const NavBar = (props) => {
  const [activeColor, setActiveColor] = useState("primary");
  const [variant, setVariant] = useState("default");
  const { isDark } = useTheme();

  const navbarStyles =  {
    background: "#16181A",
    color: "#9BA1A6",
  }

  const variants = [
    "default",
    "highlight",
    "highlight-solid",
    "underline",
    "highlight-rounded",
    "highlight-solid-rounded",
    "underline-rounded",
  ];

  return (
    <Navbar isBordered={isDark} hideIn="xs" variant="sticky" css={navbarStyles} className={styles.navbarContainer}>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          TrackME
        </Text>
      </Navbar.Brand>
      <Navbar.Content activeColor={activeColor} variant={variant}>
        <Navbar.Link isActive={props.page === 0 ? true : false} href="/">
          Home
        </Navbar.Link>
        <Navbar.Link isActive={props.page === 1 ? true : false} href="/transactions">Transaction</Navbar.Link>
        <Navbar.Link isActive={props.page === 2 ? true : false}href="/category">Categories</Navbar.Link>
      </Navbar.Content>
      {/* <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          + Add Transaction
        </Navbar.Link>
      </Navbar.Content> */}
    </Navbar>
  );
};

export default NavBar;