import { checkForUrl } from "../src/client/js/UrlChecker"

describe('Test the function checkForUrl()' , () => {
  let url = "https://www.wikipedia.org/";
  let falseUrl="www";
  // Unit Test to test a Valid URL
  test('Test Valid url should return true', async () => {
      const response = checkForUrl(url);
      expect(response).toBeDefined();
      expect(response).toBe(true);
  });
  // Unit Test to test a Invalid URL
  test('Test Invalid url should return false', async () => {
    const response2 = checkForUrl(falseUrl);
    expect(response2).toBe(false);
  });
});
