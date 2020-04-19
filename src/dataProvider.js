import simpleRestProvider from './simpleRestProvider';
import {fetchUtils} from 'react-admin';

const createHttpClient = (jwt) => {
  return (url, options = {}) => {
      if (!options.headers) {
          options.headers = new Headers({ Accept: 'application/json' });
      }
      // add your own headers here
      options.headers.set("X-Authorization", `Bearer ${jwt}`);
      return fetchUtils.fetchJson(url, options);
  }
}

const myDataProvider = (api, jwt) => {
    const dataProvider = simpleRestProvider(api, createHttpClient(jwt));

    return {
      ...dataProvider,
      update: (resource, params) => {
        console.log('params', params);
        console.log('params.data', params.data);

          if (!params.data.images) {
              // fallback to the default implementation
              return dataProvider.update(resource, params);
          }

          if (params.data.images.constructor !== Array) {
            params.data.images = [params.data.images];
          }

          console.log('params.data.images', params.data.images);

          /**
           * For posts update only, convert uploaded image in base 64 and attach it to
           * the `picture` sent property, with `src` and `title` attributes.
           */
          // Freshly dropped images are File objects and must be converted to base64 strings
          const newimages = params.data.images.filter(
              p => p.rawFile instanceof File
          );
          const formerimages = params.data.images.filter(
              p => !(p.rawFile instanceof File)
          );


          return Promise.all(newimages.map(convertFileToBase64))
              .then(base64images =>
                  base64images.map(picture64 => ({
                      src: picture64,
                      title: `${params.data.title}`,
                  }))
              )
              .then(transformedNewimages =>
                  dataProvider.update(resource, {
                      ...params,
                      data: {
                          ...params.data,
                          images: [
                              ...transformedNewimages,
                              ...formerimages,
                          ],
                      },
                  })
              );
      },
  }
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

export default myDataProvider;
