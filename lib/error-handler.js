module.exports = () => {

    return (err, req, res, next) => {

        let code = 500, error = 'Internal Server Error';

        if(err.name === 'ValidationError' || err.name === 'CastError') {
            code = 400;
            error = error.message;
            console.log('ERROR', code, error);
        }
        else if(err.code) {
            code = err.code;
            error = err.error;
            console.log('ERROR', code, error);
        }
        else console.log('ERROR*', err)

        res.status(code).send({ error });
    };
};