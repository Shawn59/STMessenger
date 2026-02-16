export class FetchServices {
  domain: 'https://api.coingecko.com/api/v3/';

  get = async (endPoint, params) => {
    try {
      const data = await fetch(`${this.domain}${endPoint}`);
      const response = await data.json();

      if (response.ok) {
        return response;
      } else {
        throw response;
      }
    } catch (e) {
      return e;
    }
  };
}
