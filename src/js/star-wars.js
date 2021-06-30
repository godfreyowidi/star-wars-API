export default class StarWars {  
  static async get() {
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=1`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}