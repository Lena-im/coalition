const apiUrl =
  location.protocol +
  "//" +
  location.hostname +
  ":8080" +
  process.env.BASE_URL +
  "api";

export default {
  fetchRounds() {
    const url = apiUrl + "/rounds";
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching rounds data: ", reason);
      });
  },
  fetchSelectedRound(roundId) {
    const url = apiUrl + "/rounds/" + roundId;
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching round data: ", reason);
      });
  },
  fetchSelectedRoundFirms(roundId) {
    const url = apiUrl + "/round/" + roundId + "/firms";
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching round firms data: ", reason);
      });
  },
  fetchPlayerIndex(roundId) {
    const url = apiUrl + "/round/" + roundId + "/player-index";
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .catch(reason => {
        console.log("Error fetching round player index data: ", reason);
      });
  }
};
