let sendOk = async (body) => {
    const { status } = body
    const { res, ...rest } = body
    return res.status(status).send({
        ...rest
    });
};

let sendErr = async (body) => {
    const { status } = body
    const { res, ...data } = body
    return res.status(status).send({
        ...data,
        err: true
    });
};

let meta = async (data, page) => {
    const length = data.length;
    console.log('meta')
    return {
        total_item: length,
        quantify_page: 1 + (length - (length % 25)) / 25,
        page: page
    }
};

let filterSwitch = async (data, key, type, value) => {
    switch (type) {
        case "!==": return data.filter(item => item[key] !== value).length;
        case "===": return data.filter(item => item[key] === value).length;
        case "<": return data.filter(item => item[key] < value).length;
        case ">": return data.filter(item => item[key] > value).length;
    }

}


let overView = async (data, list_views) => {
    const lengthList = list_views.length;
    const length = data.length;
    var results = {
        total: length,
    };

    for (let i = 0; i < lengthList; i++) {
        const { title, key, type, value } = list_views[i];
        results[title] = await filterSwitch(data, key, type, value)
    }

    return results;
};

let searchKeyWord = async (data, key, keyword) => {
    console.log(key, keyword);
    var results = data.filter(item => item[key] !== null && item[key].toLowerCase().search(keyword.toLowerCase()) !== -1);
    return results;
};

module.exports = { sendOk, sendErr, meta, overView, searchKeyWord };