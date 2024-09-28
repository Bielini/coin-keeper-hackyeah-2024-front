//example
export const searchCity = (name: string) =>{
    return fetch(`${baseUrl}/2.5/weather?q=${name}&appid=${API_KEY}`)
    .then(res => res.json()).then(data => {
      const coor = data.coord
      return coor
    })
      .catch((error) => {
        console.error(error);
    });
  }