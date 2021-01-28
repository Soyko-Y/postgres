module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define('news', {
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING,
    },
    isViewed: {
      type: Sequelize.BOOLEAN,
    },
  });

  return News;
};
