// import '!style-loader!css-loader!node_modules/@mdi/font/css/materialdesignicons.min.css';

import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

setCompodocJson(docJson);

import '!style-loader!css-loader!../node_modules/@angular/material/prebuilt-themes/indigo-pink.css';
import '!style-loader!css-loader!../node_modules/bootstrap/dist/css/bootstrap.css';
import '!style-loader!css-loader!../node_modules/@mdi/font/css/materialdesignicons.min.css';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
