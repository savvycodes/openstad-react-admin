import simpleRestProvider from "./simpleRestProvider";
import { fetchUtils } from "react-admin";

const createHttpClient = (jwt, siteKey, csrf) => {
  return (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }

    // add JWT for authenticating with API
    if (jwt) {
      options.headers.set("X-Authorization", `Bearer ${jwt}`);
    } else if (siteKey) {
      options.headers.set("X-Authorization", `${siteKey}`);
    }

    if (csrf) {
      options.headers.set("X-XSRF-TOKEN", `${csrf}`);
    }

    return fetchUtils.fetchJson(url, options);
  };
};

const myDataProvider = (api, jwt, siteKey, csrf) => {
  const dataProvider = simpleRestProvider(
    api,
    createHttpClient(jwt, siteKey, csrf)
  );

  return {
    ...dataProvider,
  };
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.

 const convertFileToBase64 = file =>
 new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });
 */
export default myDataProvider;
