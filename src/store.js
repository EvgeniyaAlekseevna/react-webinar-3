import {getCorrectWordForm} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      lastCode: 0
    };
    this.listeners = []; // Слушатели изменений состояния
    this.setHighlightedCount()
    this.getAvailableCode()
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.state.lastCode + 1;
    const newItem = {
      code: newCode,
      title: `Новая запись`,
      highlightedCount: 0
    }

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        newItem],
      lastCode: newCode
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const updatedList = this.state.list.map(item => {
      const isSelected = item.code === code;
      return ({
        ...item,
        selected: isSelected ? !item.selected : false,
        highlightedCount: item.highlightedCount + (isSelected && !item.selected === true ? 1 : 0)
      });
    })

    this.setState({
      ...this.state,
      list: updatedList
    });
  }

  /**
   * Получение составного имени элемента
   * @param code
   * @returns {string}
   */
  getTitleItem(code){
    let item = this.state.list.find(item => item.code === code);
    let count = item.highlightedCount;
    if (count === 0)
      return `${item.title}`
    return `${item.title} | Выделяли ${count} ${getCorrectWordForm(count)}`;
  }

  /**
   * Установка начального значения количества выделений записи
   */
  setHighlightedCount(){
    if (Array.isArray(this.state.list)) {
      this.state.list.forEach(item => {
        item.highlightedCount = 0;
      });
    }
  }

  /**
   * Получение использованного кода записи
   */
  getAvailableCode(){
    let maxCode = 0;
    if (!Array.isArray(this.state.list) || this.state.list.length === 0)
      maxCode = 0;
    else
      maxCode = this.state.list.reduce((max, current) =>
          Math.max(max, current.code),
        0
      );

    this.setState({
      ...this.state,
      lastCode: maxCode
    })
  }
}

export default Store;
