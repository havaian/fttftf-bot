const questions = require('../axios/question');

const readAll = async () => {
    try {
        const response = await questions.get(`/`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
            const errorMessage = error.response.data.detail;
            return null;
        }
    }
};

const readOne = async (key, query) => {
    try {
        const url = query ? `/${key}?type=${query}` : `/${key}`;
        const response = await questions.get(url);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
            const errorMessage = error.response.data.detail;
            return null;
        }
    }
};

module.exports = {
    readOne,
    readAll,
};