// import '!style-loader!css-loader!node_modules/@mdi/font/css/materialdesignicons.min.css';

import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

setCompodocJson(docJson);


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
