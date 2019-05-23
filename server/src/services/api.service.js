const fetchData = url => {
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong ...");
      })
      .then(data => {
        data.length = 7;
        mapedData = data
          .map((element, i) => {
            return [Date.parse(element.time_created.split("T")[0]), element.rate];
          })
          .reverse();
        return mapedData;
      });
  };