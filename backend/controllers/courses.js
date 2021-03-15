const { v4: uuid } = require('uuid');

const coursesData = [
  {
    products: ['ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/97f0bbef-28c9-11e9-916d-525400080321/4/large/serowa.jpg',
    price: 25.99,
    title: 'Margherita 14"',
  },
  {
    products: ['szynka', 'pieczarki', 'ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/9ee58127-28c9-11e9-916d-525400080321/6/large/capriciosa.jpg',
    price: 27.99,
    title: 'Capriciosa 14"',
  },
  {
    products: ['szynka', 'ananas', 'ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/aa0c5569-28c9-11e9-916d-525400080321/4/large/hawajska.jpg',
    price: 28.99,
    title: 'Hawajska 14"',
  },
  {
    products: ['pepperoni', 'cebula', 'ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/b33aacde-28c9-11e9-916d-525400080321/4/large/pepperoni.jpg',
    price: 29.99,
    title: 'Pepperoni 14"',
  },
  {
    products: ['pepperoni', 'jalapeño', 'cebula', 'ser', 'sos habanero'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/ba4db908-28c9-11e9-916d-525400080321/4/large/na-ostro.jpg',
    price: 31.99,
    title: 'Jalapeño 14"',
  },
  {
    products: ['pieczarki', 'cebula', 'papryka', 'oliwki', 'ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/f0daf9ef-28c9-11e9-916d-525400080321/5/large/wegetarianska.jpg',
    price: 31.99,
    title: 'Wegetariańska 14"',
  },
  {
    products: ['boczek', 'pepperoni', 'kabanosy', 'szynka', 'cebula', 'ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/d6012641-28c9-11e9-916d-525400080321/4/large/miesna.jpg',
    price: 33.99,
    title: 'Mięsna 14"',
  },
  {
    products: ['oscypek', 'boczek', 'cebula', 'żurawina', 'ser', 'sos pomidorowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/c25593fc-28c9-11e9-916d-525400080321/5/large/goralska.jpg',
    price: 34.99,
    title: 'Góralska 14"'
  },
  {
    products: ['boczek', 'cebula', 'pieczarki', 'ser', 'sos śmietanowy'],
    id: uuid(),
    img: 'https://cdn.upmenu.com/static/product-images/99435279-a20c-11e8-9795-525400841de1/cc12af92-28c9-11e9-916d-525400080321/4/large/capriciosa.jpg',
    price: 34.99,
    title: 'Góralska 14"'
  }
];

exports.getCourses = (request, response, next) => {
  try {
    response.status(200).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses',
    });
  }
};

exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'Nie znaleziono dania o podanym id',
      });

      return;
    }

    response.status(200).json({
      course: courseToSend,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { products, img, price, title } = request.body;
    if (!products || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const isCourseExist = coursesData.some(({ title: currentTitle }) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `Istnieje już w bazie danie: ${title}`,
      });

      return;
    }

    const newCourse = {
      products: products,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { products, id, price, title } = request.body;
    if (!products || !id || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'Nie znaleziono dania o podanym id',
      });

      return;
    }


    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Nie znaleziono dania o podanym id',
      });

      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id',
    });
  }
};

exports.coursesData = coursesData;