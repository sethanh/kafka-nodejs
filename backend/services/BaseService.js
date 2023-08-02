var GetAll = async (base, filters) => {
    try {
        var result = await base.findAll({
            where: {
                ...filters
            }
        })
        return result;
    }

    catch (err) {
        var error = {
            QueryError: true,
            Message: JSON.stringify(err)
        }
        return error;
    }
}

var FirstOrDefault = async (base, filters) => {
    try {
        var result = await base.findOne({
            where: {
                ...filters
            }
        })
        return result;
    }
    catch (err) {
        var error = {
            QueryError: true,
            Message: JSON.stringify(err)
        }
        return error;
    }
}

var Add = async (base, data) => {
    try {
        var result = await base.create({ ...data });
        return result;
    }
    catch (err) {
        var error = {
            QueryError: true,
            Message: JSON.stringify(err)
        }
        return error;
    }
}

module.exports = { GetAll, FirstOrDefault, Add };