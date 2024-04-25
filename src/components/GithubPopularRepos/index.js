import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusContainer = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initail: 'INITAIL',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusContainer.initail,
    repositoryData: [],
    activeLanguageId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepository()
  }

  getRepository = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusContainer.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      const fetchData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        repositoryData: fetchData,
        apiStatus: apiStatusContainer.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContainer.failure})
    }
  }

  renderApiSuccess = () => {
    const {repositoryData} = this.state
    return (
      <ul>
        {repositoryData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryList={eachRepo} />
        ))}
      </ul>
    )
  }

  renderApiFailure = () => (
    <div className="failure-class">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderApiInProgress = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepositoryItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContainer.success:
        return this.renderApiSuccess()
      case apiStatusContainer.failure:
        return this.renderApiFailure()
      case apiStatusContainer.inProgress:
        return this.renderApiInProgress()
      default:
        return null
    }
  }

  onActiveLanguageId = newId => {
    this.setState({activeLanguageId: newId})
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="git-unorderlist">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageDetails={eachItem}
            key={eachItem.id}
            isSelected={eachItem.id === activeLanguageId}
            isActiveLanguage={this.onActiveLanguageId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="gitHub-container">
        <div className="git-class">
          <h1 className="head-text">Popular</h1>
          {this.renderLanguageFilterItem()}
          {this.renderRepositoryItem()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
