import StoreModule from '../module';

class Product extends StoreModule{
  initState() {
    return {
      data: {},
      waiting: false,
    }
  }
  async load(id) {
    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState(
        {
          data: json.result,
          waiting: false,
        },
        'Загружен товар из АПИ',
      );
    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
      },
        `Ошибка загрузки ${error.message}`,
      );
    }
  }
}

export default Product;
