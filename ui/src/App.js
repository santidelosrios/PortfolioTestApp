import logo from "./logo.svg";
import React from 'react'

import Avatar from "./components/avatar/avatar";
import Timeline from "./components/timeline/timeline";
import Experience from "./components/experience/experience";

import { getUserPortfolio } from './services/portfolio/portfolio'

import "./App.css";

const tweets = [
  {
    avatar: "",
    title: "D. Schrutle",
    text: "The way we look at technical debt is Wrong!",
  },
  {
    avatar: "",
    title: "Title 2",
    text: "I can't believe that something is wrong",
  },
  {
    avatar: "",
    title: "D. Schrutle wr21",
    text: "The way we look at technical debt is Wrong!",
  },
];

const experience =
  "Jon Snow is the bastard son of Eddard Stark, Lord of Winterfell.[8] He has five half-siblings: Robb, Sansa, Arya, Bran, and Rickon Stark. Unaware of the identity of his mother,[9] Jon was raised at Winterfell. At the age of fourteen, he joins the Nights Watch, where he earns the nickname Lord Snow. Jon is one of the major POV characters in A Song of Ice and Fire. In the television adaptation Game of Thrones, Jon is portrayed by Kit Harington. Jon has more Stark-like features than any of his half-brothers.[9] He is graceful and quick, and has a lean build.[10] Jon has the long face of the Starks,[11][12] with dark,[10][12] brown hair[13][14] and grey eyes[12] so dark they almost seem black.[10] Jon resembles his father, Lord Eddard Stark.[9][15] Because he looks so much like a Stark, Tyrion Lannister notes that whoever Jons mother was, she left little of herself in her sons appearance.[11] Out of all the Stark children, Arya Stark is said to resemble Jon the most, as Robb, Sansa, Bran and Rickon take after their Tully mother, Catelyn.[16]";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      avatarUrl: '',
      firstName: '',
      lastName: '',
      title: '',
      tweets: [],
    }
  }

  async componentDidMount() {
    const userPortfolio = await getUserPortfolio('1')

    this.setState({
      avatarUrl: userPortfolio.imageUrl,
      firstName: userPortfolio.firstName,
      lastName: userPortfolio.lastName,
      tweets: userPortfolio.portfolioTweets,
      description: userPortfolio.description,
    })
    
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1>Portfolio Zemoga test</h1>
      </header>
      <div className="App-content">
        <div className="left-panel">
          <Avatar imgSrc={this.state.avatarUrl} />
          <Timeline firstName={this.state.firstName} tweets={this.state.tweets} />
        </div>
        <div className="right-panel">
          <Experience
            fullName={`${this.state.firstName} ${this.state.lastName}`}
            experienceTitle={"My Work experience"}
          >
            <p>{this.state.description}</p>
          </Experience>
        </div>
      </div>
    </div>
    )
  }
}