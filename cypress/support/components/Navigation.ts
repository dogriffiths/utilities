import InputWidget from "../relish-cypress/InputWidget";
import InputTextNeedingEnter from "./InputTextNeedingEnter";
import CypressWidget from "../relish-cypress/CypressWidget";

export default class Navigation extends InputWidget {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  matches(s: string) {
    this.boardInfo.matches(s)
  }

  set(text: string): Navigation {
    this.boardInfo.click()
    this.boardTitleInput.set(text)
    return this;
  }

  get boardInfo() {
    return new CypressWidget('#boardInfo', this);
  }

  get boardTitleInput() {
    return new InputTextNeedingEnter('#boardTitleInput', this);
  }

  get newBoardButton() {
    return new CypressWidget('#newBoardBtn', this);
  }

  overview() {
    this.overviewButton.click();
  }

  get overviewButton() {
    return new CypressWidget('#overviewBtn', this);
  }

  new() {
    this.newBoardButton.click()
  }

  next() {
    this.nextButton.click()
  }

  previous() {
    this.previousButton.click()
  }

  get nextButton() {
    return new CypressWidget('#nextBtn', this);
  }

  get previousButton() {
    return new CypressWidget('#prevBtn', this);
  }
}
