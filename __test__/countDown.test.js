import { TripDuration } from "../src/client/js/countDown"

describe('Test the function TripDuration()' , () => {
// Unit Test to test a successful definition
  test('Test that the function is defined', async () => {
   /* beforeEach(() => {
      document = {
        ...document,
        addEventListener: () => { },
        removeEventListener: () => { }
      }
    })*/
    // test if the function is defined
      expect(TripDuration).toBeDefined();
  });
 
});
