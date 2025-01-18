import { type Config } from "tailwindcss";

const config: Config =
  {
    content:
      [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
      ],
    theme:
      {
        colors:
          {
            "white": "#FFFFFF",
            "black": "#000000",
            "primary": "#091057",
            "secondary": "#024CAA",
            "tertiary": "#EC8305",
            "quaternary": "#DBD3D3"
          },
        fontFamily:
          {
            primary: ["Roboto", "sans-serif"],
            secondary: ["Poppins", "sans-serif"]
          },
        container:
          {
            center: true
          }
      },
    plugins: []
  };

export default config;
