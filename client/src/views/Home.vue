<template>
  <div id="home">
    <div id="head">
      <h1>{{ title[n] }}</h1>
    </div>
    <div id="instruction">
      <p>{{ text[n] }}</p>
    </div>
    <div id="changePage">
      <button @click="n--" :disabled="n <= 0" v-if="n != 0">Previous</button>
      <button
        @click="n++"
        :disabled="n >= text.length - 1"
        v-if="n != text.length - 1"
      >
        Next
      </button>
    </div>
    <div id="startGame">
      <router-link to="/round/1" v-if="n == text.length - 1"
        >Let's start the game =></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      n: 0,
      text: [
        'The game you will play today has a total of 8 rounds: 2 practice rounds (i.e. not being played for money), followed by 6 "for money" game rounds. On the following several screens, we will provide you with some basic information about the setup and user interface of this coalition game. Should you have any questions at any time before or during this experiment, please do not hesitate to ask the experimenter.',
        'You will play the part of one firm in this six-firm industry, as specified in the case that you just read. On the main game screen, you will see six boxes that correspond to the six firms, with the three upstream firm boxes appearing directly above the three downstream firm boxes.The firm you are playing will be labeled "Your Firm." The other firms will be labeled Firm A, B, or C (upstream), or Firm X, Y, or Z (downstream).' +
          "\n" +
          "The resource levels of each firm (Quantity and Technology upstream, Market Development and Efficiency downstream) will graphically appear in each firm box. In addition, the levels of each will appear numerically to the right of each firm box. The total valuation of each firm, as calculated according to the formula in the provided case, will appear above the resource levels to the immediate right of each box.",
        "If two or more firms have colored boxes (blue, red, etc.) around them at the start of a round, this indicates that these firms are already in a coalition. Firms in the same coalition are indicated by a box of the same color. For example if Firm A and Firm X are in a coalition already, this will be indicated by the presence of a red or blue box around each. There may be multiple existing coalitions present at the start of a game round. An existing coalition means that the two or more firms have already agreed to the terms of a proposed coalition.",
        'Your will be able to make coalition offers to other firms throughout this game. To make an offer, click on the "Propose Offer" box on the top righthand part of the game screen. Upon doing so, Step 1 is to decide which firm(s) you\'d like to propose a coalition offer to. Click on the appropriate check box(es) to select the firm(s). Step 2 is to allocate the projected revenue of this proposed coalition among the firms. Fill in the appropriate amounts in the boxes next to each firm. You will see a "Left to allocate" counter at the bottom of the screen to help you keep track of how much has been allocated and how much is left to allocate. Once you are satisfied with your proposal, Step 3 is to click the "Send Proposal" box on the righthand side of the screen. You can change your mind at any time prior to clicking "Send Proposal" by clicking "Cancel," or by amending Step 1 or Step 2 at any time prior to sending a proposal.\n' +
          "\n" +
          "Please note that you can make a total of 12 offers in each round of the game. The first proposal takes place in January, the next in February, and so on for up to one calendar year. If no agreement is reached at the end of 12 rounds, your firm will receive its standalone value (as indicated near its text box).",
        'After a coalition offer has been proposed, you will graphically see how each firm responds to your offer, as indicated by a "thumbs down" if they reject your proposal, or "thumbs up" if they accept your proposal. Should all firms accept your proposal, you can either ratify this coalition and end the game round, or propose other coalitions in the same manner as before. You can ratify a universally accepted coalition at any time and are free to search for better coalitions prior to the end of each game round.',
        "We appreciate your participation in this experiment! As a token of our appreciation, you will receive a $25 payment just for playing this game. In addition, the top 1/3 of all finishers, as computed by each participant's aggregate profit for the 6 game rounds, will receive an additional $25 prize!"
      ],
      title: [
        "WELCOME TO THE EXPERIMENT",
        "INDUSTRY SCENARIO",
        "COLORED BOXES AROUND FIRMS",
        "COALITION OFFERS TO OTHER FIRMS",
        "TENTATIVE COALITION ACCEPTANCE",
        "COMPENSATION",
        "COMPENSATION"
      ]
    };
  }
};
</script>

<style scoped>
#head {
  text-align: center;
}
#instruction {
  text-align: left;
  margin: 10px 150px;
}

#changePage {
  padding: 30px 100px 50px 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#changePage button {
  font-size: 20px;
  margin-right: 50px;
  color: #1a1a1a;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background-color: #ccc;
  border: none;
  outline: none;
}

#changePage button:hover {
  background-color: black;
  color: white;
}

#startGame {
  text-align: center;
  font-size: 20px;
}
</style>
