// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isSelected, isActiveLanguage} = props
  const {id, language} = languageDetails

  const btnClass = isSelected ? 'btn-class active' : 'btn-class'

  const changeLanguage = () => {
    isActiveLanguage(id)
  }

  return (
    <li className="list-items">
      <button type="button" className={btnClass} onClick={changeLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
